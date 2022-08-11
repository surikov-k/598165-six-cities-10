import {useEffect} from 'react';
import {Offer} from '../../types/offer';
import {AuthorizationStatus} from '../../const';
import {useAppDispatch, useAppSelector} from '../../hooks';
import ReviewsList from '../reviews-list/reviews-list';
import ReviewForm from '../review-form/review-form';
import {fetchReviewsAction} from '../../store/api-actions';
import {getAuthorizationStatus} from '../../store/user-process/selectors';
import {getReviews} from '../../store/app-data/selectors';

type ReviewsProps = {
  offerId: Offer['id']
}

const Reviews = ({offerId}: ReviewsProps) => {

  const dispatch = useAppDispatch();
  const authorizationStatus = useAppSelector(getAuthorizationStatus);
  const reviews = useAppSelector(getReviews);

  useEffect(() => {

    dispatch(fetchReviewsAction(offerId));

  }, [offerId, dispatch]);

  return (
    <section className="property__reviews reviews" data-testid="reviews">
      {
        reviews.length ?
          <>
            <h2 className="reviews__title">Reviews &middot;
              <span
                className="reviews__amount"
                data-testid="reviews-amount"
              >
                {reviews.length}
              </span>
            </h2>
            <ReviewsList reviews={reviews}/>
          </> : ''
      }
      {
        authorizationStatus === AuthorizationStatus.Auth &&
          <ReviewForm
            offerId={offerId}
          />
      }
    </section>
  );
};

export default Reviews;
