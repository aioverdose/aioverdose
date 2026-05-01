'use client';

import { useState, useRef, useEffect } from 'react';
import { Send, Loader } from 'lucide-react';
import ChatMessage from '@/components/admin/ChatMessage';
import DiffViewer from '@/components/admin/DiffViewer';

interface Message {
  id: string;
  role: 'user' | 'agent';
  content: string;
  timestamp: Date;
}

interface FileChange {
  path: string;
  content: string;
  action: 'create' | 'update' | 'delete';
}

interface AgentResponse {
  explanation: string;
  files: FileChange[];
}

export default function DevAgentPage() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [agentResponse, setAgentResponse] = useState<AgentResponse | null>(null);
  const [applyingChanges, setApplyingChanges] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!input.trim() || loading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: input,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setLoading(true);
    setError('');
    setAgentResponse(null);

    try {
      const response = await fetch('/api/admin/dev-agent/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: input }),
      });

      if (!response.ok) {
        throw new Error('Failed to get response from Claude');
      }

      const data: AgentResponse = await response.json();
      setAgentResponse(data);

      const agentMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'agent',
        content: data.explanation,
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, agentMessage]);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'An error occurred';
      setError(errorMessage);

      const errorMsg: Message = {
        id: (Date.now() + 1).toString(),
        role: 'agent',
        content: `Error: ${errorMessage}`,
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, errorMsg]);
    } finally {
      setLoading(false);
    }
  };

  const handleApplyChanges = async () => {
    if (!agentResponse || applyingChanges) return;

    setApplyingChanges(true);
    setError('');

    try {
      const response = await fetch('/api/admin/dev-agent/apply', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          files: agentResponse.files,
          message: `dev-agent: ${messages[messages.length - 2]?.content || 'Code changes'}`,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to apply changes');
      }

      const result = await response.json();

      const successMsg: Message = {
        id: (Date.now() + 1).toString(),
        role: 'agent',
        content: `✅ Changes committed successfully!\n\nCommit: ${result.commitSha.substring(0, 8)}\n\nVercel is now deploying your changes. This usually takes 30-60 seconds.`,
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, successMsg]);
      setAgentResponse(null);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to apply changes';
      setError(errorMessage);
    } finally {
      setApplyingChanges(false);
    }
  };

  return (
    <div className="flex-1 p-8 flex flex-col min-h-0">
      <div className="max-w-6xl w-full mx-auto flex flex-col h-full gap-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            Development Agent
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">
            Chat with Claude to generate code changes for your site
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 flex-1 min-h-0">
          {/* Chat Area */}
          <div className="lg:col-span-1 flex flex-col bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 overflow-hidden">
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {messages.length === 0 ? (
                <div className="flex items-center justify-center h-full text-gray-500 dark:text-gray-400 text-center">
                  <div>
                    <p className="mb-2">👋 Welcome to the Dev Agent</p>
                    <p className="text-sm">
                      Describe what you'd like to change, and Claude will generate code for you.
                    </p>
                  </div>
                </div>
              ) : (
                <>
                  {messages.map((message) => (
                    <ChatMessage
                      key={message.id}
                      role={message.role}
                      content={message.content}
                      timestamp={message.timestamp}
                    />
                  ))}
                  {loading && (
                    <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                      <Loader className="w-4 h-4 animate-spin" />
                      <span className="text-sm">Claude is thinking...</span>
                    </div>
                  )}
                  <div ref={messagesEndRef} />
                </>
              )}
            </div>

            {error && (
              <div className="px-4 py-3 bg-red-100 dark:bg-red-900/30 border-t border-red-200 dark:border-red-800 text-red-700 dark:text-red-400 text-sm">
                {error}
              </div>
            )}

            <form onSubmit={handleSendMessage} className="p-4 border-t border-gray-200 dark:border-gray-700">
              <div className="flex gap-2">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Describe what you'd like to change..."
                  disabled={loading}
                  className="flex-1 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary disabled:opacity-50"
                />
                <button
                  type="submit"
                  disabled={loading || !input.trim()}
                  className="p-2 rounded-lg bg-primary text-white hover:bg-opacity-90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  title="Send message"
                >
                  <Send className="w-5 h-5" />
                </button>
              </div>
            </form>
          </div>

          {/* Diff Viewer Area */}
          <div className="lg:col-span-2 flex flex-col bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 overflow-hidden">
            <div className="p-4 border-b border-gray-200 dark:border-gray-700">
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
                Proposed Changes
              </h2>
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                {agentResponse
                  ? `${agentResponse.files.length} file${agentResponse.files.length !== 1 ? 's' : ''} will be modified`
                  : 'Ask Claude to generate code changes'}
              </p>
            </div>

            <div className="flex-1 overflow-y-auto p-4">
              {agentResponse && agentResponse.files.length > 0 ? (
                <DiffViewer files={agentResponse.files} />
              ) : (
                <div className="flex items-center justify-center h-full text-gray-500 dark:text-gray-400 text-center">
                  <p>No changes proposed yet</p>
                </div>
              )}
            </div>

            {agentResponse && agentResponse.files.length > 0 && (
              <div className="p-4 border-t border-gray-200 dark:border-gray-700 flex gap-2">
                <button
                  onClick={handleApplyChanges}
                  disabled={applyingChanges}
                  className="px-4 py-2 rounded-lg bg-green-600 text-white font-medium hover:bg-green-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {applyingChanges ? 'Applying...' : 'Apply Changes'}
                </button>
                <button
                  onClick={() => setAgentResponse(null)}
                  disabled={applyingChanges}
                  className="px-4 py-2 rounded-lg bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white font-medium hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Discard
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
