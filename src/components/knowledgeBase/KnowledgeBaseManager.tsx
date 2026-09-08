import React, { useState } from 'react';
import { BookOpen, Plus, Search, Trash2, Edit3, Save, X, Tag } from 'lucide-react';
import { KnowledgeItem } from '../../types';

interface KnowledgeBaseManagerProps {
  kbList: KnowledgeItem[];
  onAddKbItem: (item: Omit<KnowledgeItem, 'id' | 'updatedAt'>) => void;
  onUpdateKbItem: (item: KnowledgeItem) => void;
  onDeleteKbItem: (id: string) => void;
}

export const KnowledgeBaseManager: React.FC<KnowledgeBaseManagerProps> = ({
  kbList,
  onAddKbItem,
  onUpdateKbItem,
  onDeleteKbItem
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('ALL');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<KnowledgeItem | null>(null);

  // Form states
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState<KnowledgeItem['category']>('FAQ');
  const [content, setContent] = useState('');
  const [tagsInput, setTagsInput] = useState('');

  const categories = [
    'ALL',
    'Product Specs',
    'Shipping Policy',
    'Return & Exchange',
    'Refund Policy',
    'FAQ',
    'General'
  ];

  const filtered = kbList.filter(item => {
    if (selectedCategory !== 'ALL' && item.category !== selectedCategory) return false;
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      return item.title.toLowerCase().includes(q) || item.content.toLowerCase().includes(q) || item.tags.some(t => t.toLowerCase().includes(q));
    }
    return true;
  });

  const handleOpenAddModal = () => {
    setEditingItem(null);
    setTitle('');
    setCategory('FAQ');
    setContent('');
    setTagsInput('');
    setIsModalOpen(true);
  };

  const handleOpenEditModal = (item: KnowledgeItem) => {
    setEditingItem(item);
    setTitle(item.title);
    setCategory(item.category);
    setContent(item.content);
    setTagsInput(item.tags.join(', '));
    setIsModalOpen(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !content.trim()) return;

    const tagsArr = tagsInput.split(',').map(t => t.trim()).filter(Boolean);

    if (editingItem) {
      onUpdateKbItem({
        ...editingItem,
        title,
        category,
        content,
        tags: tagsArr,
        updatedAt: new Date().toISOString().split('T')[0]
      });
    } else {
      onAddKbItem({
        title,
        category,
        content,
        tags: tagsArr
      });
    }

    setIsModalOpen(false);
  };

  return (
    <div className="flex-1 bg-slate-950 p-6 overflow-y-auto text-slate-200">
      <div className="max-w-5xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-slate-800">
          <div>
            <div className="flex items-center gap-2">
              <BookOpen className="w-6 h-6 text-indigo-400" />
              <h2 className="text-xl font-extrabold text-slate-100">Knowledge Base Thương Hiệu (F03)</h2>
            </div>
            <p className="text-xs text-slate-400 mt-1">
              Quản lý các nguồn chính sách, thông số sản phẩm và FAQ làm dữ liệu nguồn cho AI gợi ý câu phản hồi chính xác.
            </p>
          </div>

          <button
            onClick={handleOpenAddModal}
            className="bg-indigo-600 hover:bg-indigo-500 text-white font-semibold px-4 py-2 rounded-xl text-xs flex items-center gap-2 shadow-lg shadow-indigo-600/30 transition-all shrink-0"
          >
            <Plus className="w-4 h-4" /> Thêm bài viết mới
          </button>
        </div>

        {/* Controls Bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="relative w-full sm:w-80">
            <Search className="w-4 h-4 absolute left-3 top-2.5 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Tìm theo từ khóa, thẻ tag..."
              className="w-full pl-9 pr-3 py-1.5 rounded-xl bg-slate-900 border border-slate-800 text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-indigo-500"
            />
          </div>

          {/* Category Tabs */}
          <div className="flex items-center gap-1.5 overflow-x-auto w-full sm:w-auto pb-1 text-xs">
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1.5 rounded-xl text-xs font-medium transition-colors shrink-0 ${
                  selectedCategory === cat
                    ? 'bg-indigo-600 text-white font-semibold'
                    : 'bg-slate-900 text-slate-400 border border-slate-800 hover:bg-slate-800'
                }`}
              >
                {cat === 'ALL' ? 'Tất cả' : cat}
              </button>
            ))}
          </div>
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filtered.length === 0 ? (
            <div className="col-span-full p-12 text-center text-slate-500 text-xs bg-slate-900/50 rounded-2xl border border-slate-800">
              Chưa có bài viết Knowledge Base nào phù hợp.
            </div>
          ) : (
            filtered.map(item => (
              <div
                key={item.id}
                className="bg-slate-900 border border-slate-800 hover:border-indigo-500/50 rounded-2xl p-4 flex flex-col justify-between space-y-3 transition-all group"
              >
                <div className="space-y-2">
                  <div className="flex items-start justify-between gap-2">
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-indigo-950 text-indigo-300 border border-indigo-800">
                      {item.category}
                    </span>
                    <span className="text-[10px] text-slate-500">Cập nhật: {item.updatedAt}</span>
                  </div>

                  <h3 className="font-bold text-sm text-slate-100 group-hover:text-indigo-300 transition-colors">
                    {item.title}
                  </h3>

                  <p className="text-xs text-slate-400 leading-relaxed line-clamp-4">
                    {item.content}
                  </p>
                </div>

                <div className="flex items-center justify-between pt-3 border-t border-slate-800/80">
                  <div className="flex items-center gap-1.5 flex-wrap">
                    <Tag className="w-3 h-3 text-slate-500" />
                    {item.tags.map(tag => (
                      <span key={tag} className="text-[9px] px-1.5 py-0.5 rounded bg-slate-800 text-slate-400">
                        #{tag}
                      </span>
                    ))}
                  </div>

                  <div className="flex items-center gap-1">
                    <button
                      onClick={() => handleOpenEditModal(item)}
                      className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 transition-colors"
                      title="Chỉnh sửa"
                    >
                      <Edit3 className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => onDeleteKbItem(item.id)}
                      className="p-1.5 rounded-lg bg-slate-800 hover:bg-rose-950 text-rose-400 transition-colors"
                      title="Xóa"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Add / Edit Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <form onSubmit={handleSubmit} className="bg-slate-900 border border-slate-800 rounded-2xl max-w-lg w-full p-5 space-y-4 shadow-2xl">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h3 className="font-bold text-sm text-slate-100 flex items-center gap-2">
                <BookOpen className="w-4 h-4 text-indigo-400" />
                {editingItem ? 'Chỉnh sửa bài viết KB' : 'Tạo bài viết KB mới'}
              </h3>
              <button
                type="button"
                onClick={() => setIsModalOpen(false)}
                className="text-slate-500 hover:text-slate-300 text-xs"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-3 text-xs">
              <div>
                <label className="block text-slate-400 mb-1 font-medium">Tiêu đề bài viết chính sách:</label>
                <input
                  type="text"
                  required
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="VD: Chính sách giao hỏa tốc 2h tại Hà Nội"
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-slate-200 focus:outline-none focus:border-indigo-500"
                />
              </div>

              <div>
                <label className="block text-slate-400 mb-1 font-medium">Danh mục:</label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value as KnowledgeItem['category'])}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-slate-200 focus:outline-none focus:border-indigo-500"
                >
                  <option value="Shipping Policy">Shipping Policy</option>
                  <option value="Return & Exchange">Return & Exchange</option>
                  <option value="Refund Policy">Refund Policy</option>
                  <option value="Product Specs">Product Specs</option>
                  <option value="FAQ">FAQ</option>
                  <option value="General">General</option>
                </select>
              </div>

              <div>
                <label className="block text-slate-400 mb-1 font-medium">Nội dung chính sách (Nguồn thông tin cho AI):</label>
                <textarea
                  required
                  rows={4}
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  placeholder="Ghi rõ chi tiết chính sách, quy định đổi trả, thời gian xử lý..."
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-slate-200 focus:outline-none focus:border-indigo-500 resize-none leading-relaxed"
                />
              </div>

              <div>
                <label className="block text-slate-400 mb-1 font-medium">Thẻ từ khóa (phân cách bởi dấu phẩy):</label>
                <input
                  type="text"
                  value={tagsInput}
                  onChange={(e) => setTagsInput(e.target.value)}
                  placeholder="shipping, hỏa tốc, giao hàng, đổi trả"
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-slate-200 focus:outline-none focus:border-indigo-500"
                />
              </div>
            </div>

            <div className="flex items-center justify-end gap-2 pt-3 border-t border-slate-800">
              <button
                type="button"
                onClick={() => setIsModalOpen(false)}
                className="px-4 py-2 rounded-xl bg-slate-800 text-slate-400 text-xs hover:bg-slate-700"
              >
                Hủy
              </button>
              <button
                type="submit"
                className="px-5 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-xs flex items-center gap-1.5 shadow-md shadow-indigo-600/30"
              >
                <Save className="w-3.5 h-3.5" /> Lưu bài viết KB
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};
