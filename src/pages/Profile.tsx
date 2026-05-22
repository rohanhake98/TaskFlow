import React from 'react';
import { UserProfile, SignOutButton, useUser } from '@clerk/clerk-react';
import { User, LogOut } from 'lucide-react';

export default function Profile() {
  const { user } = useUser();

  return (
    <div className="max-w-[1400px] mx-auto animate-in fade-in duration-700 pb-20">
      <div className="mb-10 flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-primary mb-2">
            <User size={18} />
            <span className="text-sm font-medium tracking-tight">Profile & Settings</span>
          </div>
          <h1 className="text-3xl font-black text-slate-900 mb-3 tracking-tight">
            Account Details
          </h1>
          <p className="text-slate-500 text-sm max-w-2xl leading-relaxed font-medium">
            Manage your personal information, security settings, and workspace preferences.
          </p>
        </div>
        
        <SignOutButton redirectUrl="/">
          <button className="px-5 py-2.5 bg-white border border-rose-200 text-rose-600 rounded-xl text-sm font-black flex items-center gap-2 hover:bg-rose-50 transition-colors shadow-sm text-[13px]">
            <LogOut size={18} />
            Log Out
          </button>
        </SignOutButton>
      </div>

      <div className="flex justify-center bg-white border border-slate-100 rounded-[24px] p-8 shadow-sm">
        {/* Clerk's UserProfile component handles all the heavy lifting of updating user details */}
        <UserProfile routing="hash" />
      </div>
    </div>
  );
}
