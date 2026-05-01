'use client';

interface ChatMessageProps {
  role: 'user' | 'agent';
  content: string;
  timestamp?: Date;
}

export default function ChatMessage({ role, content, timestamp }: ChatMessageProps) {
  const isUser = role === 'user';

  return (
    <div className={`flex gap-4 ${isUser ? 'flex-row-reverse' : ''}`}>
      <div
        className={`flex-1 max-w-md px-4 py-3 rounded-lg ${
          isUser
            ? 'bg-primary text-white rounded-br-none'
            : 'bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white rounded-bl-none'
        }`}
      >
        <p className="text-sm whitespace-pre-wrap break-words">{content}</p>
        {timestamp && (
          <p
            className={`text-xs mt-2 ${
              isUser ? 'text-primary-100' : 'text-gray-600 dark:text-gray-400'
            }`}
          >
            {timestamp.toLocaleTimeString('en-US', {
              hour: '2-digit',
              minute: '2-digit',
            })}
          </p>
        )}
      </div>
    </div>
  );
}
