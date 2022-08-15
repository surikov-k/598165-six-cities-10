import Header from './header';
import {render, screen} from '@testing-library/react';
import {configureMockStore} from '@jedmao/redux-mock-store';
import {Provider} from 'react-redux';
import {createMemoryHistory} from 'history';
import HistoryRouter from '../history-router/history-router';
import {AppRoute, AuthorizationStatus, Namespace} from '../../const';
import {makeFakeState} from '../../utils/mock';
import {Route, Routes} from 'react-router-dom';
import userEvent from '@testing-library/user-event';


describe('Component: Header', () => {
  const history = createMemoryHistory();

  it('should be rendered correctly when a user is authenticated', () => {

    const mockStore = configureMockStore();
    const state = makeFakeState();

    render(
      <Provider
        store={mockStore({
          ...state,
          [Namespace.User]: {
            authorizationStatus: AuthorizationStatus.Auth,
          }
        })}
      >
        <HistoryRouter history={history}>
          <Header/>
        </HistoryRouter>
      </Provider>
    );
    expect(screen.getByTestId('logo')).toBeInTheDocument();
    expect(screen.getByText(state[Namespace.App].userEmail)).toBeInTheDocument();
    expect(screen.getByText('5')).toBeInTheDocument();
    expect(screen.getByText(/Sign out/)).toBeInTheDocument();
  });

  it('should be rendered correctly when a user is not authenticated', () => {

    const mockStore = configureMockStore();
    const state = makeFakeState();

    render(
      <Provider
        store={mockStore({
          ...state,
          [Namespace.User]: {
            authorizationStatus: AuthorizationStatus.NoAuth,
          }
        })}
      >
        <HistoryRouter history={history}>
          <Header/>
        </HistoryRouter>
      </Provider>
    );
    expect(screen.getByTestId('logo')).toBeInTheDocument();
    expect(screen.getByText(/Sign in/i)).toBeInTheDocument();

    expect(screen.queryByText(state[Namespace.App].userEmail)).not.toBeInTheDocument();
    expect(screen.queryByText('5')).not.toBeInTheDocument();
    expect(screen.queryByText(/Sign out/i)).not.toBeInTheDocument();
  });

  it('should redirect to the /favorites when a user clicked to the favorites link', async () => {
    const mockStore = configureMockStore();
    const state = makeFakeState();
    history.push('/fake ');
    render(
      <Provider
        store={mockStore({
          ...state,
          [Namespace.User]: {
            authorizationStatus: AuthorizationStatus.Auth,
          }
        })}
      >
        <HistoryRouter history={history}>
          <Routes>
            <Route
              path={AppRoute.Favorites}
              element={<h1>This is the favorites page</h1>}
            />
            <Route
              path="*"
              element={<Header/>}
            />
          </Routes>
        </HistoryRouter>
      </Provider>
    );

    expect(screen.queryByText(/This is the favorites page/)).not.toBeInTheDocument();
    await userEvent.click(screen.getByTestId('favorites-link'));
    expect(screen.getByText(/This is the favorites page/)).toBeInTheDocument();
  });
});
