import React from 'react';
import { Mail, Phone, User as UserIcon } from 'lucide-react';

const ProfileOverview = ({ user }) => {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8">
      <div className="flex items-center gap-6 mb-8">
        <div className="w-24 h-24 bg-gradient-to-br from-[#88013C] to-[#6a0129] text-white rounded-full flex items-center justify-center text-4xl font-bold shadow-lg">
          {user?.name?.charAt(0)?.toUpperCase() || 'U'}
        </div>
        <div>
          <h2 className="text-3xl font-bold text-gray-800 mb-1">{user?.name || 'Customer Name'}</h2>
          <span className="inline-block bg-[#eff4f7] text-[#88013C] text-xs font-semibold px-3 py-1 rounded-full uppercase tracking-wider">
            Verified Member
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-gray-50 rounded-xl p-5 border border-gray-100 flex items-center gap-4 transition-all hover:shadow-md hover:border-gray-200">
          <div className="bg-white p-3 rounded-full shadow-sm">
            <Mail className="text-[#88013C]" size={24} strokeWidth={1.5} />
          </div>
          <div>
            <p className="text-sm text-gray-500 font-medium mb-1">Email Address</p>
            <p className="text-gray-800 font-semibold">{user?.email || 'Not provided'}</p>
          </div>
        </div>

        <div className="bg-gray-50 rounded-xl p-5 border border-gray-100 flex items-center gap-4 transition-all hover:shadow-md hover:border-gray-200">
          <div className="bg-white p-3 rounded-full shadow-sm">
            <Phone className="text-[#88013C]" size={24} strokeWidth={1.5} />
          </div>
          <div>
            <p className="text-sm text-gray-500 font-medium mb-1">Phone Number</p>
            <p className="text-gray-800 font-semibold">{user?.phone || 'Not provided'}</p>
          </div>
        </div>

        <div className="bg-gray-50 rounded-xl p-5 border border-gray-100 flex items-center gap-4 transition-all hover:shadow-md hover:border-gray-200">
          <div className="bg-white p-3 rounded-full shadow-sm">
            <UserIcon className="text-[#88013C]" size={24} strokeWidth={1.5} />
          </div>
          <div>
            <p className="text-sm text-gray-500 font-medium mb-1">Account ID</p>
            <p className="text-gray-800 font-medium text-xs break-all">{user?.id || 'N/A'}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileOverview;
