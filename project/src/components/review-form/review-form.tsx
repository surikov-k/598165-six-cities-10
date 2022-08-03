import {FormEvent, useState} from 'react';
import StarRating from '../star-rating/star-rating';
import {Offer} from '../../types/offer';
import {postReviewAction} from '../../store/api-actions';
import {useAppDispatch} from '../../hooks';

const MIN_REVIEW_LENGTH = 20;
const MAX_REVIEW_LENGTH = 300;

type ReviewFormProps = {
  offerId: Offer['id']
}

function ReviewForm({offerId}: ReviewFormProps): JSX.Element {
  const [review, setReview] = useState('');
  const [rating, setRating] = useState(0);
  const [isSubmitButtonDisabled, setIsSubmitButtonDisabled] = useState(true);
  const [isInputDisabled, setIsInputDisabled] = useState(false);

  const dispatch = useAppDispatch();

  const isFormValid = () => {
    if (review.length < MIN_REVIEW_LENGTH) {
      return false;
    }

    if (review.length > MAX_REVIEW_LENGTH) {
      return false;
    }

    return Boolean(rating);
  };

  const handleTextAreaChange = (evt: FormEvent<HTMLTextAreaElement>) => {
    const {value} = evt.currentTarget;
    setReview(value);
    setIsSubmitButtonDisabled(!isFormValid());
  };

  const handleStarRatingChange = (evt: FormEvent<HTMLInputElement>) => {
    const {value} = evt.currentTarget;
    setRating(parseInt(value, 10));
    setIsSubmitButtonDisabled(!isFormValid());
  };

  const handleSubmit = async (evt: FormEvent<HTMLFormElement>) => {
    evt.preventDefault();

    setIsSubmitButtonDisabled(true);
    setIsInputDisabled(true);
    try {
      dispatch(postReviewAction({
        offerId,
        data: {
          comment: review,
          rating
        }
      }));

      setIsInputDisabled(false);
      setReview('');
      setRating(0);
    } catch {
      setIsSubmitButtonDisabled(false);
      setIsInputDisabled(false);
    }
  };


  return (
    <form className="reviews__form form" action="" onSubmit={handleSubmit}>
      <label className="reviews__label form__label" htmlFor="review">Your review</label>
      <StarRating
        currentRating={rating}
        disabled={isInputDisabled}
        onChange={handleStarRatingChange}
      />
      <textarea
        disabled={isInputDisabled}
        className="reviews__textarea form__textarea" id="review" name="review"
        placeholder="Tell how was your stay, what did you like and what can be improved"
        onChange={handleTextAreaChange}
        value={review}
      >
      </textarea>
      <div className="reviews__button-wrapper">
        <p className="reviews__help">
          To submit review please make sure to set <span className="reviews__star">rating</span> and
          describe your stay with at least <b className="reviews__text-amount">50 characters</b>.
        </p>
        <button
          className="reviews__submit form__submit button"
          type="submit"
          disabled={isSubmitButtonDisabled}
        >
          Submit
        </button>
      </div>
    </form>
  );
}

export default ReviewForm;
