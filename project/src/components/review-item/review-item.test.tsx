import ReviewItem from './review-item';
import {render, screen} from '@testing-library/react';
import {makeFakeReview} from '../../utils/mock';
import {Review} from '../../types/review';

const review:Review = {
  ...makeFakeReview(),
  date: '2022-06-13T12:25:36.938Z'
};

describe('Component: ReviewItem', () => {
  it('should be rendered correctly', () => {
    render(<ReviewItem review={review}/>);

    expect(screen.getByRole('img')).toHaveAttribute('src', review.user.avatarUrl);
    expect(screen.getByText(review.user.name)).toBeInTheDocument();
    expect(screen.getByTestId('rating')).toHaveStyle(`width: ${review.rating * 20}%`);
    expect(screen.getByText(review.comment)).toBeInTheDocument();
    expect(screen.getByText(/June 2022/i)).toBeInTheDocument();
  });
});
