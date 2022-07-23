import {FormEvent, Fragment, useState} from 'react';

function ReviewForm(): JSX.Element {
  const [review, setReview] = useState('');
  const [rating, setRating] = useState(0);

  const handleTextAreaChange = (evt: FormEvent<HTMLTextAreaElement>) => {
    const {value} = evt.currentTarget;
    setReview(value);
  };

  const handleStarRatingChange = (evt: FormEvent<HTMLInputElement>) => {
    const {value} = evt.currentTarget;
    setRating(parseInt(value, 10));
  };

  type StarRatingProps = {
    currentRating: number
  }
  const StarRating = ({currentRating}: StarRatingProps): JSX.Element => {
    const labelTitles = [
      'perfect',
      'good',
      'not bad',
      'badly',
      'terribly',
    ];
    return (
      <div className="reviews__rating-form form__rating">
        {
          labelTitles.map((title, i) => {
            const stars = labelTitles.length - i;
            return (
              <Fragment key={`${title}`}>
                <input
                  className="form__rating-input visually-hidden"
                  name="rating"
                  value={`${stars}`}
                  id={`${stars}-stars`}
                  type="radio"
                  onChange={handleStarRatingChange}
                  checked={currentRating === stars}
                />
                <label
                  htmlFor={`${stars}-stars`}
                  className="reviews__rating-label form__rating-label"
                  title={`${title}`}
                >
                  <svg className="form__star-image" width="37" height="33">
                    <use xlinkHref="#icon-star"></use>
                  </svg>
                </label>
              </Fragment>
            );
          })
        }
      </div>
    );
  };


  return (
    <form className="reviews__form form" action="#" method="post">
      <label className="reviews__label form__label" htmlFor="review">Your review</label>
      <StarRating currentRating={rating}/>
      <textarea
        className="reviews__textarea form__textarea" id="review" name="review"
        placeholder="Tell how was your stay, what you like and what can be improved"
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
          disabled={review.length < 50}
        >
          Submit
        </button>
      </div>
    </form>
  );
}

export default ReviewForm;
