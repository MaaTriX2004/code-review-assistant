import { ErrorBoundary } from 'react-error-boundary';
import { FiAlertTriangle } from 'react-icons/fi';

function ErrorFallback({ error, resetErrorBoundary }) {
  return (
    <div role="alert" className="p-6 text-center text-red-300">
      <FiAlertTriangle size={48} className="mx-auto mb-4 text-red-500" />
      <h2 className="text-lg font-bold mb-2">Something went wrong</h2>
      <pre className="text-xs bg-red-900/50 p-2 rounded-md whitespace-pre-wrap">{error.message}</pre>
      <button 
        onClick={resetErrorBoundary} 
        className="mt-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg"
      >
        Try again
      </button>
    </div>
  );
}

export const AppErrorBoundary = ({ children }) => (
  <ErrorBoundary
    FallbackComponent={ErrorFallback}
    onReset={() => window.location.reload()} //Relod page
  >
    {children}
  </ErrorBoundary>
);
