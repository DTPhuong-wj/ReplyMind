export type IntentType = 
  | 'ORDER_STATUS'
  | 'SHIPPING'
  | 'DELIVERY_ISSUE'
  | 'RETURN'
  | 'REFUND'
  | 'PRODUCT_QUESTION'
  | 'COMPLAINT';

export type SentimentType = 'POSITIVE' | 'NEUTRAL' | 'NEGATIVE';

export type PriorityLevel = 'LOW' | 'MEDIUM' | 'HIGH' | 'URGENT';

export type BrandToneType = 'friendly' | 'professional' | 'casual' | 'formal';

export type UserRole = 'ADMIN' | 'MANAGER' | 'AGENT';

export type ConversationStatus = 'UNHANDLED' | 'PENDING' | 'RESOLVED';

export interface Message {
  id: string;
  sender: 'customer' | 'agent' | 'system';
  text: string;
  timestamp: string;
  isAiGenerated?: boolean;
  aiSuggestedTone?: BrandToneType;
}

export interface KnowledgeItem {
  id: string;
  title: string;
  category: 'Product Specs' | 'Shipping Policy' | 'Return & Exchange' | 'Refund Policy' | 'FAQ' | 'General';
  content: string;
  tags: string[];
  updatedAt: string;
}

export interface AIFeedbackReason {
  key: 'INCORRECT_INFO' | 'WRONG_TONE' | 'NOT_RELEVANT' | 'OTHER';
  label: string;
}

export interface AIFeedback {
  id: string;
  conversationId: string;
  messageId?: string;
  rating: 'HELPFUL' | 'NOT_HELPFUL';
  reason?: string;
  comment?: string;
  timestamp: string;
}

export interface Conversation {
  id: string;
  customerName: string;
  customerAvatar: string;
  customerEmail: string;
  orderCode?: string;
  status: ConversationStatus;
  priority: PriorityLevel;
  intent: IntentType;
  sentiment: SentimentType;
  messages: Message[];
  createdAt: string;
  lastActivity: string;
  assignedAgent?: string;
  matchedKbIds?: string[];
  aiSuggestion?: {
    text: string;
    tone: BrandToneType;
    confidence: number;
    matchedKbTitle?: string;
  };
}

export interface BrandConfig {
  brandId: string;
  brandName: string;
  logo: string;
  defaultTone: BrandToneType;
  customGuidelines?: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatar: string;
}

export interface DashboardStats {
  totalConversations: number;
  unhandledCount: number;
  resolvedCount: number;
  avgResponseTimeMinutes: number;
  aiAdoptionRate: number; // percentage 0-100
  aiHelpfulRatio: number;  // percentage 0-100
  intentBreakdown: Record<IntentType, number>;
  sentimentBreakdown: Record<SentimentType, number>;
  priorityBreakdown: Record<PriorityLevel, number>;
}
