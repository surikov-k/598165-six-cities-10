import {render, screen} from '@testing-library/react';
import EmptyFavorites from './empty-favorites';

describe('Component: EmptyFavorites', () => {
  it('should be rendered correctly', () => {
    render(
      <EmptyFavorites/>
    );
    expect(screen.getByText(/Nothing yet saved/i)).toBeInTheDocument();
    expect(screen.getByText(/Save properties to narrow down search or plan your future trips/i)).toBeInTheDocument();
  });
});
