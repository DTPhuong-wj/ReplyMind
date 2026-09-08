import React from 'react';
import { User, ShoppingBag, Tag, HeartHandshake, AlertOctagon, BookOpen, ExternalLink } from 'lucide-react';
import { Conversation, KnowledgeItem } from '../../types';

interface CustomerContextPanelProps {
  conversation: Conversation | null;
  kbList: KnowledgeItem[];
}

export const CustomerContextPanel: React.FC<CustomerContextPanelProps> = ({
  conversation,
  kbList
}) => {
  if (!conversation) return null;

  const matchedArticles = kbList.filter(kb => conversation.matchedKbIds?.includes(kb.id));

  const getIntentBadge = (intent: string) => {
    return <span className="font-semibold text-indigo-300">{intent}</span>;
  };

  const getSentimentBadge = (sentiment: string) => {
    switch (sentiment) {
      case 'POSITIVE': return <span className="text-emerald-400 font-bold">😊 Positive (Tích cực)</span>;
      case 'NEUTRAL': return <span className="text-slate-400 font-bold">😐 Neutral (Trung lập)</span>;
      case 'NEGATIVE': return <span className="text-rose-400 font-bold">😠 Negative (Tiêu cực)</span>;
      default: return <span>{sentiment}</span>;
    }
  };

  const getPriorityBadge = (priority: string) => {
    switch (priority) {
      case 'URGENT': return <span className="px-2 py-0.5 rounded bg-rose-500/20 text-rose-300 border border-rose-500/40 font-extrabold animate-pulse">🚨 URGENT (Khẩn cấp)</span>;
      case 'HIGH': return <span className="px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 border border-amber-500/40 font-bold">⚠️ HIGH (Cao)</span>;
      case 'MEDIUM': return <span className="px-2 py-0.5 rounded bg-blue-500/20 text-blue-300 border border-blue-500/30">🔷 MEDIUM (Trung bình)</span>;
      case 'LOW': return <span className="px-2 py-0.5 rounded bg-slate-800 text-slate-400">⚪ LOW (Thấp)</span>;
      default: return <span>{priority}</span>;
    }
  };

  return (
    <div className="w-80 bg-slate-900 border-l border-slate-800 p-4 space-y-5 overflow-y-auto text-slate-300">
      {/* Customer Info Box */}
      <div className="space-y-3 pb-4 border-b border-slate-800">
        <div className="text-[10px] font-bold text-slate-500 uppercase tracking-wider flex items-center gap-1.5">
          <User className="w-3.5 h-3.5 text-indigo-400" />
          Thông tin Khách hàng D2C
        </div>
        <div className="flex items-center gap-3">
          <img
            src={conversation.customerAvatar}
            alt={conversation.customerName}
            className="w-11 h-11 rounded-xl object-cover ring-2 ring-indigo-500/30"
          />
          <div>
            <h4 className="font-bold text-sm text-slate-100">{conversation.customerName}</h4>
            <p className="text-xs text-slate-400">{conversation.customerEmail}</p>
          </div>
        </div>

        {conversation.orderCode && (
          <div className="p-2.5 rounded-xl bg-slate-950 border border-slate-800 text-xs space-y-1">
            <div className="flex items-center justify-between text-slate-400">
              <span className="flex items-center gap-1">
                <ShoppingBag className="w-3.5 h-3.5 text-indigo-400" /> Mã Đơn hàng:
              </span>
              <strong className="text-indigo-300 font-mono">{conversation.orderCode}</strong>
            </div>
            <div className="text-[10px] text-slate-500">
              Hệ thống D2C Shopify / WooCommerce connected
            </div>
          </div>
        )}
      </div>

      {/* AI Analysis Card (F02) */}
      <div className="space-y-3 pb-4 border-b border-slate-800">
        <div className="text-[10px] font-bold text-slate-500 uppercase tracking-wider flex items-center gap-1.5">
          <Tag className="w-3.5 h-3.5 text-amber-400" />
          Kết quả phân tích AI (F02)
        </div>

        <div className="bg-slate-950 p-3 rounded-xl border border-slate-800 text-xs space-y-2.5">
          <div className="flex items-center justify-between">
            <span className="text-slate-400 flex items-center gap-1">
              <Tag className="w-3 h-3 text-indigo-400" /> Intent:
            </span>
            {getIntentBadge(conversation.intent)}
          </div>

          <div className="flex items-center justify-between">
            <span className="text-slate-400 flex items-center gap-1">
              <HeartHandshake className="w-3 h-3 text-emerald-400" /> Cảm xúc:
            </span>
            {getSentimentBadge(conversation.sentiment)}
          </div>

          <div className="flex items-center justify-between">
            <span className="text-slate-400 flex items-center gap-1">
              <AlertOctagon className="w-3 h-3 text-rose-400" /> Ưu tiên:
            </span>
            {getPriorityBadge(conversation.priority)}
          </div>
        </div>
      </div>

      {/* Matched Knowledge Base Articles (F03 & F04 RAG) */}
      <div className="space-y-3">
        <div className="text-[10px] font-bold text-slate-500 uppercase tracking-wider flex items-center gap-1.5">
          <BookOpen className="w-3.5 h-3.5 text-indigo-400" />
          Knowledge Base gợi ý (F03 RAG)
        </div>

        {matchedArticles.length === 0 ? (
          <div className="text-xs text-slate-500 italic p-3 bg-slate-950 rounded-xl border border-slate-800">
            Chưa có bài viết chính xác khớp từ khóa. AI sẽ sử dụng thông tin tổng quan thương hiệu.
          </div>
        ) : (
          matchedArticles.map(article => (
            <div
              key={article.id}
              className="bg-slate-950 p-3 rounded-xl border border-slate-800 text-xs space-y-1.5 hover:border-indigo-500/50 transition-colors cursor-pointer"
            >
              <div className="flex items-center justify-between font-semibold text-slate-200">
                <span className="truncate">{article.title}</span>
                <ExternalLink className="w-3 h-3 text-indigo-400 shrink-0" />
              </div>
              <p className="text-[11px] text-slate-400 line-clamp-3 leading-relaxed">
                {article.content}
              </p>
              <div className="flex items-center gap-1 pt-1">
                {article.tags.map(t => (
                  <span key={t} className="text-[9px] px-1.5 py-0.2 rounded bg-slate-800 text-slate-400">
                    #{t}
                  </span>
                ))}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};
