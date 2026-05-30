import React, { useState } from 'react';
import { FileText, Download, Share2, Eye } from 'lucide-react';

interface MedicalReportsProps {
  language: 'en' | 'hi';
}

const MedicalReports: React.FC<MedicalReportsProps> = ({ language }) => {
  const [selectedReport, setSelectedReport] = useState<string | null>(null);

  const reports = [
    {
      id: 1,
      title: 'Blood Test Report',
      date: '2024-03-15',
      doctor: 'Dr. Sharma',
      type: 'Laboratory',
      status: 'Normal'
    },
    {
      id: 2,
      title: 'X-Ray Report',
      date: '2024-03-10',
      doctor: 'Dr. Patel',
      type: 'Radiology',
      status: 'Review Required'
    },
    {
      id: 3,
      title: 'ECG Report',
      date: '2024-03-05',
      doctor: 'Dr. Singh',
      type: 'Cardiology',
      status: 'Normal'
    }
  ];

  return (
    <div className="bg-white rounded-xl shadow-sm p-6">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Medical Reports</h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {reports.map(report => (
          <div 
            key={report.id}
            className="border rounded-lg p-4 hover:shadow-md transition-shadow"
          >
            <div className="flex items-center justify-between mb-4">
              <FileText className="h-8 w-8 text-blue-600" />
              <span className={`px-3 py-1 rounded-full text-sm font-medium
                ${report.status === 'Normal' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}>
                {report.status}
              </span>
            </div>
            
            <h3 className="text-lg font-semibold text-gray-900 mb-2">{report.title}</h3>
            
            <div className="space-y-2 mb-4">
              <p className="text-sm text-gray-600">Date: {report.date}</p>
              <p className="text-sm text-gray-600">Doctor: {report.doctor}</p>
              <p className="text-sm text-gray-600">Type: {report.type}</p>
            </div>

            <div className="flex justify-between">
              <button 
                onClick={() => setSelectedReport(report.id.toString())}
                className="flex items-center text-blue-600 hover:text-blue-700"
              >
                <Eye className="h-4 w-4 mr-1" />
                View
              </button>
              <button className="flex items-center text-blue-600 hover:text-blue-700">
                <Download className="h-4 w-4 mr-1" />
                Download
              </button>
              <button className="flex items-center text-blue-600 hover:text-blue-700">
                <Share2 className="h-4 w-4 mr-1" />
                Share
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Report Details Modal */}
      {selectedReport && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl p-6 max-w-2xl w-full">
            <h3 className="text-xl font-bold mb-4">Report Details</h3>
            {/* Add detailed report view here */}
            <button 
              onClick={() => setSelectedReport(null)}
              className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default MedicalReports;