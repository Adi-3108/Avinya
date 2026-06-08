import React, { useState, useRef } from 'react';
import { Upload } from 'lucide-react';
import { useTranslation } from 'react-i18next';

interface FileUploadProps {
  onFileSelect: (file: File) => void;
  isLoading: boolean;
}

export const FileUpload: React.FC<FileUploadProps> = ({ onFileSelect, isLoading }) => {
  const { t } = useTranslation();
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    
    const files = e.dataTransfer.files;
    if (files.length > 0 && isValidFileType(files[0])) {
      onFileSelect(files[0]);
    }
  };

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0 && isValidFileType(files[0])) {
      onFileSelect(files[0]);
    }
  };

  const isValidFileType = (file: File) => {
    const validTypes = ['image/jpeg', 'image/png', 'image/bmp'];
    return validTypes.includes(file.type);
  };

  return (
    <div
      className={`relative border-3 border-dashed rounded-xl p-16 text-center cursor-pointer transition-all duration-300
        ${isDragging 
          ? 'border-blue-500 bg-blue-50/50 scale-[1.02] shadow-lg' 
          : 'border-gray-300 hover:border-blue-400 hover:bg-blue-50/50 hover:scale-[1.01]'
        }
        ${isLoading ? 'opacity-50 pointer-events-none' : ''}`}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
      onClick={() => fileInputRef.current?.click()}
    >
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileInput}
        accept=".jpg,.jpeg,.png,.bmp"
        className="hidden"
      />
      <Upload className="mx-auto h-20 w-20 text-blue-500 mb-6 transition-transform group-hover:scale-110" />
      <p className="text-2xl font-medium text-gray-700 mb-3">{t('dropzone')}</p>
      <p className="text-sm text-gray-500 bg-white/50 inline-block px-4 py-2 rounded-full">{t('supportedFormats')}</p>
    </div>
  );
};