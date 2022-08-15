import {render, screen} from '@testing-library/react';
import {configureMockStore} from '@jedmao/redux-mock-store';
import {createMemoryHistory} from 'history';
import {Provider} from 'react-redux';
import HistoryRouter from '../history-router/history-router';
import {Route, Routes} from 'react-router-dom';
import {AppRoute, AuthorizationStatus, Namespace} from '../../const';
import PrivateRoute from './private-route';

const mockStore = configureMockStore();
const history = createMemoryHistory();

describe('Component: PrivateRoute', () => {
  beforeEach(() => {
    history.push('/private');
  });

  it('should render a component for the public route when a user is not authorized', () => {
    const state = {
      [Namespace.User]: {
        authorizationStatus: AuthorizationStatus.NoAuth
      }
    };
    const store = mockStore(state);

    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <Routes>
            <Route
              path={AppRoute.Login}
              element={<h1>Public Route</h1>}
            />
            <Route
              path="/private"
              element={
                <PrivateRoute>
                  <h1>Private Route</h1>
                </PrivateRoute>
              }
            />
          </Routes>
        </HistoryRouter>
      </Provider>
    );

    expect(screen.getByText(/Public Route/i)).toBeInTheDocument();
    expect(screen.queryByText(/Private Route/i)).not.toBeInTheDocument();
  });

  it('should render a component for the private route when a user is authorized', () => {
    const state = {
      [Namespace.User]: {
        authorizationStatus: AuthorizationStatus.Auth
      }
    };
    const store = mockStore(state);

    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <Routes>
            <Route
              path={AppRoute.Login}
              element={<h1>Public Route</h1>}
            />
            <Route
              path="/private"
              element={
                <PrivateRoute>
                  <h1>Private Route</h1>
                </PrivateRoute>
              }
            />
          </Routes>
        </HistoryRouter>
      </Provider>
    );

    expect(screen.queryByText(/Public Route/i)).not.toBeInTheDocument();
    expect(screen.getByText(/Private Route/i)).toBeInTheDocument();
  });
});
