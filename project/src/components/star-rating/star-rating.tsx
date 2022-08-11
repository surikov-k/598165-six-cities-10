import {FormEvent, Fragment, memo} from 'react';

type StarRatingProps = {
  currentRating: number
  onChange: (evt: FormEvent<HTMLInputElement>) => void;
  disabled: boolean
}

const StarRating = ({currentRating, onChange, disabled}: StarRatingProps): JSX.Element => {
  const labelTitles = [
    'perfect',
    'good',
    'not bad',
    'badly',
    'terribly',
  ];
  return (
    <div className="reviews__rating-form form__rating" data-testid="star-rating">
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
                onChange={onChange}
                checked={currentRating === stars}
                disabled={disabled}
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

export default memo(StarRating);
