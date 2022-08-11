import React from 'react';
import {Review} from '../../types/review';

type ReviewProps = {
  review: Review
}

const ReviewItem = ({review}: ReviewProps) => {
  const {
    comment,
    date,
    rating,
    user,
  } = review;
  const {
    avatarUrl,
    name,
  } = user;

  const formatDate = (d: Date) => {
    const months = ['January', 'February', 'March', 'April', 'May', 'June',
      'July', 'August', 'September', 'October', 'November', 'December'
    ];

    return `${months[d.getMonth()]} ${d.getFullYear()}`;
  };

  const reviewDate = new Date(date);
  return (
    <li className="reviews__item" data-testid="review-item">
      <div className="reviews__user user">
        <div className="reviews__avatar-wrapper user__avatar-wrapper">
          <img
            className="reviews__avatar user__avatar"
            src={avatarUrl}
            width="54"
            height="54"
            alt={`${name} avatar`}
          />
        </div>
        <span className="reviews__user-name">
          {name}
        </span>
      </div>
      <div className="reviews__info">
        <div className="reviews__rating rating">
          <div className="reviews__stars rating__stars">
            <span data-testid={'rating'} style={{width: `${rating * 20}%`}}></span>
            <span className="visually-hidden">Rating</span>
          </div>
        </div>
        <p className="reviews__text">
          {comment}
        </p>
        <time
          className="reviews__time"
          dateTime={reviewDate.toISOString()}
        >
          {formatDate(reviewDate)}
        </time>
      </div>
    </li>
  );
};

export default ReviewItem;
