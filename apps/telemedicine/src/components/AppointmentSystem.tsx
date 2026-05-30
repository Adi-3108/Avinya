import React, { useState } from 'react';
import { Calendar, Clock, User, MapPin } from 'lucide-react';

interface AppointmentSystemProps {
  language: 'en' | 'hi';
}

const AppointmentSystem: React.FC<AppointmentSystemProps> = ({ language }) => {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedTime, setSelectedTime] = useState<string>('');
  const [selectedDoctor, setSelectedDoctor] = useState<string>('');

  const availableDoctors = [
    { id: 1, name: 'Dr. Sharma', specialty: 'Cardiologist', availability: ['09:00', '11:00', '14:00'] },
    { id: 2, name: 'Dr. Patel', specialty: 'Pediatrician', availability: ['10:00', '13:00', '15:00'] },
    { id: 3, name: 'Dr. Singh', specialty: 'Dermatologist', availability: ['09:30', '12:00', '16:00'] }
  ];

  const handleBookAppointment = () => {
    if (!selectedDate || !selectedTime || !selectedDoctor) {
      alert('Please select all required fields');
      return;
    }
    // Handle appointment booking
    alert('Appointment booked successfully!');
  };

  return (
    <div className="bg-white rounded-xl shadow-sm p-6">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Book an Appointment</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Appointment Booking Form */}
        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Select Doctor
            </label>
            <select
              value={selectedDoctor}
              onChange={(e) => setSelectedDoctor(e.target.value)}
              className="w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            >
              <option value="">Choose a doctor</option>
              {availableDoctors.map(doctor => (
                <option key={doctor.id} value={doctor.id}>
                  {doctor.name} - {doctor.specialty}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Select Date
            </label>
            <input
              type="date"
              onChange={(e) => setSelectedDate(new Date(e.target.value))}
              className="w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Select Time
            </label>
            <select
              value={selectedTime}
              onChange={(e) => setSelectedTime(e.target.value)}
              className="w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            >
              <option value="">Choose a time slot</option>
              {selectedDoctor && availableDoctors
                .find(d => d.id === parseInt(selectedDoctor))
                ?.availability.map(time => (
                  <option key={time} value={time}>{time}</option>
                ))}
            </select>
          </div>

          <button
            onClick={handleBookAppointment}
            className="w-full py-2 px-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Book Appointment
          </button>
        </div>

        {/* Upcoming Appointments */}
        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Upcoming Appointments</h3>
          <div className="space-y-4">
            <div className="bg-blue-50 rounded-lg p-4">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center space-x-3">
                  <User className="h-5 w-5 text-blue-600" />
                  <span className="font-medium">Dr. Sharma</span>
                </div>
                <span className="text-sm text-blue-600 font-medium">Cardiologist</span>
              </div>
              <div className="flex items-center space-x-3 text-sm text-gray-600">
                <Calendar className="h-4 w-4" />
                <span>Tomorrow, 10:00 AM</span>
              </div>
              <div className="flex items-center space-x-3 text-sm text-gray-600 mt-1">
                <MapPin className="h-4 w-4" />
                <span>City Hospital, Room 302</span>
              </div>
            </div>

            
          </div>
        </div>
      </div>
    </div>
  );
};

export default AppointmentSystem;