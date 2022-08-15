import {configureMockStore, MockStore} from '@jedmao/redux-mock-store';
import {redirectToRoute} from '../action';
import {AppRoute} from '../../const';
import {redirect} from './redirect';
import {fetchOfferAction, toggleFavoriteOfferAction} from '../api-actions';

const fakeHistory = {
  location: {pathname: ''},
  push(path: string) {
    this.location.pathname = path;
  }
};

jest.mock('../../browser-history.ts', () => fakeHistory);

const middleware = [redirect];
const mockStore = configureMockStore(middleware);
let store: MockStore;


describe('Middleware: Redirect', () => {
  beforeEach((() => {
    store = mockStore();
    fakeHistory.push('');
  }));

  it('should redirect to login', () => {
    store.dispatch(redirectToRoute(AppRoute.Login));
    expect(fakeHistory.location.pathname).toBe(AppRoute.Login);
    expect(store.getActions()).toEqual([redirectToRoute(AppRoute.Login)]);
  });

  it('should redirect to 404 page',() => {
    store.dispatch({type: fetchOfferAction.rejected.type});
    expect(fakeHistory.location.pathname).toBe(AppRoute.NotFound);
    expect(store.getActions()).toEqual([{type: fetchOfferAction.rejected.type}]);
  });

  it('should redirect to login page when an unauthorized user tries to toggle an offer from/to favorites',() => {
    store.dispatch({type: toggleFavoriteOfferAction.rejected.type});
    expect(fakeHistory.location.pathname).toBe(AppRoute.Login);
    expect(store.getActions()).toEqual([{type: toggleFavoriteOfferAction.rejected.type}]);
  });
});
