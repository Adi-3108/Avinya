import React, { useState } from 'react';
import { Bell, Clock, Calendar, Plus, Settings, Check } from 'lucide-react';

interface MedicationRemindersProps {
  language: 'en' | 'hi';
}

const MedicationReminders: React.FC<MedicationRemindersProps> = ({ language }) => {
  const [reminders, setReminders] = useState([
    {
      id: 1,
      medication: 'Amoxicillin',
      time: '08:00',
      frequency: 'Daily',
      status: 'pending'
    },
    {
      id: 2,
      medication: 'Vitamin D',
      time: '09:00',
      frequency: 'Daily',
      status: 'completed'
    },
    {
      id: 3,
      medication: 'Paracetamol',
      time: '14:00',
      frequency: 'As needed',
      status: 'pending'
    }
  ]);

  const [showAddReminder, setShowAddReminder] = useState(false);
  const [newReminder, setNewReminder] = useState({
    medication: '',
    time: '',
    frequency: 'Daily'
  });

  const handleAddReminder = () => {
    if (!newReminder.medication || !newReminder.time) {
      alert('Please fill in all required fields');
      return;
    }

    setReminders([
      ...reminders,
      {
        id: reminders.length + 1,
        ...newReminder,
        status: 'pending'
      }
    ]);
    setNewReminder({ medication: '', time: '', frequency: 'Daily' });
    setShowAddReminder(false);
  };

  const toggleReminderStatus = (id: number) => {
    setReminders(reminders.map(reminder =>
      reminder.id === id
        ? { ...reminder, status: reminder.status === 'completed' ? 'pending' : 'completed' }
        : reminder
    ));
  };

  return (
    <div className="bg-white rounded-xl shadow-sm p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-900">Medication Reminders</h2>
        <button
          onClick={() => setShowAddReminder(true)}
          className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
          <Plus className="h-5 w-5" />
          <span>Add Reminder</span>
        </button>
      </div>

      {/* Today's Schedule */}
      <div className="mb-8">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Today's Schedule</h3>
        <div className="space-y-4">
          {reminders.map(reminder => (
            <div
              key={reminder.id}
              className={`flex items-center justify-between p-4 rounded-lg border
                ${reminder.status === 'completed' 
                  ? 'bg-gray-50 border-gray-200' 
                  : 'bg-white border-blue-200'}`}
            >
              <div className="flex items-center space-x-4">
                <button
                  onClick={() => toggleReminderStatus(reminder.id)}
                  className={`w-6 h-6 rounded-full flex items-center justify-center
                    ${reminder.status === 'completed'
                      ? 'bg-green-100 text-green-600'
                      : 'bg-blue-100 text-blue-600'
                    }`}
                >
                  {reminder.status === 'completed' && <Check className="h-4 w-4" />}
                </button>
                <div>
                  <h4 className={`font-medium ${
                    reminder.status === 'completed' ? 'text-gray-500' : 'text-gray-900'
                  }`}>
                    {reminder.medication}
                  </h4>
                  <div className="flex items-center space-x-4 text-sm text-gray-600">
                    <span className="flex items-center">
                      <Clock className="h-4 w-4 mr-1" />
                      {reminder.time}
                    </span>
                    <span>{reminder.frequency}</span>
                  </div>
                </div>
              </div>
              <button className="p-2 hover:bg-gray-100 rounded-lg">
                <Settings className="h-5 w-5 text-gray-600" />
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Reminder Settings */}
      <div className="bg-gray-50 rounded-lg p-4">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Notification Settings</h3>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Bell className="h-5 w-5 text-blue-600" />
              <span className="text-gray-700">Push Notifications</span>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input type="checkbox" className="sr-only peer" defaultChecked />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
            </label>
          </div>
          
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Clock className="h-5 w-5 text-blue-600" />
              <span className="text-gray-700">Reminder Time</span>
            </div>
            <select className="rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500">
              <option>15 minutes before</option>
              <option>30 minutes before</option>
              <option>1 hour before</option>
            </select>
          </div>
        </div>
      </div>

      {/* Add Reminder Modal */}
      {showAddReminder && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl p-6 max-w-md w-full">
            <h3 className="text-xl font-bold mb-4">Add Medication Reminder</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Medication Name
                </label>
                <input
                  type="text"
                  value={newReminder.medication}
                  onChange={(e) => setNewReminder({ ...newReminder, medication: e.target.value })}
                  className="w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Time
                </label>
                <input
                  type="time"
                  value={newReminder.time}
                  onChange={(e) => setNewReminder({ ...newReminder, time: e.target.value })}
                  className="w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Frequency
                </label>
                <select
                  value={newReminder.frequency}
                  onChange={(e) => setNewReminder({ ...newReminder, frequency: e.target.value })}
                  className="w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                >
                  <option>Daily</option>
                  <option>Weekly</option>
                  <option>As needed</option>
                </select>
              </div>
            </div>
            <div className="flex justify-end space-x-3 mt-6">
              <button
                onClick={() => setShowAddReminder(false)}
                className="px-4 py-2 text-gray-600 hover:text-gray-700"
              >
                Cancel
              </button>
              <button
                onClick={handleAddReminder}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              >
                Add Reminder
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MedicationReminders;