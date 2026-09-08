import React, { useState } from 'react';
import { Sliders, Sparkles, CheckCircle, Heart, Shield, MessageCircle, Award, Save } from 'lucide-react';
import { BrandConfig, BrandToneType } from '../../types';

interface BrandToneSettingsProps {
  brandConfig: BrandConfig;
  onSaveConfig: (config: BrandConfig) => void;
}

export const BrandToneSettings: React.FC<BrandToneSettingsProps> = ({
  brandConfig,
  onSaveConfig
}) => {
  const [selectedTone, setSelectedTone] = useState<BrandToneType>(brandConfig.defaultTone);
  const [customGuidelines, setCustomGuidelines] = useState(brandConfig.customGuidelines || '');
  const [savedSuccess, setSavedSuccess] = useState(false);

  const tonesList: {
    id: BrandToneType;
    name: string;
    description: string;
    icon: React.ElementType;
    badgeColor: string;
    sampleText: string;
  }[] = [
    {
      id: 'friendly',
      name: 'Friendly (Thân thiện)',
      description: 'Văn phong ấm áp, gần gũi, sử dụng icon nhẹ nhàng. Tạo cảm giác khách hàng được chào đón như bạn bè.',
      icon: Heart,
      badgeColor: 'border-pink-500/50 bg-pink-950/30 text-pink-300',
      sampleText: 'Dạ chào chị Thảo Chi thân yêu! ✨ Lumina hỗ trợ đổi sản phẩm sang size khác miễn phí trong 7 ngày đó ạ. Chị giữ tem mác giúp em nhé, shipper bên em sẽ mang tận nhà tới đổi cho chị nè! ❤️'
    },
    {
      id: 'professional',
      name: 'Professional (Chuyên nghiệp)',
      description: 'Từ ngữ chuẩn mực, lịch sự, tập trung vào giải quyết triệt để thắc mắc và đảm bảo sự uy tín.',
      icon: Shield,
      badgeColor: 'border-blue-500/50 bg-blue-950/30 text-blue-300',
      sampleText: 'Kính chào quý khách Thảo Chi. Thương hiệu Lumina hỗ trợ chính sách đổi trả hàng nguyên tem mác trong vòng 07 ngày kể từ khi nhận hàng. Bộ phận CSKH sẽ cử nhân viên giao vận liên hệ thu hồi và giao lại size mới cho quý khách.'
    },
    {
      id: 'casual',
      name: 'Casual (Gần gũi, Tự nhiên)',
      description: 'Năng động, trẻ trung, linh hoạt. Rất phù hợp cho các thương hiệu thời trang D2C nhắm vào Gen-Z.',
      icon: MessageCircle,
      badgeColor: 'border-amber-500/50 bg-amber-950/30 text-amber-300',
      sampleText: 'Hélo Thảo Chi nè! Đổi size thoải mái trong 7 ngày luôn nha bạn ơi. Chỉ cần áo chưa giặt còn tem mác là shipper bên mình qua tận nhà đổi cho bạn liền nghen ✨'
    },
    {
      id: 'formal',
      name: 'Formal (Trang trọng)',
      description: 'Nghiêm túc, tôn trọng tối đa, sử dụng từ ngữ cao cấp. Dành cho thương hiệu quà tặng / xa xỉ.',
      icon: Award,
      badgeColor: 'border-purple-500/50 bg-purple-950/30 text-purple-300',
      sampleText: 'Kính gửi Quý khách hàng Thảo Chi. Lumina trân trọng thông báo quý khách được quyền áp dụng đặc quyền đổi sản phẩm trong thời hạn 07 ngày. Rất hân hạnh được phục vụ Quý khách.'
    }
  ];

  const handleSave = () => {
    onSaveConfig({
      ...brandConfig,
      defaultTone: selectedTone,
      customGuidelines
    });
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 3000);
  };

  const currentToneObj = tonesList.find(t => t.id === selectedTone) || tonesList[0];

  return (
    <div className="flex-1 bg-slate-950 p-6 overflow-y-auto text-slate-200">
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-800">
          <div>
            <div className="flex items-center gap-2">
              <Sliders className="w-6 h-6 text-indigo-400" />
              <h2 className="text-xl font-extrabold text-slate-100">Thiết lập Tone Giọng Thương Hiệu (F05)</h2>
            </div>
            <p className="text-xs text-slate-400 mt-1">
              Cấu hình phong cách ngôn ngữ và định hướng văn phong để AI tùy biến câu phản hồi chính xác theo bản sắc thương hiệu D2C.
            </p>
          </div>

          {savedSuccess && (
            <div className="bg-emerald-950 border border-emerald-500/50 text-emerald-300 px-3 py-1.5 rounded-xl text-xs flex items-center gap-1.5 animate-bounce">
              <CheckCircle className="w-4 h-4 text-emerald-400" />
              Đã lưu cấu hình Brand Tone!
            </div>
          )}
        </div>

        {/* Tone Selector Grid */}
        <div className="space-y-3">
          <label className="text-xs font-bold uppercase tracking-wider text-slate-400 block">
            Chọn Phong cách Tone giọng mặc định:
          </label>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {tonesList.map(t => {
              const Icon = t.icon;
              const isSelected = selectedTone === t.id;

              return (
                <div
                  key={t.id}
                  onClick={() => setSelectedTone(t.id)}
                  className={`p-4 rounded-2xl border cursor-pointer transition-all ${
                    isSelected
                      ? 'bg-indigo-950/40 border-indigo-500 ring-2 ring-indigo-500/30'
                      : 'bg-slate-900 border-slate-800 hover:border-slate-700'
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <div className="p-2 rounded-xl bg-slate-800 text-indigo-400">
                        <Icon className="w-4 h-4" />
                      </div>
                      <span className="font-bold text-sm text-slate-100">{t.name}</span>
                    </div>

                    {isSelected && (
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-indigo-600 text-white flex items-center gap-1">
                        <CheckCircle className="w-3 h-3" /> Đang chọn
                      </span>
                    )}
                  </div>

                  <p className="text-xs text-slate-400 leading-relaxed">
                    {t.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Live AI Sample Preview Card */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 space-y-3">
          <div className="flex items-center justify-between text-xs">
            <span className="font-bold text-indigo-400 flex items-center gap-1.5">
              <Sparkles className="w-4 h-4 text-amber-400" />
              Xem trước câu phản hồi của AI (Live Sample Preview)
            </span>
            <span className={`text-[10px] px-2 py-0.5 rounded border font-semibold ${currentToneObj.badgeColor}`}>
              Tone: {currentToneObj.name}
            </span>
          </div>

          <div className="space-y-2 text-xs">
            <div className="bg-slate-950 p-3 rounded-xl border border-slate-800/80">
              <div className="text-[10px] text-slate-500 font-bold mb-1">💬 Tin nhắn câu hỏi của khách hàng:</div>
              <p className="text-slate-300 italic">"Áo sơ mi mình mua về mặc bị chật size thì shop xử lý như thế nào ạ?"</p>
            </div>

            <div className="bg-indigo-950/40 p-3.5 rounded-xl border border-indigo-500/30">
              <div className="text-[10px] text-indigo-400 font-bold mb-1 flex items-center gap-1">
                <Sparkles className="w-3 h-3 text-amber-400" /> AI Reply Generator Suggestion:
              </div>
              <p className="text-slate-100 leading-relaxed font-medium">
                {currentToneObj.sampleText}
              </p>
            </div>
          </div>
        </div>

        {/* Custom Brand Guidelines Input */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 space-y-3">
          <label className="block text-xs font-bold text-slate-300">
            Ghi chú quy chuẩn ngôn từ riêng cho thương hiệu (Custom Brand Guidelines):
          </label>
          <textarea
            rows={3}
            value={customGuidelines}
            onChange={(e) => setCustomGuidelines(e.target.value)}
            placeholder="VD: Không dùng từ 'dạ vâng' quá 3 lần, luôn gọi khách là 'chị' nếu thuộc nhóm thời trang nữ, không hứa hẹn giao hỏa tốc ngoài Hà Nội/TP.HCM..."
            className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-xs text-slate-200 focus:outline-none focus:border-indigo-500 leading-relaxed resize-none"
          />
        </div>

        {/* Action button */}
        <div className="flex justify-end pt-2">
          <button
            onClick={handleSave}
            className="bg-indigo-600 hover:bg-indigo-500 text-white font-semibold px-6 py-2.5 rounded-xl text-xs flex items-center gap-2 shadow-lg shadow-indigo-600/30 transition-all"
          >
            <Save className="w-4 h-4" /> Lưu cấu hình Brand Tone
          </button>
        </div>
      </div>
    </div>
  );
};
