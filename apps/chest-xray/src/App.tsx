import React, { useCallback, useState } from 'react';
import axios from 'axios';
import { useTranslation } from 'react-i18next';
import { useDropzone } from 'react-dropzone';
import { Upload, Languages } from 'lucide-react';
import './i18n/i18n';

interface Prediction {
  class: string;
  confidence: number;
}

interface ApiResponse {
  predictions: Prediction[];
}

function App() {
  const { t } = useTranslation();
  const [image, setImage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [apiResponse, setApiResponse] = useState<ApiResponse | null>(null);
  const [result, setResult] = useState<{ top?: string } | null>(null);

  const onDrop = useCallback(async (acceptedFiles: File[]) => {
    const file = acceptedFiles[0];
    if (!file) return;

    setLoading(true);
    setError(null);
    setApiResponse(null);
    setResult(null);

    // Create a preview URL for the uploaded image
    const imageUrl = URL.createObjectURL(file);
    setImage(imageUrl);

    try {
      // Create FormData to send the file
      const formData = new FormData();
      formData.append('file', file);

      // Make API call
      const response = await axios.post<ApiResponse>(
        'https://classify.roboflow.com/diseases-classifier-on-chexpert-dataset/2',
        formData,
        {
          params: { api_key: 'YjUZX1Kyoq5iRjz3g6hc' },
          headers: { 'Content-Type': 'multipart/form-data' }
        }
      );

      setApiResponse(response.data);
      
      if (response.data.predictions.length > 0) {
        const topPrediction = response.data.predictions.reduce((prev, curr) => 
          curr.confidence > prev.confidence ? curr : prev
        );
        setResult({ top: topPrediction.class });
      }
    } catch (err) {
      console.error('API Error:', err);
      setError(err instanceof Error ? err.message : 'An error occurred while analyzing the image');
    } finally {
      setLoading(false);
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { 'image/*': ['.jpeg', '.jpg', '.png', '.bmp'] },
    multiple: false
  });

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between mb-4">
          <a 
            href="http://localhost:5173/" 
            className="flex items-center gap-2 px-4 py-2 text-gray-600 hover:text-gray-800 bg-white rounded-lg shadow-sm hover:shadow-md transition-all duration-200"
          >
            Tooth caries diagnoses
          </a>
          <button className="flex items-center gap-2 px-4 py-2 text-gray-600 hover:text-gray-800">
            <Languages size={20} />
            हिंदी में बदलें
          </button>
        </div>

        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">
            {t('title')}
          </h1>
          <p className="text-gray-600 text-lg">
            {t('subtitle')}
          </p>
        </div>

        <div className="max-w-3xl mx-auto">
          <div 
            {...getRootProps()} 
            className={`bg-white rounded-lg shadow-lg p-8 mb-8 border-2 border-dashed ${
              isDragActive ? 'border-blue-500 bg-blue-50' : 'border-gray-300'
            } transition-colors duration-200 cursor-pointer`}
          >
            <input {...getInputProps()} />
            <div className="text-center">
              <Upload className="mx-auto h-16 w-16 text-blue-500 mb-4" />
              <p className="text-lg text-gray-700 mb-2">
                Drop your image here or click to browse
              </p>
              <p className="text-sm text-gray-500">
                Supported formats: JPEG, PNG, BMP
              </p>
            </div>
          </div>

          {error && (
            <div className="bg-red-50/80 backdrop-blur-sm border-l-4 border-red-500 rounded-lg p-6 mb-8 shadow-lg">
              <p className="text-red-800 font-medium">{error}</p>
            </div>
          )}

          {image && (
            <div className="flex justify-center">
              <div className="bg-white rounded-lg shadow-lg p-6 mb-8 text-center">
                <h2 className="text-xl font-semibold mb-4">Uploaded Image</h2>
                <img 
                  src={image} 
                  alt="Uploaded X-Ray scan" 
                  className="max-w-full rounded-lg mb-4 mx-auto"
                />
              </div>
            </div>
          )}  

          {loading && (
            <div className="text-center py-8">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto"></div>
              <p className="mt-4 text-gray-600">Analyzing image...</p>
            </div>
          )}

          {result?.top && (
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h2 className="text-xl font-semibold mb-4">Analysis Results</h2>
              <div className={`text-center p-6 rounded-lg ${
                result.top === 'Healthy' 
                  ? 'bg-green-50 border border-green-200' 
                  : 'bg-red-50 border border-red-200'
              }`}>
                <p className={`text-2xl font-bold ${
                  result.top === 'Healthy' ? 'text-green-600' : 'text-red-600'
                }`}>
                  {result.top}
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
