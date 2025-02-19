
import React, { useState } from 'react';
import { Send } from 'lucide-react';

interface ChatInputProps {
  onSendMessage: (message: string) => void;
}

const ChatInput: React.FC<ChatInputProps> = ({ onSendMessage }) => {
  const [message, setMessage] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (message.trim()) {
      onSendMessage(message);
      setMessage('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="relative">
      <input
        type="text"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Ask a question about your documents..."
        className="w-full p-4 pr-12 rounded-lg bg-secondary/50 border border-white/10 focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
      />
      <button
        type="submit"
        className="absolute right-2 top-1/2 -translate-y-1/2 p-2 rounded-md hover:bg-primary/20 transition-colors"
        disabled={!message.trim()}
      >
        <Send className="w-5 h-5 text-primary" />
      </button>
    </form>
  );
};

export default ChatInput;
