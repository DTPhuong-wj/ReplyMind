import { IntentType, SentimentType, PriorityLevel, BrandToneType, KnowledgeItem } from '../types';

export interface AnalysisResult {
  intent: IntentType;
  sentiment: SentimentType;
  priority: PriorityLevel;
  matchedKbIds: string[];
}

export function analyzeCustomerMessage(text: string, kbList: KnowledgeItem[]): AnalysisResult {
  const lowerText = text.toLowerCase();
  
  // 1. Detect Intent
  let intent: IntentType = 'PRODUCT_QUESTION';
  
  if (lowerText.includes('trừ tiền') || lowerText.includes('hoàn lại') || lowerText.includes('hoàn tiền') || lowerText.includes('trả lại tiền') || lowerText.includes('refund')) {
    intent = 'REFUND';
  } else if (lowerText.includes('đổi size') || lowerText.includes('đổi hàng') || lowerText.includes('trả hàng') || lowerText.includes('đổi từ') || lowerText.includes('mặc chật') || lowerText.includes('mặc rộng')) {
    intent = 'RETURN';
  } else if (lowerText.includes('khiếu nại') || lowerText.includes('kém') || lowerText.includes('hư hỏng') || lowerText.includes('bóp méo') || lowerText.includes('ướt nhẹp') || lowerText.includes('thất vọng')) {
    intent = 'COMPLAINT';
  } else if (lowerText.includes('đơn hàng') || lowerText.includes('đang ở đâu') || lowerText.includes('kiểm tra đơn') || lowerText.includes('giao chưa') || lowerText.includes('mã đơn')) {
    intent = 'ORDER_STATUS';
  } else if (lowerText.includes('hỏa tốc') || lowerText.includes('vận chuyển') || lowerText.includes('freeship') || lowerText.includes('phí giao') || lowerText.includes('ship')) {
    intent = 'SHIPPING';
  } else if (lowerText.includes('chưa nhận được') || lowerText.includes('giao nhầm') || lowerText.includes('giao chậm') || lowerText.includes('shipper')) {
    intent = 'DELIVERY_ISSUE';
  }

  // 2. Detect Sentiment
  let sentiment: SentimentType = 'NEUTRAL';
  if (lowerText.includes('yêu cầu ngay') || lowerText.includes('kém') || lowerText.includes('thất vọng') || lowerText.includes('bị bóp méo') || lowerText.includes('trừ tiền 2 lần') || lowerText.includes('bị lỗi') || lowerText.includes('gấp')) {
    sentiment = 'NEGATIVE';
  } else if (lowerText.includes('thích quá') || lowerText.includes('cảm ơn') || lowerText.includes('ưng ý') || lowerText.includes('tuyệt vời') || lowerText.includes('dễ thương')) {
    sentiment = 'POSITIVE';
  }

  // 3. Priority Detection
  let priority: PriorityLevel = 'LOW';
  if (intent === 'REFUND' || lowerText.includes('trừ tiền 2 lần') || lowerText.includes('gấp') || (intent === 'COMPLAINT' && sentiment === 'NEGATIVE')) {
    priority = 'URGENT';
  } else if (intent === 'RETURN' || intent === 'DELIVERY_ISSUE' || sentiment === 'NEGATIVE') {
    priority = 'HIGH';
  } else if (intent === 'ORDER_STATUS' || intent === 'SHIPPING') {
    priority = 'MEDIUM';
  }

  // 4. RAG Knowledge Base Matching
  const matchedKbIds = kbList
    .filter(kb => {
      const matchTag = kb.tags.some(tag => lowerText.includes(tag.toLowerCase()));
      const matchTitle = kb.title.toLowerCase().includes(intent.toLowerCase());
      return matchTag || matchTitle;
    })
    .map(kb => kb.id);

  return { intent, sentiment, priority, matchedKbIds };
}

export function generateReplySuggestion(
  text: string,
  intent: IntentType,
  brandTone: BrandToneType,
  kbList: KnowledgeItem[],
  customerName: string,
  orderCode?: string
): { text: string; tone: BrandToneType; confidence: number; matchedKbTitle?: string } {
  const analysis = analyzeCustomerMessage(text, kbList);
  const matchedKb = kbList.find(kb => analysis.matchedKbIds.includes(kb.id)) || kbList[0];
  const matchedKbTitle = matchedKb?.title;

  let body = '';
  const orderRef = orderCode ? `đơn hàng ${orderCode}` : 'đơn hàng của quý khách';

  switch (intent) {
    case 'REFUND':
      body = `Em đã ghi nhận yêu cầu hoàn tiền cho ${orderRef}. Bộ phận kế toán Lumina sẽ kiểm tra và hoàn lại 100% số tiền vào tài khoản ngân hàng / ví MoMo của chị trong 24h ạ.`;
      break;
    case 'RETURN':
      body = `Lumina rất sẵn lòng hỗ trợ chị đổi sản phẩm trong 7 ngày theo chính sách đổi trả. Chị giữ nguyên tem mác sản phẩm giúp em, bên em sẽ cho shipper mang hàng mới đến tận nhà đổi cho chị ạ.`;
      break;
    case 'ORDER_STATUS':
      body = `Dạ em đã kiểm tra tiến độ ${orderRef}, kiện hàng của mình đang trên đường vận chuyển và dự kiến sẽ được shipper liên hệ giao trong hôm nay ạ.`;
      break;
    case 'SHIPPING':
      body = `Lumina hỗ trợ giao hỏa tốc 2h nội thành và giao toàn quốc từ 2-4 ngày. Đơn hàng từ 499,000đ được áp dụng Miễn phí vận chuyển (Freeship) ạ!`;
      break;
    case 'PRODUCT_QUESTION':
      body = matchedKb 
        ? `${matchedKb.content}` 
        : `Sản phẩm của Lumina làm từ chất liệu cao cấp thoáng mát, chuẩn form dáng và bảo quản rất dễ dàng ạ.`;
      break;
    case 'COMPLAINT':
      body = `Lumina chân thành xin lỗi vì trải nghiệm chưa hoàn hảo với ${orderRef}. Bên em cam kết tiếp nhận ý kiến phản hồi và xử lý đền bù ngay cho quý khách ạ.`;
      break;
    default:
      body = `Cảm ơn quý khách đã nhắn tin cho Lumina. Em sẵn sàng hỗ trợ giải đáp mọi thắc mắc của mình ạ!`;
  }

  // Apply Brand Tone Transformation
  let tonePrefix = '';
  let toneSuffix = '';

  if (brandTone === 'friendly') {
    tonePrefix = `Chào ${customerName} thân yêu! ✨ `;
    toneSuffix = ` Chúc ${customerName} một ngày thật nhiều niềm vui nhé ạ ❤️`;
  } else if (brandTone === 'professional') {
    tonePrefix = `Kính chào quý khách ${customerName}, `;
    toneSuffix = ` Trân trọng cảm ơn sự đồng hành của quý khách cùng thương hiệu Lumina.`;
  } else if (brandTone === 'casual') {
    tonePrefix = `Dạ hélo ${customerName} nè! `;
    toneSuffix = ` Cần hỗ trợ thêm gì nhắn Lumina ngay nha! ✨`;
  } else if (brandTone === 'formal') {
    tonePrefix = `Kính gửi Quý khách hàng ${customerName}, `;
    toneSuffix = ` Rất hân hạnh được phục vụ Quý khách. Trân trọng.`;
  }

  return {
    text: `${tonePrefix}${body}${toneSuffix}`,
    tone: brandTone,
    confidence: 0.95,
    matchedKbTitle
  };
}
