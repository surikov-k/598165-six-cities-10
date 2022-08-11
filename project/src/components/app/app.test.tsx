import {render, screen} from '@testing-library/react';
import {createMemoryHistory} from 'history';
import {configureMockStore} from '@jedmao/redux-mock-store';
import {AppRoute, AuthorizationStatus, Namespace} from '../../const';
import {Provider} from 'react-redux';
import HistoryRouter from '../history-router/history-router';
import App from './app';
import {State} from '../../types/state';
import thunk from 'redux-thunk';
import {makeFakeState} from '../../utils/mock';

const history = createMemoryHistory();
const mockStore = configureMockStore([thunk]);


const initialState: State = makeFakeState();

const createFakeApp = (state: State) => {
  const store = mockStore(state);

  return (
    <Provider store={store}>
      <HistoryRouter history={history}>
        <App/>
      </HistoryRouter>
    </Provider>
  );
};

describe('Application routing', () => {
  it('should render the main screen when a user navigates to "/"', () => {
    const app = createFakeApp(initialState);
    history.push(AppRoute.Root);

    render(app);

    expect(screen.getByTestId('main')).toBeInTheDocument();
  });

  it('should render the main screen when an authorized user navigates to "/login"', () => {
    const app = createFakeApp(initialState);
    history.push(AppRoute.Login);
    render(app);

    expect(screen.getByTestId('main')).toBeInTheDocument();
  });

  it('should render the login screen when an unauthorized user navigates to "/login"', () => {
    const app = createFakeApp({
      ...initialState,
      [Namespace.User]: {
        authorizationStatus: AuthorizationStatus.NoAuth
      }
    });
    history.push(AppRoute.Login);
    render(app);

    expect(screen.getByTestId('login')).toBeInTheDocument();
  });


  it('should render the favorite screen when an authorized user navigates to "/favorites"', () => {
    const app = createFakeApp(initialState);
    history.push(AppRoute.Favorites);
    render(app);

    expect(screen.getByTestId('favorites')).toBeInTheDocument();
  });


  it('should render the login screen when an unauthorized user navigates to "/favorites"', () => {
    const app = createFakeApp({
      ...initialState,
      [Namespace.User]: {
        authorizationStatus: AuthorizationStatus.NoAuth
      }
    });
    history.push(AppRoute.Favorites);
    render(app);

    expect(screen.getByTestId('login')).toBeInTheDocument();
  });

  it('should render the property screen when a user navigates to "/offer/:id"', () => {
    const app = createFakeApp(initialState);
    history.push('/offer/0');
    render(app);

    expect(screen.getByTestId('offer')).toBeInTheDocument();
  });


  it('should render the 404 screen when a user navigates to the non-existent route', () => {
    const app = createFakeApp(initialState);
    history.push('/non-existent-route');
    render(app);

    expect(screen.getByTestId('not-found')).toBeInTheDocument();
  });
});
