import React, { useState, useEffect } from 'react';
import { Send, Sparkles, ThumbsDown, RefreshCw, CheckCircle, Bot, AlertCircle } from 'lucide-react';
import { Conversation, BrandToneType, KnowledgeItem, AIFeedbackReason } from '../../types';
import { generateReplySuggestion } from '../../services/aiEngine';

interface ChatWindowProps {
  conversation: Conversation | null;
  brandTone: BrandToneType;
  kbList: KnowledgeItem[];
  onSendMessage: (conversationId: string, text: string, isAiGenerated?: boolean) => void;
  onToggleResolve: (conversationId: string) => void;
  onSendAiFeedback: (conversationId: string, rating: 'HELPFUL' | 'NOT_HELPFUL', reason?: string, comment?: string) => void;
}

const FEEDBACK_REASONS: AIFeedbackReason[] = [
  { key: 'INCORRECT_INFO', label: 'Thông tin không chính xác với chính sách' },
  { key: 'WRONG_TONE', label: 'Không đúng tone giọng thương hiệu' },
  { key: 'NOT_RELEVANT', label: 'Không giải quyết đúng câu hỏi khách hàng' },
  { key: 'OTHER', label: 'Lý do khác' }
];

export const ChatWindow: React.FC<ChatWindowProps> = ({
  conversation,
  brandTone,
  kbList,
  onSendMessage,
  onToggleResolve,
  onSendAiFeedback
}) => {
  const [editableSuggestion, setEditableSuggestion] = useState<string>('');
  const [customInput, setCustomInput] = useState<string>('');
  const [matchedKbTitle, setMatchedKbTitle] = useState<string | undefined>('');
  const [showFeedbackModal, setShowFeedbackModal] = useState<boolean>(false);
  const [selectedReason, setSelectedReason] = useState<string>('INCORRECT_INFO');
  const [feedbackComment, setFeedbackComment] = useState<string>('');
  const [feedbackSuccess, setFeedbackSuccess] = useState<string | null>(null);

  // Regenerate suggestion when active conversation changes or brand tone changes
  useEffect(() => {
    if (conversation) {
      const lastCustMsg = [...conversation.messages].reverse().find(m => m.sender === 'customer');
      if (lastCustMsg) {
        const suggestion = generateReplySuggestion(
          lastCustMsg.text,
          conversation.intent,
          brandTone,
          kbList,
          conversation.customerName,
          conversation.orderCode
        );
        setEditableSuggestion(suggestion.text);
        setMatchedKbTitle(suggestion.matchedKbTitle);
      }
    }
  }, [conversation?.id, brandTone, kbList]);

  if (!conversation) {
    return (
      <div className="flex-1 bg-slate-950 flex flex-col items-center justify-center text-slate-500 p-8">
        <Bot className="w-12 h-12 text-slate-700 mb-3" />
        <p className="text-sm">Chọn một hội thoại bên trái để xem nội dung và nhận gợi ý từ AI.</p>
      </div>
    );
  }

  const handleRegenerate = () => {
    const lastCustMsg = [...conversation.messages].reverse().find(m => m.sender === 'customer');
    if (lastCustMsg) {
      const res = generateReplySuggestion(
        lastCustMsg.text,
        conversation.intent,
        brandTone,
        kbList,
        conversation.customerName,
        conversation.orderCode
      );
      setEditableSuggestion(res.text);
      setMatchedKbTitle(res.matchedKbTitle);
    }
  };

  const handleSendSuggestion = () => {
    if (!editableSuggestion.trim()) return;
    onSendMessage(conversation.id, editableSuggestion, true);
    onSendAiFeedback(conversation.id, 'HELPFUL');
    setFeedbackSuccess('Đã gửi phản hồi & ghi nhận đánh giá 👍 Helpful cho AI!');
    setTimeout(() => setFeedbackSuccess(null), 3000);
  };

  const handleSendCustom = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customInput.trim()) return;
    onSendMessage(conversation.id, customInput, false);
    setCustomInput('');
  };

  const submitNotHelpfulFeedback = () => {
    onSendAiFeedback(conversation.id, 'NOT_HELPFUL', selectedReason, feedbackComment);
    setShowFeedbackModal(false);
    setFeedbackSuccess('Đã lưu phản hồi 👎 Not Helpful để huấn luyện AI!');
    setTimeout(() => setFeedbackSuccess(null), 3000);
  };

  return (
    <div className="flex-1 bg-slate-950 flex flex-col h-full text-slate-200 relative">
      {/* Header */}
      <div className="h-14 bg-slate-900 border-b border-slate-800 px-5 flex items-center justify-between shrink-0">
        <div className="flex items-center gap-3">
          <img
            src={conversation.customerAvatar}
            alt={conversation.customerName}
            className="w-9 h-9 rounded-full object-cover ring-2 ring-indigo-500/40"
          />
          <div>
            <div className="flex items-center gap-2">
              <span className="font-bold text-sm text-slate-100">{conversation.customerName}</span>
              {conversation.orderCode && (
                <span className="text-xs font-mono px-2 py-0.5 rounded bg-slate-800 text-indigo-300 border border-slate-700">
                  {conversation.orderCode}
                </span>
              )}
            </div>
            <div className="text-[11px] text-slate-400">
              {conversation.customerEmail} • Phụ trách: {conversation.assignedAgent || 'Chưa phân công'}
            </div>
          </div>
        </div>

        <button
          onClick={() => onToggleResolve(conversation.id)}
          className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all flex items-center gap-1.5 ${
            conversation.status === 'RESOLVED'
              ? 'bg-slate-800 text-slate-300 border border-slate-700 hover:bg-slate-700'
              : 'bg-emerald-600 hover:bg-emerald-500 text-white shadow-md shadow-emerald-600/30'
          }`}
        >
          <CheckCircle className="w-4 h-4" />
          {conversation.status === 'RESOLVED' ? 'Mở lại hội thoại' : 'Đánh dấu đã xong'}
        </button>
      </div>

      {/* Alert toast notification */}
      {feedbackSuccess && (
        <div className="absolute top-16 right-4 z-50 bg-emerald-950 border border-emerald-500/50 text-emerald-200 px-4 py-2 rounded-xl text-xs flex items-center gap-2 shadow-xl animate-bounce">
          <CheckCircle className="w-4 h-4 text-emerald-400" />
          <span>{feedbackSuccess}</span>
        </div>
      )}

      {/* Messages Timeline */}
      <div className="flex-1 overflow-y-auto p-5 space-y-4">
        {conversation.messages.map(msg => {
          const isCust = msg.sender === 'customer';
          return (
            <div
              key={msg.id}
              className={`flex flex-col ${isCust ? 'items-start' : 'items-end'}`}
            >
              <div className="text-[10px] text-slate-500 mb-1 px-1">
                {isCust ? conversation.customerName : 'Nhân viên (Agent)'} • {msg.timestamp}
                {msg.isAiGenerated && (
                  <span className="ml-1.5 text-indigo-400 font-medium bg-indigo-950 px-1.5 py-0.2 rounded border border-indigo-800">
                    ✨ AI Assist
                  </span>
                )}
              </div>
              <div
                className={`max-w-[75%] rounded-2xl px-4 py-2.5 text-xs leading-relaxed ${
                  isCust
                    ? 'bg-slate-900 border border-slate-800 text-slate-200 rounded-tl-none'
                    : 'bg-indigo-600 text-white rounded-tr-none shadow-md shadow-indigo-600/20'
                }`}
              >
                {msg.text}
              </div>
            </div>
          );
        })}
      </div>

      {/* AI Co-Pilot Suggestion Box (F04 & F06) */}
      <div className="p-4 bg-slate-900/90 border-t border-slate-800 space-y-3">
        <div className="bg-slate-950 p-3.5 rounded-xl border border-indigo-500/30 space-y-2.5">
          <div className="flex items-center justify-between text-xs">
            <div className="flex items-center gap-2">
              <span className="flex items-center gap-1.5 font-bold text-indigo-400 bg-indigo-950/80 px-2 py-0.5 rounded-md border border-indigo-800">
                <Sparkles className="w-3.5 h-3.5 text-amber-400 animate-spin" />
                ReplyMind AI Co-Pilot
              </span>
              <span className="text-[10px] text-slate-400 capitalize">
                Tone: <strong className="text-indigo-300">{brandTone}</strong>
              </span>
              {matchedKbTitle && (
                <span className="text-[10px] text-slate-400 truncate max-w-[200px]" title={matchedKbTitle}>
                  📖 Source: <span className="text-slate-300 italic">{matchedKbTitle}</span>
                </span>
              )}
            </div>

            <button
              onClick={handleRegenerate}
              className="text-slate-400 hover:text-indigo-300 text-[11px] flex items-center gap-1 transition-colors"
              title="Tạo lại gợi ý từ AI"
            >
              <RefreshCw className="w-3 h-3" /> Tạo lại
            </button>
          </div>

          {/* Editable AI Suggestion Box */}
          <textarea
            value={editableSuggestion}
            onChange={(e) => setEditableSuggestion(e.target.value)}
            rows={3}
            placeholder="AI suggestion loading..."
            className="w-full bg-slate-900 border border-slate-800 rounded-lg p-2.5 text-xs text-slate-200 focus:outline-none focus:border-indigo-500 transition-all resize-none leading-relaxed"
          />

          {/* AI Suggestion Actions */}
          <div className="flex items-center justify-between pt-1">
            <div className="flex items-center gap-2">
              <button
                onClick={handleSendSuggestion}
                className="bg-indigo-600 hover:bg-indigo-500 text-white font-semibold px-3 py-1.5 rounded-lg text-xs flex items-center gap-1.5 shadow-md shadow-indigo-600/30 transition-all"
              >
                <Send className="w-3.5 h-3.5" />
                Chấp nhận & Gửi (1-Click)
              </button>

              <button
                onClick={() => setShowFeedbackModal(true)}
                className="bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-rose-300 px-2.5 py-1.5 rounded-lg text-xs flex items-center gap-1 border border-slate-700 transition-colors"
                title="Báo phản hồi không hợp lý (Not Helpful)"
              >
                <ThumbsDown className="w-3.5 h-3.5 text-rose-400" />
                Not Helpful
              </button>
            </div>

            <div className="text-[10px] text-slate-500 italic">
              *Nhân viên kiểm duyệt trước khi gửi
            </div>
          </div>
        </div>

        {/* Manual Custom Reply Input */}
        <form onSubmit={handleSendCustom} className="flex items-center gap-2">
          <input
            type="text"
            value={customInput}
            onChange={(e) => setCustomInput(e.target.value)}
            placeholder="Hoặc tự soạn tin nhắn trực tiếp..."
            className="flex-1 bg-slate-950 border border-slate-800 rounded-xl px-4 py-2 text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-indigo-500"
          />
          <button
            type="submit"
            className="bg-slate-800 hover:bg-slate-700 text-slate-200 px-3 py-2 rounded-xl text-xs font-semibold flex items-center gap-1 border border-slate-700 transition-colors"
          >
            <Send className="w-3.5 h-3.5" /> Gửi
          </button>
        </form>
      </div>

      {/* AI Feedback Modal (F06) */}
      {showFeedbackModal && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl max-w-md w-full p-5 space-y-4 text-slate-200 shadow-2xl">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div className="flex items-center gap-2 text-rose-400 font-bold text-sm">
                <AlertCircle className="w-4 h-4" />
                Đánh giá chất lượng AI Suggestion
              </div>
              <button
                onClick={() => setShowFeedbackModal(false)}
                className="text-slate-500 hover:text-slate-300 text-xs"
              >
                ✕
              </button>
            </div>

            <p className="text-xs text-slate-400">
              Vui lòng chọn lý do gợi ý từ AI chưa phù hợp để hỗ trợ nâng cao độ chính xác:
            </p>

            <div className="space-y-2">
              {FEEDBACK_REASONS.map(r => (
                <label
                  key={r.key}
                  className={`flex items-center gap-2 p-2.5 rounded-xl border text-xs cursor-pointer transition-colors ${
                    selectedReason === r.key
                      ? 'bg-rose-950/40 border-rose-500/60 text-rose-200'
                      : 'bg-slate-950 border-slate-800 text-slate-400 hover:bg-slate-800'
                  }`}
                >
                  <input
                    type="radio"
                    name="feedbackReason"
                    value={r.key}
                    checked={selectedReason === r.key}
                    onChange={() => setSelectedReason(r.key)}
                    className="accent-rose-500"
                  />
                  <span>{r.label}</span>
                </label>
              ))}
            </div>

            <textarea
              value={feedbackComment}
              onChange={(e) => setFeedbackComment(e.target.value)}
              placeholder="Ghi chú thêm chi tiết (tùy chọn)..."
              rows={2}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-xs text-slate-200 focus:outline-none focus:border-rose-500 resize-none"
            />

            <div className="flex items-center justify-end gap-2 pt-2 border-t border-slate-800">
              <button
                onClick={() => setShowFeedbackModal(false)}
                className="px-3 py-1.5 rounded-lg bg-slate-800 text-slate-400 text-xs hover:bg-slate-700"
              >
                Hủy
              </button>
              <button
                onClick={submitNotHelpfulFeedback}
                className="px-4 py-1.5 rounded-lg bg-rose-600 hover:bg-rose-500 text-white font-semibold text-xs shadow-md shadow-rose-600/30"
              >
                Gửi Đánh Giá 👎
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
