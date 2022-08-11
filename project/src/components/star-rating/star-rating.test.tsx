import {render, screen} from '@testing-library/react';
import StarRating from './star-rating';

describe('Component: StarRating', () => {
  it('should render correctly', () => {
    render(
      <StarRating
        currentRating={3}
        onChange={() => null}
        disabled={false}
      />
    );
    const inputs = screen.getAllByRole('radio');
    expect(inputs.length).toEqual(5);
    expect(inputs[2]).toHaveAttribute('checked', '');
  });

  it('can be disabled', () => {
    render(
      <StarRating
        currentRating={3}
        onChange={() => null}
        disabled
      />
    );

    screen.getAllByRole('radio')
      .forEach((input) => {
        expect(input).toHaveAttribute('disabled', '');
      });
  });
});
