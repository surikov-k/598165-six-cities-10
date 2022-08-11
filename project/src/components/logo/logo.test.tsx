import {render, screen} from '@testing-library/react';
import Logo from './logo';
import {createMemoryHistory} from 'history';
import HistoryRouter from '../history-router/history-router';
import {Route, Routes} from 'react-router-dom';
import userEvent from '@testing-library/user-event';

const history = createMemoryHistory();


describe('Component: Logo', () => {
  it('should render correctly', () => {
    render(
      <HistoryRouter history={history}>
        <Logo/>
      </HistoryRouter>
    );
    expect(screen.getByAltText(/6 cities logo/i)).toBeInTheDocument();
    expect(screen.getByRole('link')).toBeInTheDocument();
  });

  it('should redirect to the root ulr when a user clicked to the link', async () => {
    history.push('/fake ');
    render(
      <HistoryRouter history={history}>
        <Routes>
          <Route
            path="/"
            element={<h1>This is the main page</h1>}
          />
          <Route
            path="*"
            element={<Logo/>}
          />
        </Routes>
      </HistoryRouter>
    );

    expect(screen.queryByText(/This is the main page/)).not.toBeInTheDocument();
    await userEvent.click(screen.getByRole('link'));
    expect(screen.getByText(/This is the main page/)).toBeInTheDocument();
  });
});
