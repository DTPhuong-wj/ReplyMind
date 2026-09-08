import { Conversation, KnowledgeItem, BrandConfig, User, AIFeedback } from '../types';

export const mockCurrentBrand: BrandConfig = {
  brandId: 'brand_d2c_lumina',
  brandName: 'Lumina Apparel & Life',
  logo: '✨',
  defaultTone: 'friendly',
  customGuidelines: 'Thương hiệu ưu tiên từ ngữ lịch sự, ấm áp, hỗ trợ nhiệt tình khách hàng trẻ năng động. Luôn cảm ơn khách đã đồng hành cùng Lumina.'
};

export const mockUsers: User[] = [
  {
    id: 'usr_admin_1',
    name: 'Phương Nguyễn (Brand Manager)',
    email: 'phuong.nguyen@lumina.vn',
    role: 'ADMIN',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80'
  },
  {
    id: 'usr_manager_1',
    name: 'Trần Hoàng (CS Leader)',
    email: 'hoang.tran@lumina.vn',
    role: 'MANAGER',
    avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80'
  },
  {
    id: 'usr_agent_1',
    name: 'Lê Mai (CS Agent)',
    email: 'mai.le@lumina.vn',
    role: 'AGENT',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&auto=format&fit=crop&q=80'
  }
];

export const mockKnowledgeBase: KnowledgeItem[] = [
  {
    id: 'kb_1',
    title: 'Chính sách vận chuyển & Thời gian giao hàng',
    category: 'Shipping Policy',
    content: 'Lumina hỗ trợ giao hàng hỏa tốc trong 2h tại Hà Nội & TP.HCM. Giao hàng chuẩn toàn quốc từ 2-4 ngày làm việc. Đơn hàng từ 499,000đ được Miễn phí vận chuyển (Freeship). Tra cứu vận đơn trực tiếp qua hotline 1900-LUMINA.',
    tags: ['shipping', 'delivery', 'freeship', 'hỏa tốc'],
    updatedAt: '2026-09-01'
  },
  {
    id: 'kb_2',
    title: 'Chính sách Đổi/Trả hàng trong vòng 7 ngày',
    category: 'Return & Exchange',
    content: 'Đổi hàng miễn phí trong vòng 7 ngày kể từ khi nhận hàng đối với sản phẩm bị lỗi sản xuất, giao sai size hoặc màu. Sản phẩm đổi trả phải còn nguyên tem mác, chưa qua sử dụng hoặc giặt tẩy. Lumina hỗ trợ shipper đến tận nhà lấy hàng đổi.',
    tags: ['return', 'exchange', 'đổi trả', 'lỗi size'],
    updatedAt: '2026-08-28'
  },
  {
    id: 'kb_3',
    title: 'Quy trình Hoàn tiền (Refund Policy)',
    category: 'Refund Policy',
    content: 'Hoàn tiền 100% qua tài khoản ngân hàng hoặc ví MoMo trong 24h-48h sau khi kho Lumina tiếp nhận và xác nhận hàng hoàn trả hợp lệ. Đối với trường hợp thanh toán nhầm/trùng đơn, hỗ trợ hoàn tiền trong ngày.',
    tags: ['refund', 'hoàn tiền', 'momo', 'chuyển khoản'],
    updatedAt: '2026-08-20'
  },
  {
    id: 'kb_4',
    title: 'Thông số & Hướng dẫn bảo quản Áo Linen Premium',
    category: 'Product Specs',
    content: 'Áo sơ mi Linen Premium Lumina làm từ 100% sợi đay tự nhiên thoáng mát. Khuyến nghị giặt tay hoặc giặt máy chế độ nhẹ với túi giặt. Không xịt trực tiếp chất tẩy rửa mạnh. Ủi ở nhiệt độ trung bình khi áo còn hơi ẩm.',
    tags: ['product', 'linen', 'bảo quản', 'giặt áo'],
    updatedAt: '2026-09-05'
  },
  {
    id: 'kb_5',
    title: 'Giải quyết Khiếu nại dịch vụ & Đơn hàng hư hỏng',
    category: 'FAQ',
    content: 'Trường hợp kiện hàng có dấu hiệu hư hỏng, ướt rách do quá trình vận chuyển, quý khách vui lòng quay video mở hàng và gửi lại CSKH. Lumina cam kết bù ngay sản phẩm mới và gửi quà xin lỗi tới quý khách trong 24h.',
    tags: ['complaint', 'hư hỏng', 'khiếu nại', 'xin lỗi'],
    updatedAt: '2026-09-02'
  }
];

export const mockConversations: Conversation[] = [
  {
    id: 'conv_101',
    customerName: 'Hoàng Anh Thu',
    customerAvatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&auto=format&fit=crop&q=80',
    customerEmail: 'anhthu.hoang@gmail.com',
    orderCode: 'LUM-88421',
    status: 'UNHANDLED',
    priority: 'URGENT',
    intent: 'REFUND',
    sentiment: 'NEGATIVE',
    createdAt: '10 phút trước',
    lastActivity: '10 phút trước',
    assignedAgent: 'Lê Mai (CS Agent)',
    matchedKbIds: ['kb_3', 'kb_5'],
    messages: [
      {
        id: 'msg_101_1',
        sender: 'customer',
        text: 'Tài khoản của mình bị trừ tiền 2 lần cho đơn hàng LUM-88421! Mình chuyển khoản 650k lúc 10h15 và hệ thống báo lỗi nên mình quét thêm lần nữa. Yêu cầu hoàn lại 650k ngay giúp mình gấp nhé!',
        timestamp: '10:20 AM'
      }
    ],
    aiSuggestion: {
      text: 'Chào chị Anh Thu! Em rất tiếc vì sự cố thanh toán bị trùng đơn hàng LUM-88421 khiến chị lo lắng ạ. Em đã kiểm tra hệ thống và ghi nhận khoản thanh toán trùng 650,000đ. Chị vui lòng gửi giúp em Số tài khoản + Tên ngân hàng thụ hưởng, bộ phận kế toán Lumina sẽ hoàn lại 100% tiền về tài khoản của chị ngay trong hôm nay ạ. Cảm ơn chị!',
      tone: 'friendly',
      confidence: 0.96,
      matchedKbTitle: 'Quy trình Hoàn tiền (Refund Policy)'
    }
  },
  {
    id: 'conv_102',
    customerName: 'Nguyễn Quốc Bảo',
    customerAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
    customerEmail: 'quocbao.nguyen@yahoo.com',
    orderCode: 'LUM-88390',
    status: 'UNHANDLED',
    priority: 'HIGH',
    intent: 'RETURN',
    sentiment: 'NEUTRAL',
    createdAt: '25 phút trước',
    lastActivity: '25 phút trước',
    assignedAgent: 'Lê Mai (CS Agent)',
    matchedKbIds: ['kb_2'],
    messages: [
      {
        id: 'msg_102_1',
        sender: 'customer',
        text: 'Mình nhận áo sơ mi Linen rồi nhưng mặc hơi chật ngực. Mình muốn đổi từ size M lên size L có được không shop?',
        timestamp: '10:05 AM'
      }
    ],
    aiSuggestion: {
      text: 'Dạ chào anh Quốc Bảo! Lumina hoàn toàn hỗ trợ đổi sang áo Linen size L cho anh miễn phí trong vòng 7 ngày ạ. Anh Bảo giữ nguyên tem mác sản phẩm giúp em nhé. Bên em sẽ cho shipper mang sẵn size L đến tận nhà giao cho anh và nhận lại áo size M luôn ạ! Anh xác nhận giúp em địa chỉ nhận hàng nhé.',
      tone: 'friendly',
      confidence: 0.94,
      matchedKbTitle: 'Chính sách Đổi/Trả hàng trong vòng 7 ngày'
    }
  },
  {
    id: 'conv_103',
    customerName: 'Phạm Minh Đức',
    customerAvatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80',
    customerEmail: 'duc.pham@outlook.com',
    orderCode: 'LUM-88310',
    status: 'UNHANDLED',
    priority: 'MEDIUM',
    intent: 'ORDER_STATUS',
    sentiment: 'NEUTRAL',
    createdAt: '1 giờ trước',
    lastActivity: '1 giờ trước',
    matchedKbIds: ['kb_1'],
    messages: [
      {
        id: 'msg_103_1',
        sender: 'customer',
        text: 'Cho mình kiểm tra đơn LUM-88310 đặt từ hôm qua ở Hà Nội đã được giao chưa ạ?',
        timestamp: '09:30 AM'
      }
    ],
    aiSuggestion: {
      text: 'Dạ chào anh Minh Đức! Đơn hàng LUM-88310 của anh tại Hà Nội đã được Lumina bàn giao cho đơn vị vận chuyển hỏa tốc sáng nay. Dự kiến shipper sẽ liên hệ giao hàng cho anh trước 12h00 trưa nay ạ. Anh chú ý điện thoại giúp em nhé!',
      tone: 'friendly',
      confidence: 0.92,
      matchedKbTitle: 'Chính sách vận chuyển & Thời gian giao hàng'
    }
  },
  {
    id: 'conv_104',
    customerName: 'Đặng Thảo Chi',
    customerAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
    customerEmail: 'chichidang@gmail.com',
    status: 'UNHANDLED',
    priority: 'LOW',
    intent: 'PRODUCT_QUESTION',
    sentiment: 'POSITIVE',
    createdAt: '2 giờ trước',
    lastActivity: '2 giờ trước',
    matchedKbIds: ['kb_4'],
    messages: [
      {
        id: 'msg_104_1',
        sender: 'customer',
        text: 'Chào shop! Áo sơ mi Linen Premium màu Be bên mình giặt máy có bị co rút nhiều không ạ? Nhìn thích quá!',
        timestamp: '08:30 AM'
      }
    ],
    aiSuggestion: {
      text: 'Chào bạn Thảo Chi dễ thương! Áo Linen Premium của Lumina đã qua xử lý wash mềm chống co rút nên bạn hoàn toàn yên tâm giặt máy chế độ nhẹ (cho vào túi giặt) nhé ạ. Màu Be mặc lên da cực kỳ sáng và sang luôn đó ạ ✨ Chúc bạn chọn được mẫu ưng ý nhé!',
      tone: 'friendly',
      confidence: 0.98,
      matchedKbTitle: 'Thông số & Hướng dẫn bảo quản Áo Linen Premium'
    }
  },
  {
    id: 'conv_105',
    customerName: 'Vũ Đăng Khoa',
    customerAvatar: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=150&auto=format&fit=crop&q=80',
    customerEmail: 'dangkhoa.vu@gmail.com',
    orderCode: 'LUM-88250',
    status: 'RESOLVED',
    priority: 'HIGH',
    intent: 'COMPLAINT',
    sentiment: 'NEGATIVE',
    createdAt: 'Hôm qua',
    lastActivity: 'Hôm qua',
    assignedAgent: 'Trần Hoàng (CS Leader)',
    messages: [
      {
        id: 'msg_105_1',
        sender: 'customer',
        text: 'Hộp hàng nhận về bị bóp méo ướt nhẹp cả vỏ ngoài. May quần áo bên trong bọc nilon nên chưa hư. Lần sau đóng bọc cẩn thận hơn nhé!',
        timestamp: 'Yesterday 04:15 PM'
      },
      {
        id: 'msg_105_2',
        sender: 'agent',
        text: 'Dạ Lumina chân thành xin lỗi anh Đăng Khoa về trải nghiệm kiện hàng chưa hoàn hảo do bên vận chuyển ạ! Bên em đã ghi nhận phản ánh và gia cố lại hộp đóng gói 2 lớp cho các đơn sau. Lumina xin tặng anh voucher 50k cho đơn tới làm quà tạ lỗi ạ!',
        timestamp: 'Yesterday 04:20 PM'
      }
    ]
  }
];

export const mockAIFeedbacks: AIFeedback[] = [
  {
    id: 'fb_1',
    conversationId: 'conv_105',
    rating: 'HELPFUL',
    timestamp: '2026-09-07 16:21:00'
  },
  {
    id: 'fb_2',
    conversationId: 'conv_99',
    rating: 'NOT_HELPFUL',
    reason: 'Wrong Tone',
    comment: 'Cần văn phong thân thiện hơn nữa cho nhóm khách trẻ.',
    timestamp: '2026-09-07 14:10:00'
  }
];
