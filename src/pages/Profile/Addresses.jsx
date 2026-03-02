import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MapPin, ChevronDown, ChevronUp, Edit2, Trash2, Plus } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { STORE_ENDPOINTS } from '../../api/endpoints';
import toast from 'react-hot-toast';
import apiClient from '../../api/client';
import { updateAddress, deleteAddress } from '../../api/addressApi';

const SELECTED_ADDRESS_STORAGE_KEY = 'selectedAddress';

const Addresses = () => {
  const { customer } = useAuth();
  const [addresses, setAddresses] = useState([]);
  const [selectedAddress, setSelectedAddress] = useState(null);
  const [open, setOpen] = useState(false);
  const [showForm, setShowForm] = useState(false);

  const [form, setForm] = useState({
    name: '',
    phone: '',
    line1: '',
    line2: '',
    city: '',
    state: '',
    pincode: '',
  });

  const [editingAddressId, setEditingAddressId] = useState(null);

  useEffect(() => {
    if (customer?.id) {
      fetchAddresses();
    }
  }, [customer?.id]);

  // Load previously-selected address (for Navbar)
  useEffect(() => {
    try {
      const raw = localStorage.getItem(SELECTED_ADDRESS_STORAGE_KEY);
      if (!raw) return;
      const parsed = JSON.parse(raw);
      if (parsed && typeof parsed === 'object') {
        setSelectedAddress((prev) => prev || parsed);
      }
    } catch {
      // ignore
    }
  }, []);

  const fetchAddresses = async () => {
    try {
      const res = await apiClient.get(
        STORE_ENDPOINTS.ADDRESSES,
        { params: { customerId: customer.id } }
      );

      const data = res.data?.data || [];
      setAddresses(data);

      // ✅ auto select first address
      if (data.length && !selectedAddress) {
        setSelectedAddress(data[0]);
        try {
          localStorage.setItem(SELECTED_ADDRESS_STORAGE_KEY, JSON.stringify(data[0]));
        } catch {
          // ignore
        }
      }
    } catch (error) {
      console.error('Failed to fetch addresses:', error);
      // Toast handled by client.js interceptor usually, but good to be safe if silent failure needed
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!customer?.id) {
      toast.error('You must be logged in to add an address');
      return;
    }

    try {
      // Basic validation
      const cleanPhone = form.phone.replace(/\D/g, '');
      if (cleanPhone.length < 10 || cleanPhone.length > 15) {
        toast.error('Phone number must be 10-15 digits');
        return;
      }

      if (editingAddressId) {
        await updateAddress(editingAddressId, {
          ...form,
          phone: cleanPhone,
          line2: form.line2 || null,
        });
        toast.success('Address updated successfully');
      } else {
        await apiClient.post(STORE_ENDPOINTS.ADDRESSES, {
          customerId: customer.id,
          ...form,
          phone: cleanPhone,
          line2: form.line2 || null,
        });
        toast.success('Address added successfully');
      }

      setForm({
        name: '',
        phone: '',
        line1: '',
        line2: '',
        city: '',
        state: '',
        pincode: '',
      });

      setShowForm(false);
      setEditingAddressId(null);
      fetchAddresses();
    } catch (error) {
      console.error("Address save failed", error);
      const msg = error.response?.data?.message || 'Failed to save address';
      toast.error(msg);
    }
  };

  const handleEditClick = (addr) => {
    setForm({
      name: addr.name || '',
      phone: addr.phone || '',
      line1: addr.line1 || '',
      line2: addr.line2 || '',
      city: addr.city || '',
      state: addr.state || '',
      pincode: addr.pincode || '',
    });
    setEditingAddressId(addr.id);
    setShowForm(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleDeleteClick = async (addressId) => {
    if (!window.confirm("Are you sure you want to delete this address?")) return;

    try {
      await deleteAddress(addressId);
      toast.success("Address deleted");

      if (selectedAddress?.id === addressId) {
        setSelectedAddress(null);
        localStorage.removeItem(SELECTED_ADDRESS_STORAGE_KEY);
      }
      fetchAddresses();
    } catch (error) {
      console.error("Address delete failed", error);
      const msg = error.response?.data?.message || 'Failed to delete address';
      toast.error(msg);
    }
  };

  return (
    <div className="max-w-3xl mx-auto">

      {/* ================= CURRENT ADDRESS BAR ================= */}
      <address
        onClick={() => setOpen(!open)}
        className="not-italic cursor-pointer flex items-center justify-between gap-4 px-4 py-3 border rounded-lg"
      >
        <div className="flex items-start gap-2">
          <MapPin size={18} className="text-[#88013C] mt-1" />

          <span className="text-sm leading-5">
            {selectedAddress ? (
              <>
                {selectedAddress.line1}
                {selectedAddress.line2 && `, ${selectedAddress.line2}`}
                <br />
                {selectedAddress.city}, {selectedAddress.state}
              </>
            ) : (
              'Select Address'
            )}
          </span>
        </div>

        {open ? (
          <ChevronUp size={18} />
        ) : (
          <ChevronDown size={18} />
        )}
      </address>

      {/* ================= ADDRESS DROPDOWN ================= */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="mt-3 border rounded-lg overflow-hidden"
          >
            {addresses.map((addr) => (
              <div
                key={addr.id}
                onClick={() => {
                  setSelectedAddress(addr);
                  try {
                    localStorage.setItem(
                      SELECTED_ADDRESS_STORAGE_KEY,
                      JSON.stringify(addr)
                    );
                  } catch {
                    // ignore
                  }
                  setOpen(false);
                }}
                className={`px-4 py-3 cursor-pointer hover:bg-gray-100 ${selectedAddress?.id === addr.id
                  ? 'bg-[#88013C]/10 border-l-4 border-[#88013C]'
                  : ''
                  }`}
              >
                <p className="font-medium text-sm">{addr.name}</p>
                <p className="text-xs text-gray-600">
                  {addr.line1}
                  {addr.line2 && `, ${addr.line2}`},
                  {addr.city}
                </p>
              </div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      <div className="flex items-center justify-between mt-8 mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Saved Addresses</h2>
        <button
          onClick={() => {
            setForm({ name: '', phone: '', line1: '', line2: '', city: '', state: '', pincode: '' });
            setEditingAddressId(null);
            setShowForm(true);
          }}
          className="flex items-center gap-2 bg-[#88013C] text-white px-5 py-2.5 rounded-full font-bold shadow-md hover:bg-[#6a0129] hover:shadow-lg transition-all text-sm"
        >
          <Plus size={18} />
          Add Address
        </button>
      </div>

      {/* ================= ADD ADDRESS FORM ================= */}
      <AnimatePresence>
        {showForm && (
          <motion.form
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            onSubmit={handleSubmit}
            className="border p-4 rounded-lg mb-6 grid grid-cols-1 md:grid-cols-2 gap-4"
          >
            {Object.keys(form).map((field) => (
              <input
                key={field}
                placeholder={field.toUpperCase()}
                value={form[field]}
                onChange={(e) =>
                  setForm({ ...form, [field]: e.target.value })
                }
                className="border px-3 py-2 rounded"
                required={field !== 'line2'}
              />
            ))}

            <div className="col-span-full flex gap-3">
              <button className="bg-[#88013C] text-white px-6 py-2 rounded">
                Save
              </button>
              <button
                type="button"
                onClick={() => {
                  setShowForm(false);
                  setEditingAddressId(null);
                }}
                className="border px-6 py-2 rounded"
              >
                Cancel
              </button>
            </div>
          </motion.form>
        )}
      </AnimatePresence>

      {/* ================= ADDRESS GRID ================= */}
      {addresses.length === 0 ? (
        <p className="text-gray-500">No addresses saved</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {addresses.map((addr) => (
            <div
              key={addr.id}
              className={`border p-4 rounded-lg flex flex-col justify-between ${selectedAddress?.id === addr.id
                ? 'border-[#88013C]'
                : ''
                }`}
            >
              <div>
                <h4 className="font-bold">{addr.name}</h4>
                <p className="text-sm">{addr.phone}</p>
                <p className="text-sm mt-2">
                  {addr.line1}
                  {addr.line2 && `, ${addr.line2}`},{' '}
                  {addr.city}, {addr.state} - {addr.pincode}
                </p>
              </div>
              <div className="flex justify-end gap-2 mt-4 pt-4 border-t border-gray-100">
                <button
                  onClick={() => handleEditClick(addr)}
                  className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold text-gray-700 bg-gray-50 border border-gray-200 rounded-lg hover:bg-white hover:text-[#88013C] hover:border-[#88013C] transition-colors shadow-sm"
                >
                  <Edit2 size={14} />
                  Edit
                </button>
                <button
                  onClick={() => handleDeleteClick(addr.id)}
                  className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold text-red-600 bg-red-50 border border-red-100 rounded-lg hover:bg-red-600 hover:text-white transition-colors shadow-sm"
                >
                  <Trash2 size={14} />
                  Remove
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Addresses;
