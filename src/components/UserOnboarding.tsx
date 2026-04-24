import React, { useState, useEffect } from 'react';
import { Mic, MicOff, Globe } from 'lucide-react';

interface UserOnboardingProps {
  onSubmit: (data: {
    name: string;
    age: string;
    gender: string;
    phone: string;
    address: string;
  }) => void;
  language: 'en' | 'hi';
  setLanguage: (lang: 'en' | 'hi') => void;
}

const translations = {
  en: {
    title: "Welcome to Rural Health Connect",
    subtitle: "Please provide your information to get started",
    name: "Full Name",
    age: "Age",
    gender: "Gender",
    phone: "Phone Number",
    address: "Address",
    male: "Male",
    female: "Female",
    other: "Other",
    submit: "Continue",
    speak: "Click to speak",
    listening: "Listening...",
    selectLanguage: "Select Language",
  },
  hi: {
    title: "रूरल हेल्थ कनेक्ट में आपका स्वागत है",
    subtitle: "आरंभ करने के लिए कृपया अपनी जानकारी प्रदान करें",
    name: "पूरा नाम",
    age: "उम्र",
    gender: "लिंग",
    phone: "फोन नंबर",
    address: "पता",
    male: "पुरुष",
    female: "महिला",
    other: "अन्य",
    submit: "जारी रखें",
    speak: "बोलने के लिए क्लिक करें",
    listening: "सुन रहा हूं...",
    selectLanguage: "भाषा चुनें",
  }
};

const UserOnboarding: React.FC<UserOnboardingProps> = ({ onSubmit, language, setLanguage }) => {
  const [formData, setFormData] = useState({
    name: '',
    age: '',
    gender: '',
    phone: '',
    address: '',
  });
  const [listening, setListening] = useState(false);
  const [currentField, setCurrentField] = useState<keyof typeof formData | null>(null);

  const t = translations[language];

  const startSpeechRecognition = (field: keyof typeof formData) => {
    if (!('webkitSpeechRecognition' in window)) {
      alert('Speech recognition is not supported in this browser.');
      return;
    }

    setCurrentField(field);
    setListening(true);

    const recognition = new (window as any).webkitSpeechRecognition();
    recognition.lang = language === 'en' ? 'en-US' : 'hi-IN';
    recognition.continuous = false;
    recognition.interimResults = false;

    recognition.onresult = (event: any) => {
      const wordToNumber = (word: string): string => {
        const numberMap: Record<string, string> = {
          "zero": "0", "one": "1", "two": "2", "three": "3", "four": "4",
          "five": "5", "six": "6", "seven": "7", "eight": "8", "nine": "9",
          "ten": "10", "eleven": "11", "twelve": "12", "thirteen": "13",
          "fourteen": "14", "fifteen": "15", "sixteen": "16", "seventeen": "17",
          "eighteen": "18", "nineteen": "19", "twenty": "20", "thirty": "30",
          "forty": "40", "fifty": "50", "sixty": "60", "seventy": "70",
          "eighty": "80", "ninety": "90"
        };
      
        return numberMap[word.toLowerCase()] || word;
      };
      
      const startSpeechRecognition = (field: keyof typeof formData) => {
        if (!('webkitSpeechRecognition' in window)) {
          alert('Speech recognition is not supported in this browser.');
          return;
        }
      
        setCurrentField(field);
        setListening(true);
      
        const recognition = new (window as any).webkitSpeechRecognition();
        recognition.lang = language === 'en' ? 'en-US' : 'hi-IN';
        recognition.continuous = false;
        recognition.interimResults = false;
        recognition.maxAlternatives = 1; // Limit alternatives to avoid confusion
      
        recognition.onresult = (event: any) => {
          let transcript = event.results[0][0].transcript.trim();
      
          // Convert spoken words to numbers (for age field)
          if (field === 'age') {
            transcript = wordToNumber(transcript);
          }
      
          setFormData(prev => ({
            ...prev,
            [field]: transcript
          }));
          setListening(false);
        };
      
        recognition.onerror = () => setListening(false);
        recognition.onend = () => setListening(false);
      
        recognition.start();
      };
      
      const transcript = event.results[0][0].transcript;
      setFormData(prev => ({
        ...prev,
        [field]: transcript
      }));
      setListening(false);
    };

    recognition.onerror = () => {
      setListening(false);
    };

    recognition.onend = () => {
      setListening(false);
    };

    recognition.start();
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    console.log("📤 Submitting Form Data:", formData);
  
    try {
      const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';
      const response = await fetch(`${API_URL}/api/patients`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
  
      console.log("📥 Response Status:", response.status);
  
      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Server Error: ${response.status} - ${errorText}`);
      }
  
      const data = await response.json();
      console.log('✅ Success:', data);
      alert('Patient added successfully!');
      onSubmit(formData);
  
      // Reset form after submission
      setFormData({
        name: '',
        age: '',
        gender: '',
        phone: '',
        address: '',
      });
  
    } catch (error: any) {
      console.error('❌ Submission Error:', error.message);
      alert('Failed to submit form: ' + error.message);
    }
  };
  
  

  const renderInput = (field: keyof typeof formData, label: string, type: string = 'text') => (
    <div className="mb-4">
      <label className="block text-sm font-medium text-gray-700 mb-1">
        {label}
      </label>
      <div className="flex">
        <input
          type={type}
          value={formData[field]}
          onChange={(e) => setFormData(prev => ({ ...prev, [field]: e.target.value }))}
          className="flex-1 rounded-l-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
        />
        <button
          type="button"
          onClick={() => startSpeechRecognition(field)}
          className={`px-3 py-2 rounded-r-lg ${listening && currentField === field
            ? 'bg-red-500 hover:bg-red-600'
            : 'bg-blue-500 hover:bg-blue-600'
            } text-white`}
        >
          {listening && currentField === field ? (
            <>
              <MicOff className="h-5 w-5" />
              <span className="sr-only">{t.listening}</span>
            </>
          ) : (
            <>
              <Mic className="h-5 w-5" />
              <span className="sr-only">{t.speak}</span>
            </>
          )}
        </button>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white flex items-center justify-center p-4">
      <div className="bg-white rounded-xl shadow-lg p-8 max-w-md w-full">
        <div className="flex justify-end mb-4">
          <div className="flex items-center space-x-2">
            <Globe className="h-5 w-5 text-gray-500" />
            <select
              value={language}
              onChange={(e) => setLanguage(e.target.value as 'en' | 'hi')}
              className="bg-white border border-gray-300 rounded-lg px-3 py-1 text-sm"
            >
              <option value="en">English</option>
              <option value="hi">हिंदी</option>
            </select>
          </div>
        </div>

        <h1 className="text-2xl font-bold text-center text-gray-900 mb-2">
          {t.title}
        </h1>
        <p className="text-center text-gray-600 mb-8">
          {t.subtitle}
        </p>

        <form onSubmit={handleSubmit}>
          {renderInput('name', t.name)}
          {renderInput('age', t.age, 'number')}
          
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              {t.gender}
            </label>
            <select
              value={formData.gender}
              onChange={(e) => setFormData(prev => ({ ...prev, gender: e.target.value }))}
              className="w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            >
              <option value="">{t.gender}</option>
              <option value="male">{t.male}</option>
              <option value="female">{t.female}</option>
              <option value="other">{t.other}</option>
            </select>
          </div>

          {renderInput('phone', t.phone, 'tel')}
          {renderInput('address', t.address)}

          <button
            type="submit"
            className="w-full bg-blue-600 text-white rounded-lg py-2 px-4 hover:bg-blue-700 transition-colors mt-6"
          >
            {t.submit}
          </button>
        </form>
      </div>
    </div>
  );
};

export default UserOnboarding;