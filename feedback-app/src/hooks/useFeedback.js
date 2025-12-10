import { useState, useEffect, useCallback, useMemo } from 'react';

const API_URL_FEEDBACK = 'http://localhost:4000/feedback';

export const useFeedback = () => {
  const [feedbackList, setFeedbackList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const fetchFeedback = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch(API_URL_FEEDBACK);
      if (!response.ok) {
        throw new Error('Failed to fetch feedback list.');
      }
      const data = await response.json();
      setFeedbackList(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchFeedback();
  }, [fetchFeedback]);

  const postFeedback = useCallback(async (feedback) => {
    setIsSubmitting(true);
    setSubmitSuccess(false);
    setError(null);

    const payload = {
      ...feedback,
      timestamp: new Date().toISOString(),
    };

    try {
      const response = await fetch(API_URL_FEEDBACK, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error('Failed to submit feedback.');
      }

      const newEntry = await response.json();
      setFeedbackList((prev) => [newEntry, ...prev]); 
      setSubmitSuccess(true);
      return true;
    } catch (err) {
      setError(err.message);
      setSubmitSuccess(false);
      return false;
    } finally {
      setIsSubmitting(false);
    }
  }, []);

  // useMemo for derived values: Average Rating & Total Count
  const feedbackStats = useMemo(() => {
    const totalItems = feedbackList.length;
    const sumRatings = feedbackList.reduce((sum, item) => sum + item.rating, 0);
    const averageRating = totalItems > 0 ? (sumRatings / totalItems).toFixed(2) : '0.00';
    
    const sortedList = [...feedbackList].sort((a, b) => 
      new Date(b.timestamp || 0).getTime() - new Date(a.timestamp || 0).getTime()
    );

    return {
      totalItems,
      averageRating: parseFloat(averageRating),
      sortedList,
    };
  }, [feedbackList]); // Recalculates when feedbackList changes

  return {
    feedbackList: feedbackStats.sortedList,
    isLoading,
    error,
    isSubmitting,
    submitSuccess,
    feedbackStats,
    postFeedback,
  };
};