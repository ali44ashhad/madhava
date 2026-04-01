import React from "react";
import StatusPage from "./StatusPage";
import { Lock } from "lucide-react";

const Unauthenticated = () => {
  return (
    <StatusPage 
      title="Restricted"
      subtitle="Login Required"
      message="This sanctum is reserved for our registered devotees. Please log in to continue your journey."
      buttonText="Login Now"
      buttonLink="/login"
      icon={
        <div className="bg-[#88013C]/10 p-6 rounded-full mb-4">
          <Lock size={48} className="text-[#88013C]" />
        </div>
      }
    />
  );
};

export default Unauthenticated;
