import {render, screen} from '@testing-library/react';
import ReviewForm, {MAX_REVIEW_LENGTH, MIN_REVIEW_LENGTH} from './review-form';
import {Provider} from 'react-redux';
import {configureMockStore} from '@jedmao/redux-mock-store';
import userEvent from '@testing-library/user-event';

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

  it('should set submit button disabled when form isn\'t valid and vice versa', async () => {
    render(
      <Provider store={mockStore({})}>
        <ReviewForm offerId={0}/>
      </Provider>
    );

    const textarea = screen.getByRole('textbox');
    const [star] = screen.getAllByRole('radio');

    await userEvent.type(textarea, '*'.repeat(Math.round(MAX_REVIEW_LENGTH / 2)));
    expect(screen.getByRole('button')).toHaveAttribute('disabled');

    await userEvent.click(star);

    await userEvent.type(textarea, '*'.repeat(MAX_REVIEW_LENGTH + 2));
    expect(screen.getByRole('button')).toHaveAttribute('disabled', '');

    await userEvent.clear(textarea);
    await userEvent.type(textarea, '*'.repeat(MIN_REVIEW_LENGTH - 1));
    expect(screen.getByRole('button')).toHaveAttribute('disabled', '');

    await userEvent.clear(textarea);
    await userEvent.type(textarea, '*'.repeat(Math.round(MAX_REVIEW_LENGTH / 2)));

    expect(screen.getByRole('button')).not.toHaveAttribute('disabled');
  });
});

