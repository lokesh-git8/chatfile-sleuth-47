
import { useState } from 'react';
import FileUpload from '@/components/FileUpload';
import ChatMessage from '@/components/ChatMessage';
import ChatInput from '@/components/ChatInput';

interface Message {
  text: string;
  isUser: boolean;
}

const Index = () => {
  const [files, setFiles] = useState<File[]>([]);
  const [messages, setMessages] = useState<Message[]>([]);

  const handleFilesSelected = (newFiles: File[]) => {
    setFiles(prev => [...prev, ...newFiles]);
    setMessages(prev => [
      ...prev,
      {
        text: `Uploaded ${newFiles.length} file(s): ${newFiles.map(f => f.name).join(', ')}`,
        isUser: false
      }
    ]);
  };

  const handleSendMessage = (message: string) => {
    setMessages(prev => [
      ...prev,
      { text: message, isUser: true },
      { text: "I'm processing your question. Please wait a moment...", isUser: false }
    ]);
  };

  return (
    <div className="min-h-screen flex flex-col max-w-5xl mx-auto p-4">
      <div className="flex-1 flex flex-col gap-8">
        {files.length === 0 ? (
          <div className="flex-1 flex items-center justify-center">
            <div className="w-full max-w-lg">
              <FileUpload onFilesSelected={handleFilesSelected} />
            </div>
          </div>
        ) : (
          <div className="flex-1 flex flex-col">
            <div className="flex-1 space-y-4 overflow-y-auto mb-4">
              {messages.map((message, index) => (
                <ChatMessage
                  key={index}
                  message={message.text}
                  isUser={message.isUser}
                />
              ))}
            </div>
            <div className="sticky bottom-0 pt-4 bg-background">
              <ChatInput onSendMessage={handleSendMessage} />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Index;
