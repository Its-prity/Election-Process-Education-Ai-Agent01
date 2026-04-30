import React, { useRef, useEffect } from 'react';
import ReactMarkdown from 'react-markdown';
import { MermaidDiagram } from './MermaidDiagram';

export const ChatInterface = ({ 
  messages, 
  isTyping, 
  inputValue, 
  setInputValue, 
  onSendMessage, 
  speakingId, 
  onSpeak 
}) => {
  const messagesEndRef = useRef(null);
  
  const hasUserMessaged = messages.length > 1;
  const currentPlaceholder = hasUserMessaged 
    ? "Ask a follow-up question, or explore another topic..." 
    : "Ask about Indian elections, or anything else on your mind...";

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  return (
    <section className="chat-section fade-in" style={{ animationDelay: '0.2s' }} aria-labelledby="chat-heading">
      <div className="chat-header">
        <h2 id="chat-heading">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
          </svg>
          AI Assistant
        </h2>
        <p>Expert in Indian Elections, but happy to answer anything!</p>
      </div>
      
      <div className="chat-messages" role="log" aria-live="polite">
        {messages.map((msg) => (
          <div key={msg.id} className={`message ${msg.sender}`}>
            <div className="message-avatar" aria-hidden="true">
              {msg.sender === 'ai' ? 'AI' : 'U'}
            </div>
            <div className="message-content">
              {msg.sender === 'ai' ? (
                <div className="markdown-body">
                  <ReactMarkdown
                    components={{
                      code({node, inline, className, children, ...props}) {
                        const match = /language-(\w+)/.exec(className || '');
                        if (!inline && match && match[1] === 'mermaid') {
                          return <MermaidDiagram chart={String(children).replace(/\n$/, '')} />;
                        }
                        return <code className={className} {...props}>{children}</code>;
                      }
                    }}
                  >
                    {msg.text}
                  </ReactMarkdown>
                </div>
              ) : (
                msg.text
              )}
              
              {msg.sender === 'ai' && (
                <button 
                  className={`tts-btn ${speakingId === msg.id ? 'speaking' : ''}`}
                  onClick={() => onSpeak(msg.text, msg.id)}
                  aria-label={speakingId === msg.id ? "Stop Reading Aloud" : "Read message aloud"}
                >
                  {speakingId === msg.id ? (
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect></svg>
                  ) : (
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon><path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07"></path></svg>
                  )}
                  {speakingId === msg.id ? 'Stop' : 'Read Aloud'}
                </button>
              )}
            </div>
          </div>
        ))}
        {isTyping && (
          <div className="message ai" role="status" aria-label="AI is typing...">
            <div className="message-avatar" aria-hidden="true">AI</div>
            <div className="message-content typing-indicator">
              <div className="typing-dot"></div>
              <div className="typing-dot"></div>
              <div className="typing-dot"></div>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      <div className="chat-input-area">
        <form onSubmit={onSendMessage} className="chat-input-form">
          <label htmlFor="chat-input" className="sr-only" style={{display: 'none'}}>Type your message</label>
          <input 
            type="text" 
            id="chat-input"
            className="chat-input" 
            placeholder={currentPlaceholder}
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            disabled={isTyping}
          />
          <button 
            type="submit" 
            className="chat-submit"
            disabled={!inputValue.trim() || isTyping}
            aria-label="Send message"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <line x1="22" y1="2" x2="11" y2="13"></line>
              <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
            </svg>
          </button>
        </form>
      </div>
    </section>
  );
};
