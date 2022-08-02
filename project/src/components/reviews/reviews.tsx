import {useEffect, useState} from 'react';
import {api} from '../../store';
import {Offer} from '../../types/offer';
import {APIRoute, AuthorizationStatus} from '../../const';
import {Review} from '../../types/review';
import {useAppDispatch, useAppSelector} from '../../hooks';
import ReviewsList from '../reviews-list/reviews-list';
import ReviewForm from '../review-form/review-form';

type ReviewsProps = {
  offerId: Offer['id']
}


const Reviews = ({offerId}: ReviewsProps) => {

  const dispatch = useAppDispatch();
  const authorizationStatus = useAppSelector((state) => state.authorizationStatus);

  const [reviews, setReviews] = useState<Review[] | []>([]);

  useEffect(() => {
    const getReviews = async () => {

      const {data: currentOfferReviews} = await api
        .get<Review[]>(`${APIRoute.Reviews}/${offerId}`);
      setReviews(currentOfferReviews);
    };

    getReviews();

  }, [offerId, dispatch]);

  return (
    <section className="property__reviews reviews">
      {
        reviews.length ?
          <>
            <h2 className="reviews__title">Reviews &middot;
              <span
                className="reviews__amount"
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
            onReviewSubmit={(updatedReviews: Review[]) => {
              setReviews(updatedReviews);
            }}
          />
      }
    </section>

  );
};

export default Reviews;
