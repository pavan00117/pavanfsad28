import { useState, useRef, useEffect } from 'react';
import './Chatbot.css';

function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { text: "Hi there! I'm WanderBot, your virtual travel assistant. How can I help you find the perfect homestay today?", sender: "bot" }
  ]);
  const [input, setInput] = useState('');
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isOpen]);

  const handleSend = () => {
    if (!input.trim()) return;
    
    // Add user message
    const newMessages = [...messages, { text: input, sender: "user" }];
    setMessages(newMessages);
    setInput('');
    
    // Simulate AI response
    setTimeout(() => {
      const lowerInput = input.toLowerCase();
      let botResponse = "I'm not quite sure about that, but I highly recommend exploring our popular destinations on the Home page!";
      
      if (lowerInput.includes('beach') || lowerInput.includes('ocean') || lowerInput.includes('sea')) {
        botResponse = "If you love the water, you should definitely check out Crystal Beach! We have amazing Seaside Bungalows and Oceanfront Condos available.";
      } else if (lowerInput.includes('snow') || lowerInput.includes('ski') || lowerInput.includes('winter')) {
        botResponse = "Looking for snow? Snowy Peaks is perfect. The Ski Lodge Master Suite is a fan favorite!";
      } else if (lowerInput.includes('forest') || lowerInput.includes('tree') || lowerInput.includes('nature')) {
        botResponse = "For nature lovers, the Mystic Forest offers a serene escape. The Forest Haven Homestay is highly rated.";
      } else if (lowerInput.includes('book') || lowerInput.includes('price') || lowerInput.includes('cost')) {
        botResponse = "You can book directly from any destination page. Prices range from $85/night to $350/night depending on the luxury level.";
      } else if (lowerInput.includes('hello') || lowerInput.includes('hi')) {
        botResponse = "Hello! Where are you planning to travel next?";
      }

      setMessages(prev => [...prev, { text: botResponse, sender: "bot" }]);
    }, 1000);
  };

  return (
    <div className="chatbot-wrapper">
      {isOpen ? (
        <div className="chatbot-window glass-panel">
          <div className="chatbot-header">
            <h3>WanderBot AI</h3>
            <button className="close-btn" onClick={() => setIsOpen(false)}>×</button>
          </div>
          
          <div className="chatbot-messages">
            {messages.map((msg, index) => (
              <div key={index} className={`message-bubble ${msg.sender}`}>
                {msg.text}
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>
          
          <div className="chatbot-input">
            <input 
              type="text" 
              placeholder="Ask about destinations..." 
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSend()}
            />
            <button onClick={handleSend}>Send</button>
          </div>
        </div>
      ) : (
        <button className="chatbot-toggle-btn" onClick={() => setIsOpen(true)}>
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path></svg>
        </button>
      )}
    </div>
  );
}

export default Chatbot;
