import { Mail } from 'lucide-react';

const ProfileOverview = ({ user }) => {
  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">{user?.name}</h2>
      <p className="text-gray-600 flex items-center gap-2">
        <Mail size={16} /> {user?.email}
      </p>
    </div>
  );
};

export default ProfileOverview;
