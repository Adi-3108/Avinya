import React, { useState, useEffect, useRef } from 'react';
import { 
  Stethoscope, 
  Calendar, 
  Clock, 
  Video, 
  MessageSquare, 
  FileText, 
  Activity,
  User,
  X,
  Globe,
  Download,
  Printer,
  Share2,
  Mic,
  LogOut,
  Camera,
  Star,
  Clock3,
  AlertCircle,
  BookOpen,
  Bell,
  History  
} from 'lucide-react';

import UserOnboarding from './components/UserOnboarding';
import AppointmentSystem from './components/AppointmentSystem';
import EmergencyContacts from './components/EmergencyContacts';
import HealthEducation from './components/HealthEducation';
import HealthTracking from './components/HealthTracking';
import MedicalHistory from './components/MedicalHistory';
import MedicalReports from './components/MedicalReports';
import MedicationReminders from './components/MedicationReminders';
import PrescriptionManager from './components/PrescriptionManager';
import Header from "./components/Header";



// Language translations
const translations = {
  en: {
    welcome: "Welcome to Your Virtual Health Assistant",
    subtitle: "Access quality healthcare from anywhere. Connect with doctors, check your vitals, and manage your health records all in one place.",
    videoConsultation: "Video Consultation",
    chatDoctor: "Chat with Doctor",
    checkVitals: "Check Vitals",
    medicalRecords: "Medical Records",
    quickAccess: "Quick Access",
    emergency: "Emergency Services",
    emergencyText: "If you're experiencing a medical emergency, please call emergency services immediately:",
    profile: "Your Profile",
    appointments: "Appointments",
    prescriptions: "Prescriptions",
    connect: "Connect with healthcare professionals instantly",
    logout: "Logout",
    availableNow: "Available Now",
    startCall: "Start Call",
    endCall: "End Call",
    bookAppointment: "Book Appointment",
    availableIn: "Available in",
    consultationInProgress: "Video Consultation in Progress"
  },
  hi: {
    welcome: "आपके वर्चुअल हेल्थ असिस्टेंट में आपका स्वागत है",
    subtitle: "कहीं से भी गुणवत्तापूर्ण स्वास्थ्य सेवाएं प्राप्त करें। डॉक्टरों से जुड़ें, अपने वाइटल्स की जाँच करें, और अपने मेडिकल रिकॉर्ड्स को एक ही जगह पर प्रबंधित करें।",
    videoConsultation: "वीडियो परामर्श",
    chatDoctor: "डॉक्टर से चैट करें",
    checkVitals: "वाइटल्स जाँचें",
    medicalRecords: "चिकित्सा रिकॉर्ड",
    quickAccess: "त्वरित पहुंच",
    emergency: "आपातकालीन सेवाएं",
    emergencyText: "यदि आप किसी चिकित्सा आपात स्थिति का सामना कर रहे हैं, तो तुरंत आपातकालीन सेवाओं को कॉल करें:",
    profile: "आपकी प्रोफाइल",
    appointments: "अपॉइंटमेंट",
    prescriptions: "प्रिस्क्रिप्शन",
    connect: "तुरंत स्वास्थ्य पेशेवरों से जुड़ें",
    logout: "लॉग आउट",
    availableNow: "अभी उपलब्ध",
    startCall: "कॉल शुरू करें",
    endCall: "कॉल समाप्त करें",
    bookAppointment: "अपॉइंटमेंट बुक करें",
    availableIn: "उपलब्ध होंगे",
    consultationInProgress: "वीडियो परामर्श चल रहा है"
  }
};

interface UserData {
  name: string;
  age: string;
  gender: string;
  phone: string;
  address: string;
}

function App() {
  const [selectedService, setSelectedService] = useState<string | null>(null);
  const [language, setLanguage] = useState<'en' | 'hi'>('en');
  const [currentTime, setCurrentTime] = useState(new Date());
  const [selectedRecord, setSelectedRecord] = useState<string | null>(null);
  const [userData, setUserData] = useState<UserData | null>(null);
  const [showOnboarding, setShowOnboarding] = useState(true);
  const [showCamera, setShowCamera] = useState(false);
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [showXray, setShowXray] = useState(false);

  const t = translations[language];

  // Update time every minute
  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 60000);
    return () => clearInterval(timer);
  }, []);

  // Check if user data exists in localStorage
  useEffect(() => {
    const savedUserData = localStorage.getItem('userData');
    if (savedUserData) {
      setUserData(JSON.parse(savedUserData));
      setShowOnboarding(false);
    }
  }, []);

  const handleUserDataSubmit = (data: UserData) => {
    setUserData(data);
    localStorage.setItem('userData', JSON.stringify(data));
    setShowOnboarding(false);
  };

  const handleLogout = () => {
    localStorage.removeItem('userData');
    setUserData(null);
    setShowOnboarding(true);
  };

  // Function to start video call
  const startVideoCall = async (doctorId: number) => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
      setShowCamera(true);
      setSelectedDoctor(doctorId);
    } catch (err) {
      console.error("Error accessing camera:", err);
      alert("Could not access camera. Please check your permissions.");
    }
  };

  // Function to end video call
  const endVideoCall = () => {
    if (videoRef.current?.srcObject) {
      const tracks = (videoRef.current.srcObject as MediaStream).getTracks();
      tracks.forEach(track => track.stop());
    }
    setShowCamera(false);
    setSelectedDoctor(null);
  };

  // Calculate time difference in a human-readable format
  const getTimeUntilAvailable = (availableTime: Date) => {
    const now = new Date();
    const available = new Date(availableTime);
    const diffMs = available.getTime() - now.getTime();
    const diffHrs = Math.floor(diffMs / (1000 * 60 * 60));
    const diffMins = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60));
    
    if (diffHrs > 0) {
      return `${diffHrs} hours ${diffMins} minutes`;
    }
    return `${diffMins} minutes`;
  };

  // Updated doctors list with more details
  const availableDoctors = [
    {
      id: 1,
      name: "Dr. Sharma",
      specialty: "Cardiologist",
      qualification: "MD, DM Cardiology",
      experience: "15 years",
      rating: 4.8,
      reviews: 234,
      available: true,
      nextSlot: new Date(),
      image: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=400&auto=format&fit=crop&q=60",
      languages: ["English", "Hindi"],
     
    },
    {
      id: 2,
      name: "Dr. Patel",
      specialty: "Pediatrician",
      qualification: "MBBS, MD Pediatrics",
      experience: "12 years",
      rating: 4.9,
      reviews: 189,
      available: false,
      nextSlot: new Date(Date.now() + 20 * 60000), // 20 minutes from now
      image: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=400&auto=format&fit=crop&q=60",
      languages: ["English", "Gujarati", "Hindi"],
      // consultationFee: "₹600"
    },
    {
      id: 3,
      name: "Dr. Singh",
      specialty: "Dermatologist",
      qualification: "MBBS, MD Dermatology",
      experience: "8 years",
      rating: 4.7,
      reviews: 156,
      available: false,
      nextSlot: new Date(Date.now() + 11 * 60 * 60000), // 11 hours from now
      image: "https://images.unsplash.com/photo-1594824476967-48c8b964273f?w=400&auto=format&fit=crop&q=60",
      languages: ["English", "Punjabi", "Hindi"],
      // consultationFee: "₹700"
    },
    {
      id: 4,
      name: "Dr. Gupta",
      specialty: "General Physician",
      qualification: "MBBS, MD Internal Medicine",
      experience: "10 years",
      rating: 4.6,
      reviews: 201,
      available: true,
      nextSlot: new Date(),
      image: "https://images.unsplash.com/photo-1537368910025-700350fe46c7?w=400&auto=format&fit=crop&q=60",
      languages: ["English", "Hindi", "Bengali"],
      // consultationFee: "₹500"
    }
  ];

  // Rest of the existing services array with the updated consultation service
  const services = [
    { 
      id: 'consultation', 
      title: t.videoConsultation, 
      icon: Video,
      content: (
        <div className="bg-white p-6 rounded-xl shadow-sm">
          {showCamera ? (
            <div className="relative">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-semibold text-gray-900">
                  {t.consultationInProgress}
                </h3>
                <button 
                  onClick={endVideoCall}
                  className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                >
                  {t.endCall}
                </button>
              </div>
              <video
                ref={videoRef}
                autoPlay
                playsInline
                className="w-full rounded-lg aspect-video bg-black"
              />
            </div>
          ) : (
            <>
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl font-semibold text-gray-900">{t.videoConsultation}</h3>
                <button 
                  onClick={() => setSelectedService(null)}
                  className="p-1 hover:bg-gray-100 rounded-full"
                >
                  <X className="h-5 w-5 text-gray-500" />
                </button>
              </div>
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {availableDoctors.map(doctor => (
                    <div key={doctor.id} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                      <div className="flex space-x-4">
                        <img 
                          src={doctor.image} 
                          alt={doctor.name}
                          className="w-24 h-24 rounded-lg object-cover"
                        />
                        <div className="flex-1">
                          <div className="flex justify-between items-start">
                            <h4 className="font-medium text-lg text-gray-900">{doctor.name}</h4>
                            <div className="flex items-center text-yellow-500">
                              <Star className="h-4 w-4 fill-current" />
                              <span className="ml-1 text-sm">{doctor.rating}</span>
                            </div>
                          </div>
                          <p className="text-blue-600 font-medium">{doctor.specialty}</p>
                          <p className="text-sm text-gray-600">{doctor.qualification}</p>
                          <p className="text-sm text-gray-600">{doctor.experience} experience</p>
                        </div>
                      </div>
                      
                      <div className="mt-4 space-y-3">
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-600">Languages:</span>
                          <span className="text-gray-900">{doctor.languages.join(", ")}</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          {/* <span className="text-gray-600">Consultation Fee:</span> */}
                          {/* <span className="text-gray-900">{doctor.consultationFee}</span> */}
                        </div>
                        <div className="flex justify-between items-center">
                          {doctor.available ? (
                            <span className="text-green-600 flex items-center">
                              <Camera className="h-4 w-4 mr-1" />
                              {t.availableNow}
                            </span>
                          ) : (
                            <span className="text-gray-600 flex items-center">
                              <Clock3 className="h-4 w-4 mr-1" />
                              {t.availableIn} {getTimeUntilAvailable(doctor.nextSlot)}
                            </span>
                          )}
                          {doctor.available ? (
                            <button
                              onClick={() => startVideoCall(doctor.id)}
                              className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                            >
                              {t.startCall}
                            </button>
                          ) : (
                            <button
                              onClick={() => {
                                alert(`Booking appointment with ${doctor.name} for ${doctor.nextSlot.toLocaleString()}`);
                              }}
                              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                            >
                              {t.bookAppointment}
                            </button>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </>
          )}
        </div>
      )
    },
    { 
      id: 'chat', 
      title: t.chatDoctor, 
      icon: MessageSquare,
      content: (
        <div className="bg-white p-6 rounded-xl shadow-sm">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-xl font-semibold text-gray-900">{t.chatDoctor}</h3>
            <button 
              onClick={() => setSelectedService(null)}
              className="p-1 hover:bg-gray-100 rounded-full"
            >
              <X className="h-5 w-5 text-gray-500" />
            </button>
          </div>
          <div className="space-y-4">
            <div className="border rounded-lg p-4 max-h-80 overflow-y-auto">
              <div className="space-y-4">
                <div className="flex justify-start">
                  <div className="bg-gray-100 rounded-lg p-3 max-w-[80%]">
                    <p className="text-sm">Hello! How can I help you today?</p>
                    <span className="text-xs text-gray-500">Dr. Sharma - 10:30 AM</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex gap-2">
              <input 
                type="text" 
                placeholder={language === 'en' ? "Type your message..." : "अपना संदेश टाइप करें..."}
                className="flex-1 p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              <button className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                Send
              </button>
            </div>
          </div>
        </div>
      )
    },
    { 
      id: 'vitals', 
      title: t.checkVitals, 
      icon: Activity,
      content: <HealthTracking language={language} />
    },
    { 
      id: 'records', 
      title: t.medicalRecords, 
      icon: FileText,
      content: <MedicalReports language={language} />
    },
    {
      id: 'appointments',
      title: t.appointments,
      icon: Calendar,
      content: <AppointmentSystem language={language} />
    },
    {
      id: 'prescriptions',
      title: t.prescriptions,
      icon: FileText,
      content: <PrescriptionManager language={language} />
    },
    {
      id: 'emergency',
      title: t.emergency,
      icon: AlertCircle,
      content: <EmergencyContacts language={language} />
    },
    {
      id: 'education',
      title: 'Health Education',
      icon: BookOpen,
      content: <HealthEducation language={language} />
    },
    {
      id: 'history',
      title: 'Medical History',
      icon: History,
      content: <MedicalHistory language={language} />
    },
    {
      id: 'reminders',
      title: 'Medication Reminders',
      icon: Bell,
      content: <MedicationReminders language={language} />
    }
    
      

    
  ];

  if (showOnboarding) {
    return <UserOnboarding onSubmit={handleUserDataSubmit} language={language} setLanguage={setLanguage} />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      {/* Header */}
      <Header
  userData={userData}
  handleLogout={handleLogout}
  language={language}
  setLanguage={setLanguage}
/>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Welcome Section */}
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            {t.welcome}
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            {t.subtitle}
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {services.map((service) => {
            const Icon = service.icon;
            return (
              <button
                key={service.id}
                onClick={() => setSelectedService(service.id)}
                className={`p-6 rounded-xl shadow-sm border-2 transition-all duration-200 
                  ${selectedService === service.id 
                    ? 'border-blue-500 bg-blue-50' 
                    : 'border-gray-200 bg-white hover:border-blue-200 hover:bg-blue-50'
                  }`}
              >
                <Icon className="h-12 w-12 text-blue-600 mb-4 mx-auto" />
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{service.title}</h3>
                <p className="text-sm text-gray-600">
                  {t.connect}
                </p>
              </button>
            );
          })}
        </div>
        {/* <div>
    <h1>Welcome to Telemedicine</h1>
    <div className="services-container">
      {services.map((service) => (
        <button key={service.id} onClick={() => setSelectedService(service.id)}>
          {service.title}
        </button>
      ))}
    </div>
    {selectedService && (
      <div className="service-content">
        {services.find(service => service.id === selectedService)?.content}
      </div>
    )}
  </div> */}

        {/* Selected Service Content */}
        {selectedService && (
          <div className="mt-8">
            {services.find(service => service.id === selectedService)?.content}
          </div>
        )}

        {/* Emergency Section */}
        <div className="bg-red-50 border border-red-200 rounded-xl p-6 mt-8">
  <h3 className="text-xl font-semibold text-red-700 mb-2">{t.emergency}</h3>
  <p className="text-red-600 mb-4">
    {t.emergencyText}
  </p>
  <div className="text-2xl font-bold text-red-700">
    Emergency: 108
  </div>
  <div className="mt-4 text-red-700">
    <p className="font-medium">Need help? Call a **Community Health Worker**:</p>
    <a href="tel:+919876543210" className="text-red-600 font-bold text-lg">
      +91 98765 43210
    </a>
    <p className="mt-2 font-medium">
      सहायता चाहिए? हमारे <span className="font-bold">समुदाय स्वास्थ्य कार्यकर्ता</span> से संपर्क करें:
    </p>
    <a href="tel:+919876543210" className="text-red-600 font-bold text-lg">
      +91 98765 43210
    </a>
  </div>
</div>

      </main>

      {/* Footer */}
      <footer className="bg-gray-50 mt-12">
        <div className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
          <p className="text-center text-gray-500 text-sm">
            © 2024 Rural Health Connect. Available 24/7 for your healthcare needs.
          </p>
        </div>
      </footer>
    </div>
  );
}

export default App;

