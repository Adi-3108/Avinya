import React, { useState, useRef, useEffect } from 'react';
import { MessageSquare, Send, Mic, MicOff } from 'lucide-react';

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'doctor';
  timestamp: Date;
}

const initialMessages: Message[] = [
  {
    id: '1',
    text: "Hello! I'm Dr. AI. How can I help you today? Please describe your symptoms or health concerns.",
    sender: 'doctor',
    timestamp: new Date()
  }
];

// Common medical recommendations based on symptoms
const medicalKnowledge = {
  headache: {
    response: "I understand you're experiencing a headache. A few questions:\n1. How long have you had this headache?\n2. Is it constant or intermittent?\n3. Have you taken any medication?\n\nGeneral recommendations:\n- Rest in a quiet, dark room\n- Stay hydrated\n- Try over-the-counter pain relievers\n- Apply a cold or warm compress\n\nSeek immediate medical attention if you experience:\n- Sudden, severe headache\n- Headache with fever and stiff neck\n- Headache after head injury",
    severity: "moderate"
  },
  fever: {
    response: "I see you have a fever. Important questions:\n1. What's your temperature?\n2. Any other symptoms?\n3. How long has it persisted?\n\nRecommendations:\n- Rest and stay hydrated\n- Take acetaminophen or ibuprofen\n- Use light clothing and blankets\n- Monitor temperature\n\nSeek immediate care if:\n- Temperature exceeds 103°F (39.4°C)\n- Fever lasts more than 3 days\n- Severe headache or rash develops",
    severity: "moderate"
  },
  cough: {
    response: "Regarding your cough:\n1. Is it dry or productive?\n2. How long have you had it?\n3. Any other symptoms?\n\nRecommendations:\n- Stay hydrated\n- Use honey for soothing (if above 1 year old)\n- Try over-the-counter cough medicine\n- Use a humidifier\n\nSeek medical attention if:\n- Cough lasts more than 3 weeks\n- You're coughing up blood\n- Having difficulty breathing",
    severity: "mild"
  }
};

const DoctorChat: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [inputText, setInputText] = useState('');
  const [isListening, setIsListening] = useState(false);
  const chatContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [messages]);

  const analyzeSymptoms = (text: string): string => {
    text = text.toLowerCase();
    let response = '';

    // Check for emergency keywords
    const emergencyKeywords = ['chest pain', 'difficulty breathing', 'unconscious', 'severe bleeding'];
    for (const keyword of emergencyKeywords) {
      if (text.includes(keyword)) {
        return "⚠️ This sounds like a medical emergency. Please call emergency services (108) immediately or go to the nearest emergency room. Don't wait for an online response.";
      }
    }

    // Check for common symptoms
    if (text.includes('headache')) {
      response = medicalKnowledge.headache.response;
    } else if (text.includes('fever')) {
      response = medicalKnowledge.fever.response;
    } else if (text.includes('cough')) {
      response = medicalKnowledge.cough.response;
    } else {
      // General response for unrecognized symptoms
      response = "I understand you're not feeling well. To better assist you, please provide more details about:\n1. Your main symptoms\n2. How long you've had them\n3. Any other medical conditions\n4. Any medications you're taking\n\nRemember, this is an AI assistant and not a replacement for professional medical care. If your symptoms are severe or you're unsure, please consult a healthcare provider in person.";
    }

    return response;
  };

  const handleSendMessage = () => {
    if (!inputText.trim()) return;

    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputText,
      sender: 'user',
      timestamp: new Date()
    };

    // Generate AI response
    const aiResponse: Message = {
      id: (Date.now() + 1).toString(),
      text: analyzeSymptoms(inputText),
      sender: 'doctor',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage, aiResponse]);
    setInputText('');
  };

  const toggleSpeechRecognition = () => {
    if (!('webkitSpeechRecognition' in window)) {
      alert('Speech recognition is not supported in your browser.');
      return;
    }

    if (isListening) {
      setIsListening(false);
      return;
    }

    setIsListening(true);
    const recognition = new (window as any).webkitSpeechRecognition();
    recognition.continuous = false;
    recognition.interimResults = false;

    recognition.onresult = (event: any) => {
      const transcript = event.results[0][0].transcript;
      setInputText(prev => prev + ' ' + transcript);
      setIsListening(false);
    };

    recognition.onerror = () => {
      setIsListening(false);
    };

    recognition.onend = () => {
      setIsListening(false);
    };

    recognition.start();
  };

  return (
    <div className="bg-white rounded-xl shadow-sm p-6 max-w-4xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <MessageSquare className="h-6 w-6 text-blue-600" />
          <h2 className="text-xl font-semibold text-gray-900">Chat with Dr. AI</h2>
        </div>
        <div className="text-sm text-gray-500">
          Available 24/7
        </div>
      </div>

      {/* Chat Messages */}
      <div 
        ref={chatContainerRef}
        className="bg-gray-50 rounded-lg p-4 h-[500px] overflow-y-auto mb-4 space-y-4"
      >
        {messages.map(message => (
          <div
            key={message.id}
            className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`max-w-[80%] rounded-lg p-4 ${
                message.sender === 'user'
                  ? 'bg-blue-600 text-white'
                  : 'bg-white border border-gray-200'
              }`}
            >
              <div className="whitespace-pre-wrap">{message.text}</div>
              <div 
                className={`text-xs mt-2 ${
                  message.sender === 'user' ? 'text-blue-100' : 'text-gray-500'
                }`}
              >
                {message.timestamp.toLocaleTimeString()}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Input Area */}
      <div className="flex space-x-2">
        <button
          onClick={toggleSpeechRecognition}
          className={`p-2 rounded-lg ${
            isListening 
              ? 'bg-red-100 text-red-600 hover:bg-red-200' 
              : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
          }`}
        >
          {isListening ? <MicOff className="h-5 w-5" /> : <Mic className="h-5 w-5" />}
        </button>
        <input
          type="text"
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
          placeholder="Describe your symptoms or health concerns..."
          className="flex-1 rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
        />
        <button
          onClick={handleSendMessage}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          <Send className="h-5 w-5" />
        </button>
      </div>

      {/* Disclaimer */}
      <div className="mt-4 text-sm text-gray-500 bg-yellow-50 border border-yellow-200 rounded-lg p-3">
        ⚠️ This is an AI assistant providing general health information. It is not a replacement for professional medical advice. 
        For emergencies or serious health concerns, please contact emergency services or visit a healthcare provider.
      </div>
    </div>
  );
};

export default DoctorChat;