import {render, screen} from '@testing-library/react';
import ReviewsList from './reviews-list';
import {Review} from '../../types/review';
import {makeFakeReview} from '../../utils/mock';

describe('Component: ReviewsList', () => {
  const reviews:Review[] = Array.from({length: 4}, () => makeFakeReview());

  it('should be rendered correctly', () => {
    render(<ReviewsList reviews={reviews}/>);

    expect(screen.getAllByTestId('review-item').length).toBe(4);
  });
});
