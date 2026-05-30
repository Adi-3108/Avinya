import React, { useState } from 'react';
import { Activity, Heart, Weight, Thermometer } from 'lucide-react';

interface HealthTrackingProps {
  language: 'en' | 'hi';
}

const HealthTracking: React.FC<HealthTrackingProps> = ({ language }) => {
  const [vitals, setVitals] = useState({
    bloodPressure: { systolic: 120, diastolic: 80 },
    heartRate: 72,
    weight: 70,
    temperature: 37,
    steps: 8000
  });

  const updateVital = (type: string, value: any) => {
    setVitals(prev => ({ ...prev, [type]: value }));
  };

  return (
    <div className="bg-white rounded-xl shadow-sm p-6">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Health Tracking</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Blood Pressure */}
        <div className="bg-blue-50 rounded-xl p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">Blood Pressure</h3>
            <Activity className="h-6 w-6 text-blue-600" />
          </div>
          <div className="text-3xl font-bold text-blue-600">
            {vitals.bloodPressure.systolic}/{vitals.bloodPressure.diastolic}
          </div>
          <p className="text-sm text-gray-600 mt-2">mmHg</p>
          <button 
            onClick={() => updateVital('bloodPressure', { 
              systolic: Math.floor(Math.random() * (140 - 110) + 110),
              diastolic: Math.floor(Math.random() * (90 - 70) + 70)
            })}
            className="mt-4 w-full py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            Measure Now
          </button>
        </div>

        {/* Heart Rate */}
        <div className="bg-red-50 rounded-xl p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">Heart Rate</h3>
            <Heart className="h-6 w-6 text-red-600" />
          </div>
          <div className="text-3xl font-bold text-red-600">
            {vitals.heartRate}
          </div>
          <p className="text-sm text-gray-600 mt-2">BPM</p>
          <button 
            onClick={() => updateVital('heartRate', Math.floor(Math.random() * (90 - 60) + 60))}
            className="mt-4 w-full py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
          >
            Measure Now
          </button>
        </div>

        {/* Weight */}
        <div className="bg-green-50 rounded-xl p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">Weight</h3>
            <Weight className="h-6 w-6 text-green-600" />
          </div>
          <div className="text-3xl font-bold text-green-600">
            {vitals.weight}
          </div>
          <p className="text-sm text-gray-600 mt-2">kg</p>
          <button 
            onClick={() => updateVital('weight', Math.floor(Math.random() * (80 - 60) + 60))}
            className="mt-4 w-full py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
          >
            Update
          </button>
        </div>

        {/* Temperature */}
        <div className="bg-yellow-50 rounded-xl p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">Temperature</h3>
            <Thermometer className="h-6 w-6 text-yellow-600" />
          </div>
          <div className="text-3xl font-bold text-yellow-600">
            {vitals.temperature}°C
          </div>
          <p className="text-sm text-gray-600 mt-2">Celsius</p>
          <button 
            onClick={() => updateVital('temperature', (Math.random() * (37.5 - 36.5) + 36.5).toFixed(1))}
            className="mt-4 w-full py-2 bg-yellow-600 text-white rounded-lg hover:bg-yellow-700"
          >
            Measure Now
          </button>
        </div>
      </div>

      {/* Health Trends */}
      <div className="mt-8">
        <h3 className="text-xl font-semibold text-gray-900 mb-4">Health Trends</h3>
        <div className="bg-gray-50 rounded-xl p-6">
          <p className="text-gray-600">
            Your health metrics are within normal range. Keep maintaining your healthy lifestyle!
          </p>
          {/* Add charts/graphs here for trends */}
        </div>
      </div>
    </div>
  );
};

export default HealthTracking;