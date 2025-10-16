import { FiMessageSquare, FiPlus, FiTrash2 } from 'react-icons/fi';

export default function Sidebar({ reviews, onSelectReview, onNewChat, onDeleteReview }) {
  const handleDeleteClick = (e, review) => {
    e.stopPropagation(); 
    onDeleteReview(review);
  };

  return (
    <div className="w-64 bg-gray-900/70 backdrop-blur-sm border-r border-gray-700 flex flex-col p-2">
      <button 
        onClick={onNewChat}
        className="flex items-center justify-center gap-2 mb-4 w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg transition-colors duration-200"
      >
        <FiPlus /> New Review
      </button>
      <h2 className="px-2 text-xs font-bold tracking-wider text-gray-400 uppercase mb-2">History</h2>
      <div className="flex-grow overflow-y-auto pr-1">
        {reviews.map((review) => (
          <div 
            key={review.id} 
            onClick={() => onSelectReview(review)}
            className="group flex items-center justify-between p-2 rounded-md cursor-pointer hover:bg-gray-700/50"
          >
            <div className="flex items-center truncate">
              <FiMessageSquare className="mr-3 flex-shrink-0" />
              <span className="truncate text-sm">{review.filename}</span>
            </div>
            <button 
              onClick={(e) => handleDeleteClick(e, review)} // Pass the full review object
              className="text-gray-500 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-opacity"
            >
              <FiTrash2 />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
