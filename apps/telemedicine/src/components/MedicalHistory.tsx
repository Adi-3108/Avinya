import React, { useState } from 'react';
import { History, Calendar, FileText, AlertCircle } from 'lucide-react';

interface MedicalHistoryProps {
  language: 'en' | 'hi';
}

const MedicalHistory: React.FC<MedicalHistoryProps> = ({ language }) => {
  const [selectedYear, setSelectedYear] = useState('2024');

  const medicalEvents = [
    {
      id: 1,
      date: '2024-03-15',
      type: 'Consultation',
      doctor: 'Dr. Sharma',
      diagnosis: 'Common Cold',
      treatment: 'Prescribed antibiotics and rest',
      followUp: '2024-03-22'
    },
    {
      id: 2,
      date: '2024-02-20',
      type: 'Vaccination',
      doctor: 'Dr. Patel',
      details: 'Annual flu shot',
      nextDue: '2025-02-20'
    },
    {
      id: 3,
      date: '2024-01-10',
      type: 'Lab Test',
      doctor: 'Dr. Singh',
      test: 'Complete Blood Count',
      result: 'Normal',
      notes: 'Regular health checkup'
    }
  ];

  const conditions = [
    { name: 'Asthma', diagnosed: '2020', status: 'Controlled' },
    { name: 'Hypertension', diagnosed: '2022', status: 'Monitoring' }
  ];

  return (
    <div className="bg-white rounded-xl shadow-sm p-6">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Medical History</h2>

      {/* Chronic Conditions */}
      <div className="mb-8">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Chronic Conditions</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {conditions.map((condition, index) => (
            <div 
              key={index}
              className="border rounded-lg p-4 bg-gray-50"
            >
              <div className="flex items-center justify-between mb-2">
                <h4 className="font-medium text-gray-900">{condition.name}</h4>
                <span className={`px-2 py-1 rounded-full text-sm font-medium
                  ${condition.status === 'Controlled' 
                    ? 'bg-green-100 text-green-800'
                    : 'bg-yellow-100 text-yellow-800'
                  }`}>
                  {condition.status}
                </span>
              </div>
              <p className="text-sm text-gray-600">
                Diagnosed: {condition.diagnosed}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Timeline */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-900">Medical Timeline</h3>
          <select
            value={selectedYear}
            onChange={(e) => setSelectedYear(e.target.value)}
            className="rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          >
            <option value="2024">2024</option>
            <option value="2023">2023</option>
            <option value="2022">2022</option>
          </select>
        </div>

        <div className="space-y-6">
          {medicalEvents.map(event => (
            <div 
              key={event.id}
              className="relative pl-8 border-l-2 border-blue-200"
            >
              <div className="absolute -left-2 top-0 w-4 h-4 rounded-full bg-blue-600" />
              <div className="bg-white rounded-lg border p-4">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center space-x-2">
                    {event.type === 'Consultation' && <FileText className="h-5 w-5 text-blue-600" />}
                    {event.type === 'Vaccination' && <AlertCircle className="h-5 w-5 text-green-600" />}
                    {event.type === 'Lab Test' && <History className="h-5 w-5 text-purple-600" />}
                    <h4 className="font-medium text-gray-900">{event.type}</h4>
                  </div>
                  <span className="text-sm text-gray-600">{event.date}</span>
                </div>

                <div className="space-y-2">
                  <p className="text-sm text-gray-600">Doctor: {event.doctor}</p>
                  {event.diagnosis && (
                    <p className="text-sm text-gray-600">Diagnosis: {event.diagnosis}</p>
                  )}
                  {event.treatment && (
                    <p className="text-sm text-gray-600">Treatment: {event.treatment}</p>
                  )}
                  {event.followUp && (
                    <div className="flex items-center text-sm text-blue-600">
                      <Calendar className="h-4 w-4 mr-1" />
                      Follow-up: {event.followUp}
                    </div>
                  )}
                  {event.nextDue && (
                    <div className="flex items-center text-sm text-green-600">
                      <Calendar className="h-4 w-4 mr-1" />
                      Next Due: {event.nextDue}
                    </div>
                  )}
                  {event.test && (
                    <>
                      <p className="text-sm text-gray-600">Test: {event.test}</p>
                      <p className="text-sm text-gray-600">Result: {event.result}</p>
                    </>
                  )}
                  {event.notes && (
                    <p className="text-sm text-gray-600 italic">{event.notes}</p>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MedicalHistory;