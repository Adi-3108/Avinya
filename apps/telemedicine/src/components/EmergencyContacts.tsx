import React, { useState } from 'react';
import { Phone, Plus, Edit2, Trash2 } from 'lucide-react';

interface EmergencyContactsProps {
  language: 'en' | 'hi';
}

const EmergencyContacts: React.FC<EmergencyContactsProps> = ({ language }) => {
  const [contacts, setContacts] = useState([
    {
      id: 1,
      name: 'John Doe',
      relationship: 'Spouse',
      phone: '+91 98765 43210',
      address: '123 Main St, City'
    },
    {
      id: 2,
      name: 'Jane Smith',
      relationship: 'Family Doctor',
      phone: '+91 98765 43211',
      address: 'City Hospital'
    }
  ]);

  const [showAddForm, setShowAddForm] = useState(false);
  const [newContact, setNewContact] = useState({
    name: '',
    relationship: '',
    phone: '',
    address: ''
  });

  const handleAddContact = () => {
    if (!newContact.name || !newContact.phone) {
      alert('Name and phone number are required');
      return;
    }

    setContacts([...contacts, { ...newContact, id: contacts.length + 1 }]);
    setNewContact({ name: '', relationship: '', phone: '', address: '' });
    setShowAddForm(false);
  };

  const handleDeleteContact = (id: number) => {
    setContacts(contacts.filter(contact => contact.id !== id));
  };

  return (
    <div className="bg-white rounded-xl shadow-sm p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-900">Emergency Contacts</h2>
        <button
          onClick={() => setShowAddForm(true)}
          className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
          <Plus className="h-5 w-5" />
          <span>Add Contact</span>
        </button>
      </div>

      {/* Emergency Services */}
      <div className="mb-8">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Emergency Services</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-red-50 rounded-lg p-4">
            <div className="flex items-center justify-between mb-2">
              <span className="font-medium text-red-700">Ambulance</span>
              <Phone className="h-5 w-5 text-red-600" />
            </div>
            <p className="text-2xl font-bold text-red-700">108</p>
          </div>
          
          <div className="bg-blue-50 rounded-lg p-4">
            <div className="flex items-center justify-between mb-2">
              <span className="font-medium text-blue-700">Police</span>
              <Phone className="h-5 w-5 text-blue-600" />
            </div>
            <p className="text-2xl font-bold text-blue-700">100</p>
           </div>
          
          <div className="bg-green-50 rounded-lg p-4">
            <div className="flex items-center justify-between mb-2">
              <span className="font-medium text-green-700">Fire Service</span>
              <Phone className="h-5 w-5 text-green-600" />
            </div>
            <p className="text-2xl font-bold text-green-700">101</p>
          </div>
        </div>
      </div>

      {/* Personal Emergency Contacts */}
      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Personal Emergency Contacts</h3>
        <div className="space-y-4">
          {contacts.map(contact => (
            <div 
              key={contact.id}
              className="border rounded-lg p-4 hover:shadow-md transition-shadow"
            >
              <div className="flex justify-between items-start">
                <div>
                  <h4 className="font-medium text-gray-900">{contact.name}</h4>
                  <p className="text-sm text-gray-600">{contact.relationship}</p>
                </div>
                <div className="flex space-x-2">
                  <button className="p-1 hover:bg-gray-100 rounded">
                    <Edit2 className="h-4 w-4 text-gray-600" />
                  </button>
                  <button 
                    onClick={() => handleDeleteContact(contact.id)}
                    className="p-1 hover:bg-gray-100 rounded"
                  >
                    <Trash2 className="h-4 w-4 text-red-600" />
                  </button>
                </div>
              </div>
              <div className="mt-2 space-y-1">
                <p className="text-sm text-gray-600">
                  <Phone className="h-4 w-4 inline mr-2 text-blue-600" />
                  {contact.phone}
                </p>
                <p className="text-sm text-gray-600">{contact.address}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Add Contact Form Modal */}
      {showAddForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl p-6 max-w-md w-full">
            <h3 className="text-xl font-bold mb-4">Add Emergency Contact</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                <input
                  type="text"
                  value={newContact.name}
                  onChange={(e) => setNewContact({ ...newContact, name: e.target.value })}
                  className="w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Relationship</label>
                <input
                  type="text"
                  value={newContact.relationship}
                  onChange={(e) => setNewContact({ ...newContact, relationship: e.target.value })}
                  className="w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
                <input
                  type="tel"
                  value={newContact.phone}
                  onChange={(e) => setNewContact({ ...newContact, phone: e.target.value })}
                  className="w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Address</label>
                <textarea
                  value={newContact.address}
                  onChange={(e) => setNewContact({ ...newContact, address: e.target.value })}
                  className="w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                />
              </div>
            </div>
            <div className="flex justify-end space-x-3 mt-6">
              <button
                onClick={() => setShowAddForm(false)}
                className="px-4 py-2 text-gray-600 hover:text-gray-700"
              >
                Cancel
              </button>
              <button
                onClick={handleAddContact}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              >
                Add Contact
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default EmergencyContacts;