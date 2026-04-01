import React, { useEffect, useState } from 'react';
import { Star, X } from 'lucide-react';
import { createReview, updateReview } from '../api/reviewApi';

const MAX_TITLE_LEN = 200;
const MAX_COMMENT_LEN = 2000;

const ReviewModal = ({
  isOpen,
  onClose,
  orderItemId,
  review,
  onSubmitted,
}) => {
  const [rating, setRating] = useState(review?.rating ?? 0);
  const [title, setTitle] = useState(review?.title ?? '');
  const [comment, setComment] = useState(review?.comment ?? '');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const canEdit = !review || review?.status === 'PENDING';

  useEffect(() => {
    if (!isOpen) return;
    setRating(review?.rating ?? 0);
    setTitle(review?.title ?? '');
    setComment(review?.comment ?? '');
    setError('');
  }, [isOpen, review]);

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!orderItemId) {
      setError('Missing order item id');
      return;
    }

    setError('');
    if (!canEdit) return;

    if (!Number.isInteger(rating) || rating < 1 || rating > 5) {
      setError('Please select a rating between 1 and 5');
      return;
    }

    if (title.length > MAX_TITLE_LEN) {
      setError(`Title must be at most ${MAX_TITLE_LEN} characters`);
      return;
    }
    if (comment.length > MAX_COMMENT_LEN) {
      setError(`Comment must be at most ${MAX_COMMENT_LEN} characters`);
      return;
    }

    const titleTrimmed = title.trim();
    const commentTrimmed = comment.trim();

    try {
      setLoading(true);

      if (!review) {
        await createReview({
          orderItemId,
          rating,
          title: titleTrimmed || undefined,
          comment: commentTrimmed || undefined,
        });
      } else {
        // Edit pending review: PATCH /store/reviews/:reviewId
        await updateReview(review.id, {
          rating,
          title: titleTrimmed || undefined,
          comment: commentTrimmed || undefined,
        });
      }

      if (onSubmitted) onSubmitted();
      onClose?.();
    } catch (err) {
      setError(err.response?.data?.message || err.message || 'Failed to submit review');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 backdrop-blur-sm p-4" role="dialog" aria-modal="true">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-lg overflow-hidden">
        <div className="flex items-center justify-between p-6 border-b border-gray-100 bg-gray-50/50">
          <div>
            <h2 className="text-xl font-bold text-gray-900">{review ? 'Edit Review' : 'Write a Review'}</h2>
            <p className="text-sm text-gray-600">Your feedback helps other devotees choose better</p>
          </div>

          <button
            type="button"
            onClick={onClose}
            disabled={loading}
            className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors disabled:opacity-50"
            aria-label="Close"
          >
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-5">
          {!canEdit && (
            <div className="p-4 bg-amber-50 border border-amber-200 rounded-xl text-amber-900 text-sm font-medium">
              This review is already {review?.status?.toLowerCase()} and cannot be edited.
            </div>
          )}

          <div>
            <label className="block text-sm font-bold text-gray-700 mb-2">Rating *</label>
            <div className="flex items-center gap-2">
              {[1, 2, 3, 4, 5].map((i) => {
                const active = i <= rating;
                return (
                  <button
                    key={i}
                    type="button"
                    onClick={() => canEdit && setRating(i)}
                    disabled={!canEdit}
                    className="transition-transform"
                    aria-label={`Set rating to ${i}`}
                  >
                    <Star
                      size={28}
                      className="transition-colors"
                      color={active ? '#FFD742' : '#E5E7EB'}
                      fill={active ? '#FFD742' : 'transparent'}
                    />
                  </button>
                );
              })}
            </div>
            <div className="text-xs text-gray-500 mt-2">Selected: {rating}/5</div>
          </div>

          <div className="space-y-3">
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">
                Title <span className="text-gray-400 font-normal">(Optional)</span>
              </label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                disabled={!canEdit || loading}
                maxLength={MAX_TITLE_LEN}
                placeholder="e.g. Great product!"
                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#88013C]/20 focus:border-[#88013C] outline-none transition-colors disabled:opacity-60"
              />
            </div>

            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">
                Comment <span className="text-gray-400 font-normal">(Optional)</span>
              </label>
              <textarea
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                disabled={!canEdit || loading}
                maxLength={MAX_COMMENT_LEN}
                rows={5}
                placeholder="Share your experience (what you liked, fit, quality, etc.)"
                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#88013C]/20 focus:border-[#88013C] outline-none transition-colors resize-none disabled:opacity-60"
              />
              <div className="text-xs text-gray-500 mt-2 text-right">{comment.length}/{MAX_COMMENT_LEN}</div>
            </div>
          </div>

          {error && (
            <div className="p-4 bg-red-50 border border-red-200 rounded-xl text-red-700 text-sm font-medium">
              {error}
            </div>
          )}

          <div className="flex flex-col sm:flex-row sm:justify-end gap-3 sm:gap-0 pt-2 border-t border-gray-100">
            <button
              type="button"
              onClick={onClose}
              disabled={loading}
              className="w-full sm:w-auto px-6 py-2.5 text-sm font-bold text-gray-600 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors disabled:opacity-60"
            >
              Cancel
            </button>

            {canEdit ? (
              <button
                type="submit"
                disabled={loading}
                className="w-full sm:w-auto px-6 py-2.5 text-sm font-bold text-white bg-[#88013C] rounded-lg hover:bg-[#6a0129] transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex justify-center items-center shadow-sm"
              >
                {loading ? 'Submitting...' : review ? 'Save Changes' : 'Submit Review'}
              </button>
            ) : null}
          </div>
        </form>
      </div>
    </div>
  );
};

export default ReviewModal;

