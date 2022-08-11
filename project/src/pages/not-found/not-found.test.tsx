import {render, screen} from '@testing-library/react';
import NotFound from './not-found';
import {MemoryRouter} from 'react-router-dom';
describe('Page: NotFound', () => {
  it('should be rendered correctly', () => {
    render(
      <MemoryRouter>
        <NotFound/>
      </MemoryRouter>
    );

    expect(screen.getByRole('heading'))
      .toHaveTextContent(/The page you're looking for wasn't found/i);
    expect(screen.getByAltText(/6 cities logo/i)).toBeInTheDocument();
  });
});
