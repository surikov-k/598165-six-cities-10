import Header from './header';
import {render, screen} from '@testing-library/react';
import {configureMockStore} from '@jedmao/redux-mock-store';
import {Provider} from 'react-redux';
import {createMemoryHistory} from 'history';
import HistoryRouter from '../history-router/history-router';
import {AuthorizationStatus, Namespace} from '../../const';
import {makeFakeState} from '../../utils/mock';


describe('Component: Logo', () => {
  const history = createMemoryHistory();

  it('should be rendered correctly when a user is authenticated', () => {

    const mockStore = configureMockStore();
    const state = makeFakeState();

    render(
      <Provider
        store={mockStore(state)}
      >
        <HistoryRouter history={history}>
          <Header/>
        </HistoryRouter>
      </Provider>
    );
    expect(screen.getByAltText(/6 cities logo/)).toBeInTheDocument();
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
    expect(screen.getByAltText(/6 cities logo/i)).toBeInTheDocument();
    expect(screen.getByText(/Sign in/i)).toBeInTheDocument();

    expect(screen.queryByText(state[Namespace.App].userEmail)).not.toBeInTheDocument();
    expect(screen.queryByText('5')).not.toBeInTheDocument();
    expect(screen.queryByText(/Sign out/i)).not.toBeInTheDocument();
  });
});
