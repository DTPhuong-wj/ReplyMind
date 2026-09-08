import React from 'react';
import { Sparkles, Building2, UserCheck, Search, Bell } from 'lucide-react';
import { BrandConfig, User } from '../../types';

interface NavbarProps {
  currentBrand: BrandConfig;
  currentUser: User;
  onUserChange: (user: User) => void;
  users: User[];
}

export const Navbar: React.FC<NavbarProps> = ({
  currentBrand,
  currentUser,
  onUserChange,
  users
}) => {
  return (
    <header className="h-16 bg-slate-900 border-b border-slate-800 px-6 flex items-center justify-between sticky top-0 z-40 text-slate-100">
      {/* Brand & Logo */}
      <div className="flex items-center gap-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-600 to-violet-500 flex items-center justify-center shadow-lg shadow-indigo-500/30">
            <Sparkles className="w-5 h-5 text-white" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-extrabold text-lg tracking-tight bg-gradient-to-r from-white via-slate-200 to-indigo-300 bg-clip-text text-transparent">
                ReplyMind
              </span>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
                SaaS D2C
              </span>
            </div>
            <p className="text-xs text-slate-400">AI Customer Support Engine</p>
          </div>
        </div>

        {/* Multi-Tenant Brand Switcher */}
        <div className="hidden md:flex items-center gap-2 px-3 py-1.5 rounded-lg bg-slate-800/80 border border-slate-700/60 text-xs text-slate-200 cursor-pointer hover:bg-slate-800 transition-colors">
          <Building2 className="w-4 h-4 text-indigo-400" />
          <span className="font-semibold">{currentBrand.brandName}</span>
          <span className="text-[10px] px-1.5 py-0.5 rounded bg-indigo-950 text-indigo-300 font-medium">
            Tenant: {currentBrand.brandId}
          </span>
        </div>
      </div>

      {/* Center Search */}
      <div className="hidden lg:flex items-center relative w-80">
        <Search className="w-4 h-4 absolute left-3 text-slate-400" />
        <input
          type="text"
          placeholder="Tìm hội thoại, mã đơn LUM-..., số ĐT..."
          className="w-full pl-9 pr-4 py-1.5 rounded-lg bg-slate-800/60 border border-slate-700/50 text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all"
        />
      </div>

      {/* Right Controls & Role Switcher */}
      <div className="flex items-center gap-4">
        <button className="p-2 rounded-lg bg-slate-800 text-slate-400 hover:text-slate-200 hover:bg-slate-700/80 transition-colors relative">
          <Bell className="w-4 h-4" />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-rose-500 animate-pulse"></span>
        </button>

        {/* Demo User Switcher */}
        <div className="flex items-center gap-2 bg-slate-800/90 p-1.5 rounded-xl border border-slate-700/60">
          <img
            src={currentUser.avatar}
            alt={currentUser.name}
            className="w-7 h-7 rounded-lg object-cover ring-1 ring-indigo-500/50"
          />
          <div className="hidden sm:block text-left pr-1">
            <div className="text-xs font-semibold text-slate-200 leading-tight">
              {currentUser.name}
            </div>
            <div className="text-[10px] text-indigo-400 font-medium flex items-center gap-1">
              <UserCheck className="w-3 h-3 inline" /> {currentUser.role}
            </div>
          </div>
          <select
            value={currentUser.id}
            onChange={(e) => {
              const selected = users.find(u => u.id === e.target.value);
              if (selected) onUserChange(selected);
            }}
            className="bg-slate-900 text-slate-300 text-xs rounded-md px-1.5 py-1 border border-slate-700 focus:outline-none cursor-pointer"
          >
            {users.map(u => (
              <option key={u.id} value={u.id}>
                {u.role}: {u.name.split(' ')[0]}
              </option>
            ))}
          </select>
        </div>
      </div>
    </header>
  );
};
