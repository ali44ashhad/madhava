import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { motion, AnimatePresence } from 'framer-motion';
import { MapPin, ChevronDown, ChevronUp } from 'lucide-react';
import { API_BASE } from '../../config/api';
 
const CUSTOMER_ID = 'f5c1a26a-950f-4bf7-a3c8-e695df42b601';
const SELECTED_ADDRESS_STORAGE_KEY = 'selectedAddress';

const Addresses = () => {
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

  useEffect(() => {
    fetchAddresses();
  }, []);

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
    const res = await axios.get(
      `${API_BASE}/v1/store/addresses`,
      { params: { customerId: CUSTOMER_ID } }
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
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    await axios.post(`${API_BASE}/addresses`, {
      customerId: CUSTOMER_ID,
      ...form,
      line2: form.line2 || null,
    });

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
    fetchAddresses();
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
                className={`px-4 py-3 cursor-pointer hover:bg-gray-100 ${
                  selectedAddress?.id === addr.id
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

      {/* ================= ADD ADDRESS BUTTON ================= */}
      <div className="flex justify-between mt-8 mb-6">
        <h2 className="text-2xl font-bold">Saved Addresses</h2>
        <button
          onClick={() => setShowForm(true)}
          className="bg-[#88013C] text-white px-4 py-2 rounded"
        >
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
                onClick={() => setShowForm(false)}
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
              className={`border p-4 rounded-lg ${
                selectedAddress?.id === addr.id
                  ? 'border-[#88013C]'
                  : ''
              }`}
            >
              <h4 className="font-bold">{addr.name}</h4>
              <p className="text-sm">{addr.phone}</p>
              <p className="text-sm mt-2">
                {addr.line1}
                {addr.line2 && `, ${addr.line2}`},{' '}
                {addr.city}, {addr.state} - {addr.pincode}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Addresses;
