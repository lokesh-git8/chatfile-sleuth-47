
import React from 'react';
import { User, Bot } from 'lucide-react';
import ReactMarkdown from 'react-markdown';

interface ChatMessageProps {
  message: string;
  isUser: boolean;
}

const ChatMessage: React.FC<ChatMessageProps> = ({ message, isUser }) => {
  return (
    <div className={`flex items-start gap-3 mb-4 ${isUser ? 'flex-row-reverse' : ''}`}>
      <div className={`w-8 h-8 rounded-full flex items-center justify-center glass-panel ${isUser ? 'bg-primary/20' : 'bg-secondary'}`}>
        {isUser ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
      </div>
      <div className={`message-bubble ${isUser ? 'user-message' : 'bot-message'}`}>
        <div className="text-sm prose prose-sm dark:prose-invert max-w-none">
          <ReactMarkdown>
            {message}
          </ReactMarkdown>
        </div>
      </div>
    </div>
  );
};

export default ChatMessage;
