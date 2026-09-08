import React from 'react';
import { MessageSquare, BookOpen, Sliders, LayoutDashboard, Zap, AlertTriangle } from 'lucide-react';
import { BrandToneType, UserRole } from '../../types';

export type ActiveTab = 'INBOX' | 'KNOWLEDGE_BASE' | 'BRAND_TONE' | 'DASHBOARD';

interface SidebarProps {
  activeTab: ActiveTab;
  onTabChange: (tab: ActiveTab) => void;
  unhandledCount: number;
  urgentCount: number;
  kbCount: number;
  brandTone: BrandToneType;
  userRole: UserRole;
}

export const Sidebar: React.FC<SidebarProps> = ({
  activeTab,
  onTabChange,
  unhandledCount,
  urgentCount,
  kbCount,
  brandTone,
  userRole
}) => {
  const menuItems = [
    {
      id: 'INBOX' as ActiveTab,
      label: 'Hộp thư hội thoại',
      icon: MessageSquare,
      description: 'AI Inbox & Co-pilot Reply',
      badge: unhandledCount > 0 ? unhandledCount : null,
      urgentBadge: urgentCount > 0 ? urgentCount : null,
      allowedRoles: ['ADMIN', 'MANAGER', 'AGENT']
    },
    {
      id: 'KNOWLEDGE_BASE' as ActiveTab,
      label: 'Knowledge Base',
      icon: BookOpen,
      description: 'Chính sách & FAQ thương hiệu',
      badge: kbCount,
      allowedRoles: ['ADMIN', 'MANAGER']
    },
    {
      id: 'BRAND_TONE' as ActiveTab,
      label: 'Tone giọng thương hiệu',
      icon: Sliders,
      description: 'Cấu hình AI Brand Tone',
      toneBadge: brandTone,
      allowedRoles: ['ADMIN']
    },
    {
      id: 'DASHBOARD' as ActiveTab,
      label: 'Báo cáo Dashboard',
      icon: LayoutDashboard,
      description: 'Thống kê Intent, Sentiment & AI',
      allowedRoles: ['ADMIN', 'MANAGER']
    }
  ];

  return (
    <aside className="w-64 bg-slate-900/95 border-r border-slate-800 flex flex-col justify-between p-4 text-slate-300">
      <div className="space-y-6">
        {/* Navigation Section */}
        <div>
          <div className="text-[10px] font-bold tracking-wider text-slate-500 uppercase px-3 mb-2">
            Phân hệ chính (MVP Scope)
          </div>
          <nav className="space-y-1.5">
            {menuItems.map(item => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              const isAllowed = item.allowedRoles.includes(userRole);

              return (
                <button
                  key={item.id}
                  onClick={() => isAllowed && onTabChange(item.id)}
                  disabled={!isAllowed}
                  className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-left transition-all ${
                    isActive
                      ? 'bg-indigo-600 text-white font-semibold shadow-md shadow-indigo-600/30'
                      : isAllowed
                      ? 'hover:bg-slate-800/80 text-slate-300 hover:text-slate-100'
                      : 'opacity-40 cursor-not-allowed text-slate-500'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Icon className={`w-5 h-5 ${isActive ? 'text-white' : 'text-indigo-400'}`} />
                    <div>
                      <div className="text-xs">{item.label}</div>
                      <div className={`text-[10px] ${isActive ? 'text-indigo-200' : 'text-slate-500'}`}>
                        {item.description}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-1">
                    {item.urgentBadge && (
                      <span className="text-[10px] font-extrabold px-1.5 py-0.5 rounded-full bg-rose-500 text-white animate-pulse flex items-center gap-0.5" title="Khẩn cấp">
                        <AlertTriangle className="w-2.5 h-2.5 inline" /> {item.urgentBadge}
                      </span>
                    )}
                    {item.badge !== null && item.badge !== undefined && (
                      <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${
                        isActive ? 'bg-indigo-700 text-white' : 'bg-slate-800 text-indigo-300 border border-slate-700'
                      }`}>
                        {item.badge}
                      </span>
                    )}
                    {item.toneBadge && (
                      <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/30 capitalize">
                        {item.toneBadge}
                      </span>
                    )}
                  </div>
                </button>
              );
            })}
          </nav>
        </div>
      </div>

      {/* Footer Info Box */}
      <div className="p-3 rounded-xl bg-slate-800/60 border border-slate-800 text-xs text-slate-400 space-y-2">
        <div className="flex items-center gap-2 text-indigo-300 font-semibold">
          <Zap className="w-4 h-4 text-amber-400" />
          <span>ReplyMind AI Active</span>
        </div>
        <p className="text-[11px] leading-relaxed text-slate-400">
          Mô hình AI Co-pilot tự động phân tích Intent, Sentiment và đề xuất phản hồi cho nhân viên kiểm duyệt.
        </p>
      </div>
    </aside>
  );
};
