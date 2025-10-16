import { FiAlertTriangle } from 'react-icons/fi';

export default function ConfirmationModal({ isOpen, onClose, onConfirm, review }) {
  if (!isOpen || !review) return null;

  return (
    // Backdrop
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-60 backdrop-blur-sm">
      {/* Modal Panel */}
      <div className="bg-gray-800 rounded-lg shadow-xl p-6 w-full max-w-md border border-gray-700">
        <div className="flex items-start gap-4">
          <div className="flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-red-900/50">
            <FiAlertTriangle className="h-6 w-6 text-red-400" aria-hidden="true" />
          </div>
          <div className="mt-0 text-left">
            <h3 className="text-lg font-semibold leading-6 text-white" id="modal-title">
              Delete Review
            </h3>
            <div className="mt-2">
              <p className="text-sm text-gray-400">
                Are you sure you want to delete the review for <strong className="font-semibold text-gray-200">{review.filename}</strong>? This action cannot be undone.
              </p>
            </div>
          </div>
        </div>
        {/* Action Buttons */}
        <div className="mt-6 flex justify-end gap-3">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 text-sm font-semibold text-gray-300 bg-gray-700 hover:bg-gray-600 rounded-md transition-colors"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={() => onConfirm(review.id)}
            className="px-4 py-2 text-sm font-semibold text-white bg-red-600 hover:bg-red-700 rounded-md transition-colors"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}
