import {render, screen} from '@testing-library/react';
import ReviewForm from './review-form';
import {Provider} from 'react-redux';
import {configureMockStore} from '@jedmao/redux-mock-store';

const mockStore = configureMockStore();

describe('Component: ReviewForm', () => {
  it('should be rendered correctly', () => {
    render(
      <Provider store={mockStore({})}>
        <ReviewForm offerId={0}/>
      </Provider>
    );

    expect(screen.getByTestId('star-rating')).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/Tell how was your stay, what did you like and what can be improved/i))
      .toBeInTheDocument();
    expect(screen.getByRole('button')).toBeInTheDocument();
  });
});
