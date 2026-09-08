import React from 'react';
import { LayoutDashboard, MessageSquare, CheckCircle2, Clock, Sparkles, ThumbsUp, Tag, HeartHandshake, AlertTriangle } from 'lucide-react';
import { DashboardStats, AIFeedback } from '../../types';

interface AnalyticsDashboardProps {
  stats: DashboardStats;
  feedbacks: AIFeedback[];
}

export const AnalyticsDashboard: React.FC<AnalyticsDashboardProps> = ({
  stats,
  feedbacks
}) => {
  const intentLabels: Record<string, { label: string; color: string }> = {
    ORDER_STATUS: { label: 'Tình trạng đơn hàng', color: 'bg-blue-500' },
    SHIPPING: { label: 'Chính sách Vận chuyển', color: 'bg-cyan-500' },
    DELIVERY_ISSUE: { label: 'Sự cố Giao hàng', color: 'bg-indigo-500' },
    RETURN: { label: 'Đổi / Trả hàng', color: 'bg-amber-500' },
    REFUND: { label: 'Yêu cầu Hoàn tiền', color: 'bg-rose-500' },
    PRODUCT_QUESTION: { label: 'Hỏi về Sản phẩm', color: 'bg-emerald-500' },
    COMPLAINT: { label: 'Khiếu nại Dịch vụ', color: 'bg-purple-500' }
  };

  const totalIntents = Object.values(stats.intentBreakdown).reduce((a, b) => a + b, 0) || 1;

  return (
    <div className="flex-1 bg-slate-950 p-6 overflow-y-auto text-slate-200">
      <div className="max-w-6xl mx-auto space-y-6">
        {/* Header */}
        <div className="pb-4 border-b border-slate-800">
          <div className="flex items-center gap-2">
            <LayoutDashboard className="w-6 h-6 text-indigo-400" />
            <h2 className="text-xl font-extrabold text-slate-100">Báo Cáo Bảng Điều Khiển Dashboard (F07)</h2>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Theo dõi hiệu quả hoạt động chăm sóc khách hàng D2C, phân bổ Intent, Sentiment và tỷ lệ chấp nhận gợi ý AI.
          </p>
        </div>

        {/* Top Metric Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          <div className="bg-slate-900 border border-slate-800 p-4 rounded-2xl space-y-1">
            <div className="flex items-center justify-between text-slate-400 text-xs">
              <span>Tổng hội thoại</span>
              <MessageSquare className="w-4 h-4 text-indigo-400" />
            </div>
            <div className="text-2xl font-extrabold text-slate-100">{stats.totalConversations}</div>
            <div className="text-[10px] text-slate-500">Tất cả kênh tiếp nhận</div>
          </div>

          <div className="bg-slate-900 border border-slate-800 p-4 rounded-2xl space-y-1">
            <div className="flex items-center justify-between text-slate-400 text-xs">
              <span>Chưa xử lý</span>
              <Clock className="w-4 h-4 text-amber-400" />
            </div>
            <div className="text-2xl font-extrabold text-amber-400">{stats.unhandledCount}</div>
            <div className="text-[10px] text-slate-500">Cần phản hồi sớm</div>
          </div>

          <div className="bg-slate-900 border border-slate-800 p-4 rounded-2xl space-y-1">
            <div className="flex items-center justify-between text-slate-400 text-xs">
              <span>Đã xử lý xong</span>
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            </div>
            <div className="text-2xl font-extrabold text-emerald-400">{stats.resolvedCount}</div>
            <div className="text-[10px] text-emerald-500/80">Hoàn tất thành công</div>
          </div>

          <div className="bg-slate-900 border border-slate-800 p-4 rounded-2xl space-y-1">
            <div className="flex items-center justify-between text-slate-400 text-xs">
              <span>Tỷ lệ dùng AI</span>
              <Sparkles className="w-4 h-4 text-indigo-400" />
            </div>
            <div className="text-2xl font-extrabold text-indigo-400">{stats.aiAdoptionRate}%</div>
            <div className="text-[10px] text-slate-500">Nhân viên chấp nhận gợi ý</div>
          </div>

          <div className="bg-slate-900 border border-slate-800 p-4 rounded-2xl space-y-1">
            <div className="flex items-center justify-between text-slate-400 text-xs">
              <span>AI Helpful Score</span>
              <ThumbsUp className="w-4 h-4 text-emerald-400" />
            </div>
            <div className="text-2xl font-extrabold text-emerald-400">{stats.aiHelpfulRatio}%</div>
            <div className="text-[10px] text-slate-500">Đánh giá 👍 từ Agent</div>
          </div>
        </div>

        {/* Breakdown Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Intent Distribution Bar List */}
          <div className="bg-slate-900 border border-slate-800 p-5 rounded-2xl space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h3 className="font-bold text-xs text-slate-100 flex items-center gap-2">
                <Tag className="w-4 h-4 text-indigo-400" />
                Phân bổ Intent Khách hàng (F02 Intent Analysis)
              </h3>
              <span className="text-[10px] text-slate-500">Mẫu thống kê</span>
            </div>

            <div className="space-y-3 text-xs">
              {Object.entries(stats.intentBreakdown).map(([key, count]) => {
                const meta = intentLabels[key] || { label: key, color: 'bg-slate-500' };
                const pct = Math.round((count / totalIntents) * 100);

                return (
                  <div key={key} className="space-y-1">
                    <div className="flex justify-between text-slate-300">
                      <span>{meta.label}</span>
                      <span className="font-mono text-slate-400">{count} ({pct}%)</span>
                    </div>
                    <div className="w-full bg-slate-950 h-2 rounded-full overflow-hidden border border-slate-800">
                      <div
                        className={`h-full ${meta.color} rounded-full transition-all duration-500`}
                        style={{ width: `${pct}%` }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Sentiment & Priority Breakdown */}
          <div className="space-y-6">
            {/* Sentiment Breakdown */}
            <div className="bg-slate-900 border border-slate-800 p-5 rounded-2xl space-y-4">
              <div className="border-b border-slate-800 pb-3">
                <h3 className="font-bold text-xs text-slate-100 flex items-center gap-2">
                  <HeartHandshake className="w-4 h-4 text-emerald-400" />
                  Cảm xúc Khách hàng (Sentiment Analysis)
                </h3>
              </div>

              <div className="grid grid-cols-3 gap-3 text-center">
                <div className="bg-slate-950 p-3 rounded-xl border border-slate-800">
                  <div className="text-xl">😊</div>
                  <div className="text-xs font-bold text-emerald-400 mt-1">Positive</div>
                  <div className="text-sm font-extrabold text-slate-200">{stats.sentimentBreakdown.POSITIVE}</div>
                </div>

                <div className="bg-slate-950 p-3 rounded-xl border border-slate-800">
                  <div className="text-xl">😐</div>
                  <div className="text-xs font-bold text-slate-400 mt-1">Neutral</div>
                  <div className="text-sm font-extrabold text-slate-200">{stats.sentimentBreakdown.NEUTRAL}</div>
                </div>

                <div className="bg-slate-950 p-3 rounded-xl border border-slate-800">
                  <div className="text-xl">😠</div>
                  <div className="text-xs font-bold text-rose-400 mt-1">Negative</div>
                  <div className="text-sm font-extrabold text-slate-200">{stats.sentimentBreakdown.NEGATIVE}</div>
                </div>
              </div>
            </div>

            {/* Priority Breakdown */}
            <div className="bg-slate-900 border border-slate-800 p-5 rounded-2xl space-y-4">
              <div className="border-b border-slate-800 pb-3">
                <h3 className="font-bold text-xs text-slate-100 flex items-center gap-2">
                  <AlertTriangle className="w-4 h-4 text-rose-400" />
                  Mức độ Ưu tiên (Priority Detection)
                </h3>
              </div>

              <div className="grid grid-cols-4 gap-2 text-center text-xs">
                <div className="bg-rose-950/40 border border-rose-500/30 p-2.5 rounded-xl">
                  <div className="text-[10px] text-rose-300 font-bold">URGENT</div>
                  <div className="text-lg font-extrabold text-rose-200">{stats.priorityBreakdown.URGENT}</div>
                </div>
                <div className="bg-amber-950/40 border border-amber-500/30 p-2.5 rounded-xl">
                  <div className="text-[10px] text-amber-300 font-bold">HIGH</div>
                  <div className="text-lg font-extrabold text-amber-200">{stats.priorityBreakdown.HIGH}</div>
                </div>
                <div className="bg-blue-950/40 border border-blue-500/30 p-2.5 rounded-xl">
                  <div className="text-[10px] text-blue-300 font-bold">MEDIUM</div>
                  <div className="text-lg font-extrabold text-blue-200">{stats.priorityBreakdown.MEDIUM}</div>
                </div>
                <div className="bg-slate-950 border border-slate-800 p-2.5 rounded-xl">
                  <div className="text-[10px] text-slate-400 font-bold">LOW</div>
                  <div className="text-lg font-extrabold text-slate-300">{stats.priorityBreakdown.LOW}</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* AI Feedback Audit Logs (F06) */}
        <div className="bg-slate-900 border border-slate-800 p-5 rounded-2xl space-y-3">
          <h3 className="font-bold text-xs text-slate-100 flex items-center gap-2">
            <ThumbsUp className="w-4 h-4 text-indigo-400" />
            Nhật ký Đánh giá AI Feedback gần đây (F06 AI Feedback Audit)
          </h3>

          <div className="divide-y divide-slate-800 text-xs">
            {feedbacks.map(fb => (
              <div key={fb.id} className="py-2.5 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                    fb.rating === 'HELPFUL'
                      ? 'bg-emerald-950 text-emerald-300 border border-emerald-800'
                      : 'bg-rose-950 text-rose-300 border border-rose-800'
                  }`}>
                    {fb.rating === 'HELPFUL' ? '👍 Helpful' : '👎 Not Helpful'}
                  </span>
                  <span className="text-slate-300 font-mono text-[11px]">ID: {fb.conversationId}</span>
                  {fb.reason && (
                    <span className="text-slate-400 text-[11px]">
                      Lý do: <strong className="text-rose-300">{fb.reason}</strong> {fb.comment && `(${fb.comment})`}
                    </span>
                  )}
                </div>
                <span className="text-slate-500 text-[10px]">{fb.timestamp}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
