import { useRef, useEffect } from 'react';
import ReactMarkdown from 'react-markdown';
import { FiUpload, FiUser, FiCpu, FiAlertTriangle } from 'react-icons/fi';

export default function ChatInterface({ activeReview, isLoading, error, onCreateReview }) {
  const fileInputRef = useRef(null);
  const chatEndRef = useRef(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [activeReview, isLoading, error]);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      onCreateReview(file, () => {
        if (fileInputRef.current) {
          fileInputRef.current.value = "";
        }
      });
    }
  };

  const renderContent = () => {
    if (isLoading) {
      return (
        <div className="flex items-start gap-4">
          <div className="p-2 rounded-full bg-gray-900 text-white animate-pulse"><FiCpu size={20} /></div>
          <div className="px-4 py-2 rounded-lg bg-gray-900/80 text-gray-400">Analyzing...</div>
        </div>
      );
    }

    if (error) {
      return (
        <div className="flex items-start gap-4">
          <div className="p-2 rounded-full bg-red-500 text-white"><FiAlertTriangle size={20} /></div>
          <div className="px-4 py-3 rounded-lg max-w-7xl bg-red-900/80 text-red-100">
            <h3 className="font-bold mb-2">An Error Occurred</h3>
            <pre className="text-sm whitespace-pre-wrap">{error}</pre>
          </div>
        </div>
      );
    }
    
    if (activeReview && activeReview.filename && typeof activeReview.report === 'string') {
      return (
        <>
          <div className="mb-6 flex items-start gap-4">
            <div className="flex-shrink-0 p-2 rounded-full bg-blue-600 text-white"><FiUser size={20} /></div>
            <div className="px-4 py-2 rounded-lg max-w-7xl bg-blue-600 text-white">
              <p>Review for <strong>{activeReview.filename}</strong></p>
            </div>
          </div>
          <div className="flex items-start gap-4">
            <div className="flex-shrink-0 p-2 rounded-full bg-gray-900 text-white"><FiCpu size={20} /></div>
            <div className="px-4 py-3 rounded-lg max-w-7xl bg-gray-900/80 text-gray-200">
              <div className="prose prose-invert max-w-none">
                <ReactMarkdown>{activeReview.report}</ReactMarkdown>
              </div>
            </div>
          </div>
        </>
      );
    }

    return (
      <div className="text-center text-gray-400 h-full flex flex-col justify-center items-center">
        <FiCpu size={48} className="mb-4 text-gray-500" />
        <h1 className="text-2xl font-bold text-gray-200">Code Review Assistant</h1>
        <p>Upload a code file or select a review from the history.</p>
      </div>
    );
  };

  return (
    <div className="flex-1 flex flex-col bg-gray-800">
      <div className="flex-grow p-6 overflow-y-auto">
        {renderContent()}
        <div ref={chatEndRef} />
      </div>
      <div className="p-4 bg-gray-800 border-t border-gray-700">
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleFileChange}
          className="hidden"
        />
        <button
          onClick={() => fileInputRef.current.click()}
          disabled={isLoading}
          className="w-full bg-gray-700 text-gray-300 rounded-lg p-3 flex items-center justify-center gap-2 hover:bg-gray-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <FiUpload />
          {isLoading ? 'Processing...' : 'Upload File for Review'}
        </button>
      </div>
    </div>
  );
}

