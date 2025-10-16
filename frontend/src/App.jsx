// frontend/src/App.jsx

import { useState, useEffect } from 'react';
import axios from 'axios';
import Sidebar from './components/Sidebar';
import ChatInterface from './components/ChatInterface';
import { AppErrorBoundary } from './components/ErrorBoundary';
import ConfirmationModal from './components/ConfirmationModal';

const API_BASE_URL = 'http://127.0.0.1:8000';

function App() {
  const [reviews, setReviews] = useState([]);
  const [activeReview, setActiveReview] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [reviewToDelete, setReviewToDelete] = useState(null); // State for the modal

  const fetchReviews = () => {
    axios.get(`${API_BASE_URL}/reviews/`)
      .then(response => {
        setReviews(response.data);
      })
      .catch(err => {
        console.error("Error fetching reviews:", err);
        setError("Could not load review history.");
      });
  };

  const createReview = async (file, callback) => {
    setIsLoading(true);
    setActiveReview(null);
    setError(null);

    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await axios.post(`${API_BASE_URL}/review/`, formData);
      const newReview = response.data;
      setActiveReview(newReview);
      fetchReviews();
    } catch (err) {
      const errorMessage = err.response?.data?.detail || 'An unexpected error occurred during analysis.';
      setError(errorMessage);
    } finally {
      setIsLoading(false);
      if (callback) callback();
    }
  };
  
  useEffect(() => {
    fetchReviews();
  }, []);

  // Opens the modal by setting the review to be deleted
  const handlePromptDelete = (review) => {
    setReviewToDelete(review);
  };

  // Called from the modal to perform the deletion
  const handleConfirmDelete = (reviewId) => {
    axios.delete(`${API_BASE_URL}/reviews/${reviewId}`)
      .then(() => {
        if (activeReview?.id === reviewId) {
          setActiveReview(null);
        }
        fetchReviews();
      })
      .catch(err => {
        console.error("Error deleting review:", err);
        setError("Could not delete the review.");
      })
      .finally(() => {
        setReviewToDelete(null); // Close the modal
      });
  };

  const handleSelectReview = (review) => {
    setActiveReview(review);
    setError(null);
    setIsLoading(false);
  };

  const handleNewChat = () => {
    setActiveReview(null);
    setError(null);
    setIsLoading(false);
  };

  return (
    <div className="flex h-screen bg-gray-900 text-white font-sans">
      <Sidebar
        reviews={reviews}
        onSelectReview={handleSelectReview}
        onNewChat={handleNewChat}
        onDeleteReview={handlePromptDelete} // Changed to prompt the delete
      />
      <AppErrorBoundary>
        <ChatInterface
          activeReview={activeReview}
          isLoading={isLoading}
          error={error}
          onCreateReview={createReview}
        />
      </AppErrorBoundary>
      
      {/* Render the modal */}
      <ConfirmationModal 
        isOpen={!!reviewToDelete}
        onClose={() => setReviewToDelete(null)}
        onConfirm={handleConfirmDelete}
        review={reviewToDelete}
      />
    </div>
  );
}

export default App;