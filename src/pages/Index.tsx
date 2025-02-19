
import { useState } from 'react';
import FileUpload from '@/components/FileUpload';
import ChatMessage from '@/components/ChatMessage';
import ChatInput from '@/components/ChatInput';
import { useToast } from '@/components/ui/use-toast';

interface Message {
  text: string;
  isUser: boolean;
}

const Index = () => {
  const [files, setFiles] = useState<File[]>([]);
  const [messages, setMessages] = useState<Message[]>([]);
  const { toast } = useToast();

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

  const handleSendMessage = async (message: string) => {
    try {
      setMessages(prev => [
        ...prev,
        { text: message, isUser: true },
        { text: "Processing your question...", isUser: false }
      ]);

      const response = await fetch('http://localhost:5000/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message,
          files: files.map(f => f.name), // For now just sending file names
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to get response from server');
      }

      const data = await response.json();
      
      // Update the "Processing" message with the actual response
      setMessages(prev => [
        ...prev.slice(0, -1), // Remove the "Processing" message
        { text: data.response, isUser: false }
      ]);
    } catch (error) {
      console.error('Error:', error);
      toast({
        title: "Error",
        description: "Failed to get response from the server. Please try again.",
        variant: "destructive"
      });
      
      // Remove the "Processing" message if there's an error
      setMessages(prev => prev.slice(0, -1));
    }
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
