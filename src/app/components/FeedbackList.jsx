'use client';
import { useState, useEffect } from 'react';
import { ArrowPathIcon, EyeIcon, EyeSlashIcon } from '@heroicons/react/24/solid';
import styles from './styles/FeedbackList.module.css';

export default function FeedbackList() {
  const [feedbacks, setFeedbacks] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [showFeedback, setShowFeedback] = useState(false);

  // src/app/components/FeedbackList.jsx
  const fetchFeedbacks = async () => {
    setIsLoading(true);
    setError(null);
    
    try {
      const response = await fetch('/.netlify/functions/feedbacks');
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      setFeedbacks(data);
    } catch (err) {
      console.error('Fetch error:', err);
      setError('Failed to load feedbacks. Please try again later.');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (showFeedback) {
      fetchFeedbacks();
    }
  }, [showFeedback]);

  const formatDate = (timestamp) => {
    return new Date(timestamp).toLocaleString();
  };

  return (
    <div className={styles.container}>
      <div className={styles.buttonWrapper}>
        <button
          onClick={() => setShowFeedback(!showFeedback)}
          className={styles.toggleButton}
        >
          {showFeedback ? (
            <>
              <EyeSlashIcon className={styles.icon} />
              Hide Submitted Feedback
            </>
          ) : (
            <>
              <EyeIcon className={styles.icon} />
              View Submitted Feedback
            </>
          )}
        </button>
      </div>

      {showFeedback && (
        <div className={styles.feedbackContainer}>
          <div className={styles.header}>
            <h2 className={styles.title}>Submitted Feedback</h2>
            <button
              onClick={fetchFeedbacks}
              disabled={isLoading}
              className={styles.refreshButton}
            >
              <ArrowPathIcon className={`${styles.icon} ${isLoading ? styles.spin : ''}`} />
              Refresh
            </button>
          </div>

          {isLoading && !feedbacks.length ? (
            <div className={styles.loading}>Loading...</div>
          ) : error ? (
            <div className={styles.error}>
              <div>{error}</div>
            </div>
          ) : feedbacks.length === 0 ? (
            <div className={styles.empty}>No feedback submitted yet.</div>
          ) : (
            <div className={styles.feedbackList}>
              {feedbacks.map((feedback) => (
                <div key={feedback.id} className={styles.feedbackItem}>
                  <div className={styles.feedbackHeader}>
                    <h3>{feedback.name}</h3>
                    <time>{formatDate(feedback.timestamp)}</time>
                  </div>
                  <a
                    href={`mailto:${feedback.email}`}
                    className={styles.email}
                  >
                    {feedback.email}
                  </a>
                  <p className={styles.message}>{feedback.message}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}