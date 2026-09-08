import React, { useState, useEffect } from 'react';
import { Navbar } from './components/layout/Navbar';
import { Sidebar, ActiveTab } from './components/layout/Sidebar';
import { ConversationList } from './components/inbox/ConversationList';
import { ChatWindow } from './components/inbox/ChatWindow';
import { CustomerContextPanel } from './components/inbox/CustomerContextPanel';
import { KnowledgeBaseManager } from './components/knowledgeBase/KnowledgeBaseManager';
import { BrandToneSettings } from './components/brandTone/BrandToneSettings';
import { AnalyticsDashboard } from './components/dashboard/AnalyticsDashboard';

import { Conversation, KnowledgeItem, BrandConfig, User, AIFeedback, PriorityLevel } from './types';
import { mockUsers } from './data/mockData';
import {
  getStoredConversations,
  saveConversations,
  getStoredKnowledgeBase,
  saveKnowledgeBase,
  getStoredBrandConfig,
  saveBrandConfig,
  getStoredFeedbacks,
  saveFeedbacks,
  calculateDashboardStats
} from './services/storage';

export const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<ActiveTab>('INBOX');
  const [currentUser, setCurrentUser] = useState<User>(mockUsers[0]);
  const [brandConfig, setBrandConfig] = useState<BrandConfig>(getStoredBrandConfig());
  const [conversations, setConversations] = useState<Conversation[]>(getStoredConversations());
  const [activeConversationId, setActiveConversationId] = useState<string | null>(conversations[0]?.id || null);
  const [kbList, setKbList] = useState<KnowledgeItem[]>(getStoredKnowledgeBase());
  const [feedbacks, setFeedbacks] = useState<AIFeedback[]>(getStoredFeedbacks());

  // Inbox filters
  const [statusFilter, setStatusFilter] = useState<'ALL' | 'UNHANDLED' | 'RESOLVED'>('ALL');
  const [priorityFilter, setPriorityFilter] = useState<'ALL' | PriorityLevel>('ALL');
  const [searchQuery, setSearchQuery] = useState<string>('');

  // Auto-sync storage changes
  useEffect(() => {
    saveConversations(conversations);
  }, [conversations]);

  useEffect(() => {
    saveKnowledgeBase(kbList);
  }, [kbList]);

  useEffect(() => {
    saveBrandConfig(brandConfig);
  }, [brandConfig]);

  useEffect(() => {
    saveFeedbacks(feedbacks);
  }, [feedbacks]);

  // Actions
  const handleSendMessage = (conversationId: string, text: string, isAiGenerated: boolean = false) => {
    setConversations(prev =>
      prev.map(c => {
        if (c.id === conversationId) {
          const newMsg = {
            id: `msg_${Date.now()}`,
            sender: 'agent' as const,
            text,
            timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
            isAiGenerated
          };
          return {
            ...c,
            status: 'RESOLVED',
            lastActivity: 'Vừa xong',
            messages: [...c.messages, newMsg]
          };
        }
        return c;
      })
    );
  };

  const handleToggleResolve = (conversationId: string) => {
    setConversations(prev =>
      prev.map(c => {
        if (c.id === conversationId) {
          return {
            ...c,
            status: c.status === 'RESOLVED' ? 'UNHANDLED' : 'RESOLVED'
          };
        }
        return c;
      })
    );
  };

  const handleSendAiFeedback = (conversationId: string, rating: 'HELPFUL' | 'NOT_HELPFUL', reason?: string, comment?: string) => {
    const newFb: AIFeedback = {
      id: `fb_${Date.now()}`,
      conversationId,
      rating,
      reason,
      comment,
      timestamp: new Date().toLocaleString()
    };
    setFeedbacks(prev => [newFb, ...prev]);
  };

  const handleAddKbItem = (item: Omit<KnowledgeItem, 'id' | 'updatedAt'>) => {
    const newItem: KnowledgeItem = {
      ...item,
      id: `kb_${Date.now()}`,
      updatedAt: new Date().toISOString().split('T')[0]
    };
    setKbList(prev => [newItem, ...prev]);
  };

  const handleUpdateKbItem = (updated: KnowledgeItem) => {
    setKbList(prev => prev.map(k => k.id === updated.id ? updated : k));
  };

  const handleDeleteKbItem = (id: string) => {
    setKbList(prev => prev.filter(k => k.id !== id));
  };

  const handleSaveBrandConfig = (newConfig: BrandConfig) => {
    setBrandConfig(newConfig);
  };

  const activeConversation = conversations.find(c => c.id === activeConversationId) || null;
  const unhandledCount = conversations.filter(c => c.status === 'UNHANDLED').length;
  const urgentCount = conversations.filter(c => c.priority === 'URGENT' && c.status === 'UNHANDLED').length;
  const stats = calculateDashboardStats();

  return (
    <div className="flex flex-col h-screen w-screen bg-slate-950 text-slate-100 overflow-hidden font-sans">
      {/* Header Navbar */}
      <Navbar
        currentBrand={brandConfig}
        currentUser={currentUser}
        onUserChange={setCurrentUser}
        users={mockUsers}
      />

      {/* Main Container */}
      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar Navigation */}
        <Sidebar
          activeTab={activeTab}
          onTabChange={setActiveTab}
          unhandledCount={unhandledCount}
          urgentCount={urgentCount}
          kbCount={kbList.length}
          brandTone={brandConfig.defaultTone}
          userRole={currentUser.role}
        />

        {/* Dynamic Tab Views */}
        <main className="flex-1 flex overflow-hidden">
          {activeTab === 'INBOX' && (
            <>
              <ConversationList
                conversations={conversations}
                activeConversationId={activeConversationId}
                onSelectConversation={setActiveConversationId}
                statusFilter={statusFilter}
                onStatusFilterChange={setStatusFilter}
                priorityFilter={priorityFilter}
                onPriorityFilterChange={setPriorityFilter}
                searchQuery={searchQuery}
                onSearchQueryChange={setSearchQuery}
              />
              <ChatWindow
                conversation={activeConversation}
                brandTone={brandConfig.defaultTone}
                kbList={kbList}
                onSendMessage={handleSendMessage}
                onToggleResolve={handleToggleResolve}
                onSendAiFeedback={handleSendAiFeedback}
              />
              <CustomerContextPanel
                conversation={activeConversation}
                kbList={kbList}
              />
            </>
          )}

          {activeTab === 'KNOWLEDGE_BASE' && (
            <KnowledgeBaseManager
              kbList={kbList}
              onAddKbItem={handleAddKbItem}
              onUpdateKbItem={handleUpdateKbItem}
              onDeleteKbItem={handleDeleteKbItem}
            />
          )}

          {activeTab === 'BRAND_TONE' && (
            <BrandToneSettings
              brandConfig={brandConfig}
              onSaveConfig={handleSaveBrandConfig}
            />
          )}

          {activeTab === 'DASHBOARD' && (
            <AnalyticsDashboard
              stats={stats}
              feedbacks={feedbacks}
            />
          )}
        </main>
      </div>
    </div>
  );
};

export default App;
