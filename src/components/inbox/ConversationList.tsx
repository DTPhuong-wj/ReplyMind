import React from 'react';
import { Search, AlertTriangle, MessageSquare, CheckCircle2, Clock } from 'lucide-react';
import { Conversation, IntentType, PriorityLevel, SentimentType } from '../../types';

interface ConversationListProps {
  conversations: Conversation[];
  activeConversationId: string | null;
  onSelectConversation: (id: string) => void;
  statusFilter: 'ALL' | 'UNHANDLED' | 'RESOLVED';
  onStatusFilterChange: (status: 'ALL' | 'UNHANDLED' | 'RESOLVED') => void;
  priorityFilter: 'ALL' | PriorityLevel;
  onPriorityFilterChange: (p: 'ALL' | PriorityLevel) => void;
  searchQuery: string;
  onSearchQueryChange: (q: string) => void;
}

export const ConversationList: React.FC<ConversationListProps> = ({
  conversations,
  activeConversationId,
  onSelectConversation,
  statusFilter,
  onStatusFilterChange,
  priorityFilter,
  onPriorityFilterChange,
  searchQuery,
  onSearchQueryChange
}) => {
  const filtered = conversations.filter(c => {
    if (statusFilter === 'UNHANDLED' && c.status !== 'UNHANDLED') return false;
    if (statusFilter === 'RESOLVED' && c.status !== 'RESOLVED') return false;
    if (priorityFilter !== 'ALL' && c.priority !== priorityFilter) return false;
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const matchName = c.customerName.toLowerCase().includes(q);
      const matchOrder = c.orderCode?.toLowerCase().includes(q);
      const matchText = c.messages.some(m => m.text.toLowerCase().includes(q));
      return matchName || matchOrder || matchText;
    }
    return true;
  });

  const getPriorityBadgeClass = (p: PriorityLevel) => {
    switch (p) {
      case 'URGENT':
        return 'bg-rose-500/20 text-rose-300 border-rose-500/40 animate-pulse font-extrabold';
      case 'HIGH':
        return 'bg-amber-500/20 text-amber-300 border-amber-500/40 font-bold';
      case 'MEDIUM':
        return 'bg-blue-500/20 text-blue-300 border-blue-500/30';
      case 'LOW':
        return 'bg-slate-700/50 text-slate-400 border-slate-600/40';
    }
  };

  const getSentimentDot = (s: SentimentType) => {
    switch (s) {
      case 'POSITIVE': return <span className="w-2 h-2 rounded-full bg-emerald-400" title="Tích cực" />;
      case 'NEUTRAL': return <span className="w-2 h-2 rounded-full bg-slate-400" title="Trung lập" />;
      case 'NEGATIVE': return <span className="w-2 h-2 rounded-full bg-rose-500" title="Tiêu cực" />;
    }
  };

  const getIntentTag = (intent: IntentType) => {
    const map: Record<IntentType, { label: string; bg: string }> = {
      ORDER_STATUS: { label: 'Đơn hàng', bg: 'bg-blue-900/60 text-blue-200 border-blue-700' },
      SHIPPING: { label: 'Vận chuyển', bg: 'bg-cyan-900/60 text-cyan-200 border-cyan-700' },
      DELIVERY_ISSUE: { label: 'Giao hàng', bg: 'bg-indigo-900/60 text-indigo-200 border-indigo-700' },
      RETURN: { label: 'Đổi trả', bg: 'bg-amber-900/60 text-amber-200 border-amber-700' },
      REFUND: { label: 'Hoàn tiền', bg: 'bg-rose-900/60 text-rose-200 border-rose-700' },
      PRODUCT_QUESTION: { label: 'Sản phẩm', bg: 'bg-emerald-900/60 text-emerald-200 border-emerald-700' },
      COMPLAINT: { label: 'Khiếu nại', bg: 'bg-purple-900/60 text-purple-200 border-purple-700' }
    };
    const item = map[intent] || { label: intent, bg: 'bg-slate-800 text-slate-300' };
    return (
      <span className={`text-[10px] px-1.5 py-0.5 rounded border ${item.bg}`}>
        {item.label}
      </span>
    );
  };

  return (
    <div className="w-80 bg-slate-900/80 border-r border-slate-800 flex flex-col h-full text-slate-200">
      {/* Search Header */}
      <div className="p-3 border-b border-slate-800 space-y-2.5">
        <div className="relative">
          <Search className="w-4 h-4 absolute left-3 top-2.5 text-slate-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => onSearchQueryChange(e.target.value)}
            placeholder="Lọc tin nhắn, tên khách, đơn..."
            className="w-full pl-9 pr-3 py-1.5 rounded-lg bg-slate-800 border border-slate-700 text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-indigo-500"
          />
        </div>

        {/* Status Tabs */}
        <div className="flex bg-slate-950 p-1 rounded-lg border border-slate-800 text-xs">
          <button
            onClick={() => onStatusFilterChange('ALL')}
            className={`flex-1 py-1 text-center rounded-md font-medium transition-colors ${
              statusFilter === 'ALL' ? 'bg-slate-800 text-white font-semibold' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            Tất cả
          </button>
          <button
            onClick={() => onStatusFilterChange('UNHANDLED')}
            className={`flex-1 py-1 text-center rounded-md font-medium transition-colors ${
              statusFilter === 'UNHANDLED' ? 'bg-indigo-600 text-white font-semibold' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            Chưa xử lý
          </button>
          <button
            onClick={() => onStatusFilterChange('RESOLVED')}
            className={`flex-1 py-1 text-center rounded-md font-medium transition-colors ${
              statusFilter === 'RESOLVED' ? 'bg-emerald-700 text-white font-semibold' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            Đã xong
          </button>
        </div>

        {/* Priority Quick Filter */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 text-[11px]">
          <span className="text-slate-500 text-[10px] uppercase font-bold shrink-0">Ưu tiên:</span>
          {(['ALL', 'URGENT', 'HIGH', 'MEDIUM', 'LOW'] as const).map(p => (
            <button
              key={p}
              onClick={() => onPriorityFilterChange(p)}
              className={`px-2 py-0.5 rounded-full border transition-colors shrink-0 ${
                priorityFilter === p
                  ? 'bg-indigo-600 text-white border-indigo-500 font-semibold'
                  : 'bg-slate-800 text-slate-400 border-slate-700 hover:bg-slate-700'
              }`}
            >
              {p === 'ALL' ? 'Tất cả' : p}
            </button>
          ))}
        </div>
      </div>

      {/* Conversation Cards List */}
      <div className="flex-1 overflow-y-auto divide-y divide-slate-800/60">
        {filtered.length === 0 ? (
          <div className="p-8 text-center text-slate-500 text-xs space-y-2">
            <MessageSquare className="w-8 h-8 mx-auto opacity-30" />
            <p>Không tìm thấy hội thoại nào phù hợp với bộ lọc.</p>
          </div>
        ) : (
          filtered.map(conv => {
            const isSelected = activeConversationId === conv.id;
            const lastMsg = conv.messages[conv.messages.length - 1];

            return (
              <div
                key={conv.id}
                onClick={() => onSelectConversation(conv.id)}
                className={`p-3 cursor-pointer transition-all hover:bg-slate-800/50 ${
                  isSelected ? 'bg-indigo-950/40 border-l-4 border-indigo-500' : ''
                }`}
              >
                <div className="flex items-start justify-between gap-2 mb-1.5">
                  <div className="flex items-center gap-2 min-w-0">
                    <img
                      src={conv.customerAvatar}
                      alt={conv.customerName}
                      className="w-8 h-8 rounded-full object-cover shrink-0 ring-1 ring-slate-700"
                    />
                    <div className="truncate">
                      <div className="flex items-center gap-1.5">
                        {getSentimentDot(conv.sentiment)}
                        <span className="font-semibold text-xs text-slate-200 truncate">
                          {conv.customerName}
                        </span>
                      </div>
                      {conv.orderCode && (
                        <div className="text-[10px] text-indigo-400 font-mono">
                          {conv.orderCode}
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="flex flex-col items-end gap-1 shrink-0">
                    <span className="text-[10px] text-slate-500 flex items-center gap-1">
                      <Clock className="w-2.5 h-2.5" /> {conv.createdAt}
                    </span>
                    <span className={`text-[9px] px-1.5 py-0.2 rounded border ${getPriorityBadgeClass(conv.priority)}`}>
                      {conv.priority === 'URGENT' && <AlertTriangle className="w-2.5 h-2.5 inline mr-0.5" />}
                      {conv.priority}
                    </span>
                  </div>
                </div>

                {/* Intent & Message snippet */}
                <div className="space-y-1">
                  <div className="flex items-center gap-1.5">
                    {getIntentTag(conv.intent)}
                    {conv.status === 'RESOLVED' && (
                      <span className="text-[10px] text-emerald-400 flex items-center gap-0.5">
                        <CheckCircle2 className="w-3 h-3 inline" /> Đã xong
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-slate-400 line-clamp-2 leading-relaxed">
                    {lastMsg ? lastMsg.text : 'Chưa có tin nhắn'}
                  </p>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};
