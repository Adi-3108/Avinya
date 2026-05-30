import React, { useState } from 'react';
import { Pill, Clock, AlertCircle, Calendar } from 'lucide-react';

interface PrescriptionManagerProps {
  language: 'en' | 'hi';
}

const PrescriptionManager: React.FC<PrescriptionManagerProps> = ({ language }) => {
  const [activePrescriptions, setActivePrescriptions] = useState([
    {
      id: 1,
      medication: 'Amoxicillin',
      dosage: '500mg',
      frequency: '3 times daily',
      duration: '7 days',
      startDate: '2024-03-15',
      endDate: '2024-03-22',
      doctor: 'Dr. Sharma',
      instructions: 'Take with food',
      remainingDoses: 15
    },
    {
      id: 2,
      medication: 'Paracetamol',
      dosage: '650mg',
      frequency: 'As needed',
      duration: '5 days',
      startDate: '2024-03-16',
      endDate: '2024-03-21',
      doctor: 'Dr. Patel',
      instructions: 'Take for fever above 100°F',
      remainingDoses: 8
    }
  ]);

  return (
    <div className="bg-white rounded-xl shadow-sm p-6">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Prescription Manager</h2>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Active Prescriptions */}
        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Active Prescriptions</h3>
          <div className="space-y-4">
            {activePrescriptions.map(prescription => (
              <div 
                key={prescription.id}
                className="border rounded-lg p-4 hover:shadow-md transition-shadow"
              >
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center space-x-2">
                    <Pill className="h-5 w-5 text-blue-600" />
                    <h4 className="font-medium text-gray-900">{prescription.medication}</h4>
                  </div>
                  <span className="text-sm text-blue-600 font-medium">
                    {prescription.remainingDoses} doses remaining
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div>
                    <p className="text-sm text-gray-600">Dosage</p>
                    <p className="font-medium">{prescription.dosage}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Frequency</p>
                    <p className="font-medium">{prescription.frequency}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Start Date</p>
                    <p className="font-medium">{prescription.startDate}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">End Date</p>
                    <p className="font-medium">{prescription.endDate}</p>
                  </div>
                </div>

                <div className="bg-blue-50 rounded-lg p-3">
                  <div className="flex items-center space-x-2 mb-2">
                    <AlertCircle className="h-4 w-4 text-blue-600" />
                    <span className="text-sm font-medium text-blue-600">Instructions</span>
                  </div>
                  <p className="text-sm text-gray-600">{prescription.instructions}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Medication Schedule */}
        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Today's Schedule</h3>
          <div className="bg-gray-50 rounded-lg p-4">
            <div className="space-y-4">
              <div className="flex items-center justify-between p-3 bg-white rounded-lg shadow-sm">
                <div className="flex items-center space-x-3">
                  <Clock className="h-5 w-5 text-blue-600" />
                  <div>
                    <p className="font-medium">Morning Dose</p>
                    <p className="text-sm text-gray-600">Amoxicillin - 500mg</p>
                  </div>
                </div>
                <span className="text-sm text-green-600 font-medium">8:00 AM</span>
              </div>

              <div className="flex items-center justify-between p-3 bg-white rounded-lg shadow-sm">
                <div className="flex items-center space-x-3">
                  <Clock className="h-5 w-5 text-blue-600" />
                  <div>
                    <p className="font-medium">Afternoon Dose</p>
                    <p className="text-sm text-gray-600">Amoxicillin - 500mg</p>
                  </div>
                </div>
                <span className="text-sm text-green-600 font-medium">2:00 PM</span>
              </div>

              <div className="flex items-center justify-between p-3 bg-white rounded-lg shadow-sm">
                <div className="flex items-center space-x-3">
                  <Clock className="h-5 w-5 text-blue-600" />
                  <div>
                    <p className="font-medium">Evening Dose</p>
                    <p className="text-sm text-gray-600">Amoxicillin - 500mg</p>
                  </div>
                </div>
                <span className="text-sm text-yellow-600 font-medium">8:00 PM</span>
              </div>
            </div>
          </div>

          {/* Calendar View */}
          <div className="mt-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Medication Calendar</h3>
            <div className="bg-white rounded-lg border p-4">
              <Calendar className="h-6 w-6 text-blue-600 mb-4" />
              {/* Add calendar implementation here */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PrescriptionManager;