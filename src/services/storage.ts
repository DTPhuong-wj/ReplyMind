import { Conversation, KnowledgeItem, BrandConfig, AIFeedback, DashboardStats, IntentType, SentimentType, PriorityLevel } from '../types';
import { mockConversations, mockKnowledgeBase, mockCurrentBrand, mockAIFeedbacks } from '../data/mockData';

const STORAGE_KEYS = {
  CONVERSATIONS: 'replymind_conversations',
  KNOWLEDGE_BASE: 'replymind_knowledge_base',
  BRAND_CONFIG: 'replymind_brand_config',
  AI_FEEDBACKS: 'replymind_ai_feedbacks'
};

export function getStoredConversations(): Conversation[] {
  const data = localStorage.getItem(STORAGE_KEYS.CONVERSATIONS);
  if (!data) {
    localStorage.setItem(STORAGE_KEYS.CONVERSATIONS, JSON.stringify(mockConversations));
    return mockConversations;
  }
  try {
    return JSON.parse(data);
  } catch {
    return mockConversations;
  }
}

export function saveConversations(conversations: Conversation[]) {
  localStorage.setItem(STORAGE_KEYS.CONVERSATIONS, JSON.stringify(conversations));
}

export function getStoredKnowledgeBase(): KnowledgeItem[] {
  const data = localStorage.getItem(STORAGE_KEYS.KNOWLEDGE_BASE);
  if (!data) {
    localStorage.setItem(STORAGE_KEYS.KNOWLEDGE_BASE, JSON.stringify(mockKnowledgeBase));
    return mockKnowledgeBase;
  }
  try {
    return JSON.parse(data);
  } catch {
    return mockKnowledgeBase;
  }
}

export function saveKnowledgeBase(kbList: KnowledgeItem[]) {
  localStorage.setItem(STORAGE_KEYS.KNOWLEDGE_BASE, JSON.stringify(kbList));
}

export function getStoredBrandConfig(): BrandConfig {
  const data = localStorage.getItem(STORAGE_KEYS.BRAND_CONFIG);
  if (!data) {
    localStorage.setItem(STORAGE_KEYS.BRAND_CONFIG, JSON.stringify(mockCurrentBrand));
    return mockCurrentBrand;
  }
  try {
    return JSON.parse(data);
  } catch {
    return mockCurrentBrand;
  }
}

export function saveBrandConfig(config: BrandConfig) {
  localStorage.setItem(STORAGE_KEYS.BRAND_CONFIG, JSON.stringify(config));
}

export function getStoredFeedbacks(): AIFeedback[] {
  const data = localStorage.getItem(STORAGE_KEYS.AI_FEEDBACKS);
  if (!data) {
    localStorage.setItem(STORAGE_KEYS.AI_FEEDBACKS, JSON.stringify(mockAIFeedbacks));
    return mockAIFeedbacks;
  }
  try {
    return JSON.parse(data);
  } catch {
    return mockAIFeedbacks;
  }
}

export function saveFeedbacks(feedbacks: AIFeedback[]) {
  localStorage.setItem(STORAGE_KEYS.AI_FEEDBACKS, JSON.stringify(feedbacks));
}

export function calculateDashboardStats(): DashboardStats {
  const conversations = getStoredConversations();
  const feedbacks = getStoredFeedbacks();

  const totalConversations = conversations.length;
  const unhandledCount = conversations.filter(c => c.status === 'UNHANDLED').length;
  const resolvedCount = conversations.filter(c => c.status === 'RESOLVED').length;

  const intentBreakdown: Record<IntentType, number> = {
    ORDER_STATUS: 0,
    SHIPPING: 0,
    DELIVERY_ISSUE: 0,
    RETURN: 0,
    REFUND: 0,
    PRODUCT_QUESTION: 0,
    COMPLAINT: 0
  };

  const sentimentBreakdown: Record<SentimentType, number> = {
    POSITIVE: 0,
    NEUTRAL: 0,
    NEGATIVE: 0
  };

  const priorityBreakdown: Record<PriorityLevel, number> = {
    LOW: 0,
    MEDIUM: 0,
    HIGH: 0,
    URGENT: 0
  };

  conversations.forEach(c => {
    if (intentBreakdown[c.intent] !== undefined) intentBreakdown[c.intent]++;
    if (sentimentBreakdown[c.sentiment] !== undefined) sentimentBreakdown[c.sentiment]++;
    if (priorityBreakdown[c.priority] !== undefined) priorityBreakdown[c.priority]++;
  });

  const helpfulCount = feedbacks.filter(f => f.rating === 'HELPFUL').length;
  const aiHelpfulRatio = feedbacks.length > 0 ? Math.round((helpfulCount / feedbacks.length) * 100) : 92;
  const aiAdoptionRate = 88; // Default adoption metric for D2C CS staff

  return {
    totalConversations,
    unhandledCount,
    resolvedCount,
    avgResponseTimeMinutes: 1.8,
    aiAdoptionRate,
    aiHelpfulRatio,
    intentBreakdown,
    sentimentBreakdown,
    priorityBreakdown
  };
}
