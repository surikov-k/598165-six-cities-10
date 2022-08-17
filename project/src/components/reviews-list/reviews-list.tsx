import React from 'react';
import {Review} from '../../types/review';
import ReviewItem from '../review-item/review-item';

const MAX_REVIEWS = 10;

type ReviewListProps = {
  reviews: Review[]
}

const ReviewsList = ({reviews}: ReviewListProps) => (
  <ul className="reviews__list" data-testid="reviews-list">
    {
      [...reviews]
        .sort((reviewA, reviewB) =>
          new Date(reviewB.date).getTime() - new Date(reviewA.date).getTime())
        .slice(0, MAX_REVIEWS)
        .map((review) => <ReviewItem key={review.id} review={review}/>)
    }
  </ul>
);

export default ReviewsList;
