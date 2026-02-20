import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import {
  User,
  Package,
  MapPin,
  Heart,
  Settings,
  ChevronDown,
  LogOut,
  Trash2,
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

import ProfileOverview from './ProfileOverview';
import MyOrders from './MyOrders';
import Wishlist from './Wishlist';
import Addresses from './Addresses';
import SettingsSection from './Settings';

const Profile = () => {
  const { user, logout, deleteAccount, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const [activeSection, setActiveSection] = useState('overview');
  const [showProfileDropdown, setShowProfileDropdown] = useState(false);



  const menuItems = [
    { id: 'overview', label: 'Profile Overview', icon: User },
    { id: 'orders', label: 'My Orders', icon: Package },
    { id: 'wishlist', label: 'Wishlist', icon: Heart },
    { id: 'addresses', label: 'Addresses', icon: MapPin },
    { id: 'settings', label: 'Settings', icon: Settings },
  ];

  const renderSection = () => {
    switch (activeSection) {
      case 'overview':
        return <ProfileOverview user={user} />;
      case 'orders':
        return <MyOrders />;
      case 'wishlist':
        return <Wishlist />;
      case 'addresses':
        return <Addresses />;
      case 'settings':
        return <SettingsSection />;
      default:
        return null;
    }
  };

  return (
    <div className="pt-40 min-h-screen bg-gradient-to-br from-[#eff4f7] to-white">
      <div className="max-w-7xl mx-auto px-4">

        {/* HEADER */}
        <div className="flex justify-between items-center mb-6 relative">
          <h1 className="text-3xl font-bold">My Profile</h1>

          <button
            onClick={() => setShowProfileDropdown(!showProfileDropdown)}
            className="flex items-center gap-2 bg-white px-4 py-2 rounded-full shadow"
          >
            <div className="w-10 h-10 bg-[#88013C] text-white rounded-full flex items-center justify-center">
              {user?.name?.charAt(0)}
            </div>
            <ChevronDown />
          </button>

          <AnimatePresence>
            {showProfileDropdown && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="absolute right-0 top-14 bg-white rounded-lg shadow-lg w-48 z-50"
              >
                <button
                  onClick={() => {
                    logout();
                    navigate('/');
                  }}
                  className="w-full px-4 py-3 text-left hover:bg-gray-100 flex gap-2 text-red-600"
                >
                  <LogOut size={16} /> Logout
                </button>

                <button
                  onClick={deleteAccount}
                  className="w-full px-4 py-3 text-left hover:bg-gray-100 flex gap-2 text-red-600"
                >
                  <Trash2 size={16} /> Delete Account
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">

          {/* SIDEBAR */}
          <div className="bg-white p-4 rounded-xl shadow">
            {menuItems.map((item) => {
              const Icon = item.icon;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveSection(item.id)}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg mb-2 ${
                    activeSection === item.id
                      ? 'bg-[#88013C] text-white'
                      : 'hover:bg-gray-100'
                  }`}
                >
                  <Icon size={18} />
                  {item.label}
                </button>
              );
            })}
          </div>

          {/* RIGHT SIDE CONTENT */}
          <div className="lg:col-span-3 bg-white rounded-xl shadow p-6">
            {renderSection()}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;










// import React, { useState, useEffect } from 'react';
// import { Link, useNavigate } from 'react-router-dom';
// import axios from 'axios';
// import { useAuth } from '../../context/AuthContext';
// import { useWishlist } from '../../context/WishlistContext';
// import {
//   User,
//   Package,
//   LogOut,
//   MapPin,
//   Mail,
//   Heart,
//   Settings,
//   Trash2,
//   ChevronDown,
// } from 'lucide-react';
// import { motion, AnimatePresence } from 'framer-motion';



// // 🔒 TEMP HARD-CODED CUSTOMER ID
// const CUSTOMER_ID = '550e8400-e29b-41d4-a716-446655440000';

// const Profile = () => {
//   const { user, logout, deleteAccount, isAuthenticated } = useAuth();
//   const { wishlist, removeFromWishlist } = useWishlist();
//   const navigate = useNavigate();

//   const [addresses, setAddresses] = useState([]);
//   const [activeSection, setActiveSection] = useState('overview');
//   const [showProfileDropdown, setShowProfileDropdown] = useState(false);
//   const [showAddressForm, setShowAddressForm] = useState(false);

//   const [addressForm, setAddressForm] = useState({
//     name: '',
//     phone: '',
//     line1: '',
//     line2: '',
//     city: '',
//     state: '',
//     pincode: '',
//   });

//   /* =========================
//      LOAD ADDRESSES
//   ==========================*/
//   useEffect(() => {
//     if (!isAuthenticated) return;
//     fetchAddresses();
//   }, [isAuthenticated]);

//   const fetchAddresses = async () => {
//     try {
//       const res = await axios.get(
//         `${API_BASE}/addresses`,
//         {
//           params: { customerId: CUSTOMER_ID }, // ✅ hardcoded
//         }
//       );
//       setAddresses(res.data.data || []);
//     } catch (err) {
//       console.error('Failed to fetch addresses', err);
//       setAddresses([]);
//     }
//   };

//   /* =========================
//      CREATE ADDRESS
//   ==========================*/
//   const handleAddressSubmit = async (e) => {
//     e.preventDefault();

//     try {
//       await axios.post(`${API_BASE}/addresses`, {
//         customerId: CUSTOMER_ID,
//         name: addressForm.name,
//         phone: addressForm.phone,
//         line1: addressForm.line1,
//         line2: addressForm.line2 || null,
//         city: addressForm.city,
//         state: addressForm.state,
//         pincode: addressForm.pincode,
//       });
  
//       setAddressForm({
//         name: '',
//         phone: '',
//         line1: '',
//         line2: '',
//         city: '',
//         state: '',
//         pincode: '',
//       });
  
//       setShowAddressForm(false);
//       fetchAddresses();
//     } catch (err) {
//       console.error(err.response?.data);
//       alert(err?.response?.data?.message || 'Failed to save address');
//     }
//   };

//   const handleLogout = () => {
//     logout();
//     navigate('/');
//   };

//   if (!isAuthenticated) {
//     return (
//       <div className="pt-40 min-h-screen flex items-center justify-center">
//         <Link to="/login" className="text-[#88013C] font-bold">
//           Please Login
//         </Link>
//       </div>
//     );
//   }

//   const menuItems = [
//     { id: 'overview', label: 'Profile Overview', icon: User },
//     { id: 'orders', label: 'My Orders', icon: Package },
//     { id: 'wishlist', label: 'Wishlist', icon: Heart },
//     { id: 'addresses', label: 'Addresses', icon: MapPin },
//     { id: 'settings', label: 'Settings', icon: Settings },
//   ];

//   return (
//     <div className="pt-40 min-h-screen bg-gradient-to-br from-[#eff4f7] to-white">
//       <div className="max-w-7xl mx-auto px-4">

//         {/* HEADER */}
//         <div className="flex justify-between items-center mb-6">
//           <h1 className="text-3xl font-bold">My Profile</h1>
//           <button
//             onClick={() => setShowProfileDropdown(!showProfileDropdown)}
//             className="flex items-center gap-2 bg-white px-4 py-2 rounded-full shadow"
//           >
//             <div className="w-10 h-10 bg-[#88013C] text-white rounded-full flex items-center justify-center">
//               {user?.name?.charAt(0)}
//             </div>
//             <ChevronDown />
//           </button>

//           <AnimatePresence>
//             {showProfileDropdown && (
//               <motion.div
//                 initial={{ opacity: 0, y: -10 }}
//                 animate={{ opacity: 1, y: 0 }}
//                 exit={{ opacity: 0 }}
//                 className="absolute right-6 top-54 bg-white rounded-lg shadow-lg w-48 z-50"
//               >
//                 <button
//                   onClick={handleLogout}
//                   className="w-full px-4 py-3 text-left hover:bg-gray-100 flex gap-2 text-red-600"
//                 >
//                   <LogOut size={16} /> Logout
//                 </button>
//                 <button
//                   onClick={deleteAccount}
//                   className="w-full px-4 py-3 text-left hover:bg-gray-100 flex gap-2 text-red-600"
//                 >
//                   <Trash2 size={16} /> Delete Account
//                 </button>
//               </motion.div>
//             )}
//           </AnimatePresence>
//         </div>

//         <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">

//           {/* SIDEBAR */}
//           <div className="bg-white p-4 rounded-xl shadow">
//             {menuItems.map((item) => {
//               const Icon = item.icon;
//               return (
//                 <button
//                   key={item.id}
//                   onClick={() => setActiveSection(item.id)}
//                   className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg mb-2 ${
//                     activeSection === item.id
//                       ? 'bg-[#88013C] text-white'
//                       : 'hover:bg-gray-100'
//                   }`}
//                 >
//                   <Icon size={18} />
//                   {item.label}
//                 </button>
//               );
//             })}
//           </div>

//           {/* MAIN CONTENT */}
//           <div className="lg:col-span-3 bg-white rounded-xl shadow p-6">

//             {/* OVERVIEW */}
//             {activeSection === 'overview' && (
//               <div>
//                 <h2 className="text-2xl font-bold mb-4">{user?.name}</h2>
//                 <p className="text-gray-600 flex items-center gap-2">
//                   <Mail size={16} /> {user?.email}
//                 </p>
//               </div>
//             )}

//             {/* ADDRESSES */}
//             {activeSection === 'addresses' && (
//               <>
//                 <div className="flex justify-between mb-6">
//                   <h2 className="text-2xl font-bold">Saved Addresses</h2>
//                   <button
//                     onClick={() => setShowAddressForm(true)}
//                     className="bg-[#88013C] text-white px-4 py-2 rounded"
//                   >
//                     Add Address
//                   </button>
//                 </div>

//                 <AnimatePresence>
//                   {showAddressForm && (
//                     <motion.form
//                       initial={{ opacity: 0, y: -10 }}
//                       animate={{ opacity: 1, y: 0 }}
//                       exit={{ opacity: 0 }}
//                       onSubmit={handleAddressSubmit}
//                       className="border p-4 rounded-lg mb-6 grid grid-cols-1 md:grid-cols-2 gap-4"
//                     >
//                       {Object.keys(addressForm).map((field) => (
//                         <input
//                           key={field}
//                           placeholder={field.toUpperCase()}
//                           value={addressForm[field]}
//                           onChange={(e) =>
//                             setAddressForm({
//                               ...addressForm,
//                               [field]: e.target.value,
//                             })
//                           }
//                           className="border px-3 py-2 rounded"
//                           required={field !== 'line2'}
//                         />
//                       ))}

//                       <div className="col-span-full flex gap-3">
//                         <button
//                           type="submit"
//                           className="bg-[#88013C] text-white px-6 py-2 rounded"
//                         >
//                           Save
//                         </button>
//                         <button
//                           type="button"
//                           onClick={() => setShowAddressForm(false)}
//                           className="border px-6 py-2 rounded"
//                         >
//                           Cancel
//                         </button>
//                       </div>
//                     </motion.form>
//                   )}
//                 </AnimatePresence>

//                 {addresses.length === 0 ? (
//                   <p className="text-gray-500">No addresses saved</p>
//                 ) : (
//                   <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                     {addresses.map((addr) => (
//                       <div key={addr.id} className="border p-4 rounded-lg">
//                         <h4 className="font-bold">{addr.name}</h4>
//                         <p className="text-sm">{addr.phone}</p>
//                         <p className="text-sm mt-2">
//                           {addr.line1}
//                           {addr.line2 && `, ${addr.line2}`},{' '}
//                           {addr.city}, {addr.state} - {addr.pincode}
//                         </p>
//                       </div>
//                     ))}
//                   </div>
//                 )}
//               </>
//             )}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Profile;
