import { useState } from 'react';
import './App.css';
import { useGemini } from './hooks/useGemini';
import { Header } from './components/Header';
import { Timeline } from './components/Timeline';
import { ChatInterface } from './components/ChatInterface';
import { ApiKeyModal } from './components/ApiKeyModal';

function App() {
  const { apiKey, setApiKey, generateResponse } = useGemini();
  const [language, setLanguage] = useState('English');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [messages, setMessages] = useState([
    { id: 1, text: 'Hello! I am your Election AI Assistant. Ask me any questions about the election process, voting, or timelines.', sender: 'ai' }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [speakingId, setSpeakingId] = useState(null);

  // Text-to-Speech logic
  const handleSpeak = (text, id) => {
    if (speakingId === id) {
      window.speechSynthesis.cancel();
      setSpeakingId(null);
      return;
    }
    
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    
    const langMap = {
      'English': 'en-US', 'Spanish': 'es-ES', 'French': 'fr-FR',
      'German': 'de-DE', 'Hindi': 'hi-IN', 'Mandarin': 'zh-CN', 'Japanese': 'ja-JP'
    };
    utterance.lang = langMap[language] || 'en-US';
    
    utterance.onend = () => setSpeakingId(null);
    utterance.onerror = () => setSpeakingId(null);
    
    setSpeakingId(id);
    window.speechSynthesis.speak(utterance);
  };

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!inputValue.trim()) return;

    const newUserMsg = { id: Date.now(), text: inputValue, sender: 'user' };
    setMessages(prev => [...prev, newUserMsg]);
    setInputValue('');
    setIsTyping(true);

    const aiResponseText = await generateResponse(inputValue, language);
    const aiMessageId = Date.now() + 1;
    
    setIsTyping(false);
    setMessages(prev => [...prev, { 
      id: aiMessageId, 
      text: aiResponseText, 
      sender: 'ai'
    }]);
  };

  return (
    <div className="app-wrapper">
      <Header 
        language={language}
        setLanguage={setLanguage}
        hasKey={!!apiKey}
        onOpenModal={() => setIsModalOpen(true)}
      />

      <main className="container main-grid">
        <Timeline />
        <ChatInterface 
          messages={messages}
          isTyping={isTyping}
          inputValue={inputValue}
          setInputValue={setInputValue}
          onSendMessage={handleSendMessage}
          speakingId={speakingId}
          onSpeak={handleSpeak}
        />
      </main>

      <ApiKeyModal 
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        currentKey={apiKey}
        onSave={(key) => {
          setApiKey(key);
          setIsModalOpen(false);
        }}
      />
    </div>
  );
}

export default App;
