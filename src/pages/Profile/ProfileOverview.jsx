import React from 'react';
import { Mail, Phone, Trash2 } from 'lucide-react';

const ProfileOverview = ({ user, onDeleteAccountClick }) => {
  return (
    <div>
      <div className="flex flex-col sm:flex-row sm:items-center gap-6 mb-8">
        <div className="w-20 h-20 sm:w-24 sm:h-24 bg-gradient-to-br from-[#88013C] to-[#6a0129] text-white rounded-full flex items-center justify-center text-3xl sm:text-4xl font-bold shadow-lg flex-shrink-0 mx-auto sm:mx-0">
          {user?.name?.charAt(0)?.toUpperCase() || 'U'}
        </div>
        <div className="text-center sm:text-left">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-1">{user?.name || 'Customer Name'}</h2>
          <span className="inline-block bg-[#eff4f7] text-[#88013C] text-xs font-semibold px-3 py-1 rounded-full uppercase tracking-wider">
            Verified Member
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
        <div className="bg-gray-50 rounded-xl p-5 border border-gray-100 flex items-center gap-4 transition-all hover:shadow-md hover:border-gray-200">
          <div className="bg-white p-3 rounded-full shadow-sm flex-shrink-0">
            <Mail className="text-[#88013C]" size={24} strokeWidth={1.5} />
          </div>
          <div className="min-w-0">
            <p className="text-sm text-gray-500 font-medium mb-1">Email Address</p>
            <p className="text-gray-800 font-semibold truncate">{user?.email || 'Not provided'}</p>
          </div>
        </div>

        <div className="bg-gray-50 rounded-xl p-5 border border-gray-100 flex items-center gap-4 transition-all hover:shadow-md hover:border-gray-200">
          <div className="bg-white p-3 rounded-full shadow-sm flex-shrink-0">
            <Phone className="text-[#88013C]" size={24} strokeWidth={1.5} />
          </div>
          <div className="min-w-0">
            <p className="text-sm text-gray-500 font-medium mb-1">Phone Number</p>
            <p className="text-gray-800 font-semibold">{user?.phone || 'Not provided'}</p>
          </div>
        </div>
      </div>

      {onDeleteAccountClick && (
        <div className="mt-8 pt-8 border-t border-gray-100">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between sm:gap-6">
            <div className="text-center sm:text-left">
              <h3 className="text-base font-semibold text-gray-800">Delete account</h3>
              <p className="text-sm text-gray-500 mt-1 max-w-md">
                Permanently remove your account and sign out. You can create a new account with the same details later.
              </p>
            </div>
            <button
              type="button"
              onClick={onDeleteAccountClick}
              className="w-full sm:w-auto flex-shrink-0 inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-lg border border-red-200 text-red-600 font-semibold hover:bg-red-50 hover:border-red-300 transition-colors"
            >
              <Trash2 size={18} />
              Delete account
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfileOverview;
