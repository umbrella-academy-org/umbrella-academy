'use client';

import Image from 'next/image';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function UploadProofsPage() {
  const router = useRouter();
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [error, setError] = useState('');

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate file type
    const allowedTypes = ['application/pdf', 'image/png', 'image/jpeg', 'image/gif'];
    if (!allowedTypes.includes(file.type)) {
      setError('Please upload a PDF, PNG, JPG, or GIF file');
      return;
    }

    // Validate file size (max 10MB)
    if (file.size > 10 * 1024 * 1024) {
      setError('File size must be less than 10MB');
      return;
    }

    setError('');
    setUploadedFile(file);

    // Simulate upload progress
    let progress = 0;
    const interval = setInterval(() => {
      progress += 10;
      setUploadProgress(progress);
      if (progress >= 100) {
        clearInterval(interval);
      }
    }, 100);
  };

  const handleContinue = (e: React.FormEvent) => {
    e.preventDefault();

    if (!uploadedFile) {
      setError('Please upload your proof documents');
      return;
    }

    console.log('Uploaded file:', uploadedFile);
    router.push('/auth/trainer/pending');
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file) {
      // Create a proper file input change event
      const input = document.createElement('input');
      input.type = 'file';
      const dataTransfer = new DataTransfer();
      dataTransfer.items.add(file);
      input.files = dataTransfer.files;

      const event = new Event('change', { bubbles: true });
      Object.defineProperty(event, 'target', {
        writable: false,
        value: input
      });

      handleFileUpload(event as unknown as React.ChangeEvent<HTMLInputElement>);
    }
  };

  return (
    <div className="flex h-screen">
      {/* Left side - Form */}
      <div className="flex flex-[2] flex-col justify-between p-8 bg-white">
        <div className="flex flex-col flex-1 max-w-md mx-auto w-full">
          {/* Go back button */}
          <button
            onClick={() => window.history.back()}
            className="flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-8"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Go back
          </button>

          <div className="flex flex-col items-center justify-center flex-1">
            {/* Logo */}
            <div className="mb-8">
              <div className="w-16 h-16 bg-yellow-600 rounded-2xl flex items-center justify-center">
                <svg className="w-10 h-10 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17 3H7c-1.1 0-2 .9-2 2v16l7-3 7 3V5c0-1.1-.9-2-2-2z" />
                </svg>
              </div>
            </div>

            {/* Title */}
            <h1 className="text-3xl font-semibold text-gray-900 mb-2">
              Upload Your Proofs
            </h1>
            <p className="text-gray-500 mb-8 text-center">
              Upload the required proofs to activate your mentor account.
            </p>

            {/* Form */}
            <form onSubmit={handleContinue} className="w-full">
              {/* Upload Area */}
              <div
                className={`border-2 border-dashed rounded-lg p-8 text-center mb-4 transition-colors ${error ? 'border-red-300 bg-red-50' : 'border-gray-300 hover:border-yellow-600 hover:bg-yellow-50'
                  }`}
                onDragOver={handleDragOver}
                onDrop={handleDrop}
              >
                <input
                  type="file"
                  id="fileUpload"
                  className="hidden"
                  accept=".pdf,.png,.jpg,.jpeg,.gif"
                  onChange={handleFileUpload}
                />

                {!uploadedFile ? (
                  <>
                    <div className="mb-4">
                      <svg className="w-12 h-12 text-gray-400 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                      </svg>
                    </div>
                    <label htmlFor="fileUpload" className="cursor-pointer">
                      <span className="text-yellow-600 font-medium">Click to upload</span>
                      <span className="text-gray-500"> or drag and drop</span>
                    </label>
                    <p className="text-sm text-gray-500 mt-2">
                      PDF, PNG, JPG or GIF (max. 10MB)
                    </p>
                  </>
                ) : (
                  <div className="space-y-4">
                    <div className="flex items-center gap-3 p-3 bg-white rounded-lg border">
                      <div className="w-8 h-8 bg-red-100 rounded flex items-center justify-center">
                        <svg className="w-4 h-4 text-red-600" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M14,2H6A2,2 0 0,0 4,4V20A2,2 0 0,0 6,22H18A2,2 0 0,0 20,20V8L14,2M18,20H6V4H13V9H18V20Z" />
                        </svg>
                      </div>
                      <div className="flex-1 text-left">
                        <p className="text-sm font-medium text-gray-900">{uploadedFile.name}</p>
                        <p className="text-xs text-gray-500">{(uploadedFile.size / 1024).toFixed(1)} KB</p>
                      </div>
                      <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center">
                        <svg className="w-4 h-4 text-blue-600" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M9,20.42L2.79,14.21L5.62,11.38L9,14.77L18.88,4.88L21.71,7.71L9,20.42Z" />
                        </svg>
                      </div>
                    </div>

                    {uploadProgress < 100 && (
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                          className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                          style={{ width: `${uploadProgress}%` }}
                        ></div>
                      </div>
                    )}

                    {uploadProgress === 100 && (
                      <p className="text-sm text-green-600 font-medium">Upload complete!</p>
                    )}
                  </div>
                )}
              </div>

              {error && <p className="mb-4 text-sm text-red-500">{error}</p>}

              <button
                type="submit"
                className="w-full bg-yellow-600 text-white py-3 rounded-lg font-medium hover:bg-yellow-700 transition-colors"
              >
                Continue
              </button>

              {/* Progress dots */}
              <div className="flex justify-center gap-2 pt-4">
                <div className="w-8 h-2 bg-yellow-600 rounded-full"></div>
                <div className="w-8 h-2 bg-yellow-600 rounded-full"></div>
                <div className="w-8 h-2 bg-yellow-600 rounded-full"></div>
                <div className="w-8 h-2 bg-yellow-600 rounded-full"></div>
                <div className="w-2 h-2 bg-gray-300 rounded-full"></div>
              </div>
            </form>
          </div>
        </div>

        {/* Footer */}
        <div className="text-sm text-gray-500">
          © Dreamize 2025
        </div>
      </div>

      {/* Right side - Image */}
      <div className="hidden lg:block flex-[1] relative overflow-hidden">
        <Image
          src="/auth/login/image.png"
          alt="Underwater bubbles"
          fill
          className="object-cover object-center scale-105"
          priority
          quality={100}
        />
      </div>
    </div>
  );
}
