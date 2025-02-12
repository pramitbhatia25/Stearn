import { useState, useEffect, useRef } from 'react';

const Chat = () => {
  const [messages, setMessages] = useState([
    { id: 1, text: 'Hello! How can I help you today?', isUser: false },
    { id: 2, text: 'I have a question about my account.', isUser: true },
  ]);
  const [inputText, setInputText] = useState('');
  const [aiTyping, setAiTyping] = useState(false);
  const messagesEndRef = useRef(null);
  const aiResponse = 'Thank you for your question. Our team will get back to you shortly.';

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, aiTyping]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!inputText.trim()) return;

    // Add user message
    setMessages(prev => [...prev, { 
      id: prev.length + 1, 
      text: inputText, 
      isUser: true 
    }]);

    setInputText('');

    // Simulate AI response
    setTimeout(() => {
      setAiTyping(true);
      let index = 0;
      const tempMessage = { id: messages.length + 2, text: '', isUser: false };
      
      setMessages(prev => [...prev, tempMessage]);
      
      const typingInterval = setInterval(() => {
        if (index < aiResponse.length) {
          setMessages(prev => {
            const newMessages = [...prev];
            newMessages[newMessages.length - 1].text = aiResponse.substring(0, index + 1);
            return newMessages;
          });
          index++;
        } else {
          clearInterval(typingInterval);
          setAiTyping(false);
        }
      }, 30);
    }, 500);
  };

  return (
    <div className="flex flex-col h-full w-full light">
      <div className="bg-transparent border-b border-gray-200 p-4">
        <div className="flex items-center">
          <div className="h-8 w-8 rounded-full bg-purple-500 flex items-center justify-center">
            <span className="text-white text-lg">S</span>
          </div>
          <h1 className="ml-3 text-lg font-semibold">StearnAI Assistant</h1>
          {aiTyping && (
            <div className="ml-2 flex space-x-1 items-center">
              <div className="w-2 h-2 bg-purple-500 rounded-full animate-bounce"></div>
              <div className="w-2 h-2 bg-purple-500 rounded-full animate-bounce delay-100"></div>
              <div className="w-2 h-2 bg-purple-500 rounded-full animate-bounce delay-200"></div>
            </div>
          )}
        </div>
      </div>

      <div className="flex-1 overflow-y-auto scrollbar-hide p-4 space-y-4">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${message.isUser ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`max-w-xl rounded-lg p-3 ${
                message.isUser
                  ? 'bg-purple-500 text-white'
                  : 'bg-white text-black border border-gray-200'
              } transition-all duration-150 ease-out`}
            >
              <p className="text-sm">{message.text}</p>
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      <div className="border-t border-gray-200 p-4">
        <form onSubmit={handleSubmit} className="flex gap-2">
          <input
            type="text"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            placeholder="Type your message..."
            className="flex-1 text-black rounded-lg border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent disabled:bg-white"
            disabled={aiTyping}
          />
          <button
            type="submit"
            className="px-6 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 disabled:opacity-50"
            disabled={aiTyping}
          >
            Send
          </button>
        </form>
      </div>
    </div>
  );
};

export default Chat;