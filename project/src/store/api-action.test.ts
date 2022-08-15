import {Action} from 'redux';
import thunk, {ThunkDispatch} from 'redux-thunk';
import MockAdapter from 'axios-mock-adapter';
import {configureMockStore} from '@jedmao/redux-mock-store';
import {api} from './index';
import {
  checkAuthAction,
  fetchFavoriteOffersAction,
  fetchNearbyOffers,
  fetchOfferAction,
  fetchOffersAction,
  fetchReviewsAction,
  loginAction,
  logoutAction,
  postReviewAction,
  toggleFavoriteOfferAction
} from './api-actions';
import {APIRoute} from '../const';
import {State} from '../types/state';
import {saveUserEmail} from './app-process/app-process';
import {makeFakeOffer, makeFakeReview} from '../utils/mock';
import {Favorite} from '../types/favorite-offer-data';
import {AuthData} from '../types/auth-data';
import * as faker from 'faker';
import {AUTH_TOKEN} from '../services/token';

describe('Async actions', () => {

  const mockApi = new MockAdapter(api);
  const middlewares = [thunk.withExtraArgument(api)];

  const mockStore = configureMockStore<State,
    Action,
    ThunkDispatch<State, typeof api, Action>>(middlewares);


  it('should dispatch proper actions when GET /login return status is 200', async () => {
    const store = mockStore();
    mockApi
      .onGet(APIRoute.Login)
      .reply(200, []);

    expect(store.getActions()).toEqual([]);
    await store.dispatch(checkAuthAction());
    const actions = store.getActions().map(({type}) => type);
    expect(actions).toEqual([
      checkAuthAction.pending.type,
      saveUserEmail.type,
      checkAuthAction.fulfilled.type
    ]);
  });

  it('should dispatch proper actions when POST /login return status is 200', async () => {
    const fakeUser: AuthData = {
      email: faker.internet.email(),
      password: faker.internet.password()
    };

    mockApi
      .onPost(APIRoute.Login)
      .reply(200, {token: 'token'});

    const store = mockStore();

    Storage.prototype.setItem = jest.fn();

    await store.dispatch(loginAction(fakeUser));
    const actions = store.getActions().map(({type}) => type);

    expect(actions).toEqual([
      loginAction.pending.type,
      saveUserEmail.type,
      loginAction.fulfilled.type
    ]);

    expect(Storage.prototype.setItem).toBeCalledTimes(1);
    expect(Storage.prototype.setItem).toBeCalledWith(AUTH_TOKEN, 'token');
  });

  it('should dispatch proper actions when DELETE /logout return status is 204', async () => {
    mockApi
      .onDelete(APIRoute.Logout)
      .reply(204);

    const store = mockStore();
    Storage.prototype.removeItem = jest.fn();

    await store.dispatch(logoutAction());
    const actions = store.getActions().map(({type}) => type);

    expect(actions).toEqual([
      logoutAction.pending.type,
      saveUserEmail.type,
      logoutAction.fulfilled.type
    ]);
  });

  it('should dispatch proper actions when GET /offers return status is 200', async () => {
    const mockOffers = Array.from({length: 5}, makeFakeOffer);
    mockApi
      .onGet(APIRoute.Offers)
      .reply(200, mockOffers);
    const store = mockStore();
    await store.dispatch(fetchOffersAction());
    const actions = store.getActions().map(({type}) => type);

    expect(actions).toEqual([
      fetchOffersAction.pending.type,
      fetchOffersAction.fulfilled.type
    ]);
  });

  it('should dispatch proper actions when GET /offer return status is 200', async () => {
    const mockOffer = makeFakeOffer();
    const mockOfferId = mockOffer.id;

    mockApi
      .onGet(`${APIRoute.Offers}/${mockOffer.id}`)
      .reply(200, mockOffer);

    const store = mockStore();
    await store.dispatch(fetchOfferAction(mockOfferId));
    const actions = store.getActions().map(({type}) => type);

    expect(actions).toEqual([
      fetchOfferAction.pending.type,
      fetchOfferAction.fulfilled.type
    ]);
  });

  it('should dispatch proper actions when GET /comments/{hotelId} return status is 200', async () => {
    const mockOffer = makeFakeOffer();
    const mockOfferId = mockOffer.id;
    const mockReviews = Array.from({length: 5}, makeFakeReview);

    mockApi
      .onGet(`${APIRoute.Reviews}/${mockOffer.id}`)
      .reply(200, mockReviews);

    const store = mockStore();
    await store.dispatch(fetchReviewsAction(mockOfferId));
    const actions = store.getActions().map(({type}) => type);

    expect(actions).toEqual([
      fetchReviewsAction.pending.type,
      fetchReviewsAction.fulfilled.type
    ]);
  });

  it('should dispatch proper actions when GET /favorite return status is 200', async () => {
    const mockOffers = Array.from({length: 5}, makeFakeOffer);
    const store = mockStore();

    mockApi
      .onGet(APIRoute.Favorite)
      .reply(200, mockOffers);

    await store.dispatch(fetchFavoriteOffersAction());

    const actions = store.getActions().map(({type}) => type);

    expect(actions).toEqual([
      fetchFavoriteOffersAction.pending.type,
      fetchFavoriteOffersAction.fulfilled.type
    ]);
  });

  it('should dispatch proper actions when POST /favorite/{hotelId}/{status} return status is 200', async () => {
    const mockOffer = makeFakeOffer();
    const store = mockStore();

    mockApi
      .onPost(`${APIRoute.Favorite}/${mockOffer.id}/${1}`)
      .reply(200, mockOffer);

    await store.dispatch(toggleFavoriteOfferAction({
      id: mockOffer.id,
      status: Favorite.Add
    }));

    const actions = store.getActions().map(({type}) => type);

    expect(actions).toEqual([
      toggleFavoriteOfferAction.pending.type,
      toggleFavoriteOfferAction.fulfilled.type
    ]);
  });

  it('should dispatch proper actions when POST /comments/{hotelId} return status is 200', async () => {
    const mockOffer = makeFakeOffer();
    const mockReview = makeFakeReview();
    const store = mockStore();

    mockApi
      .onPost(`${APIRoute.Reviews}/${mockOffer.id}`)
      .reply(200, mockReview);

    await store.dispatch(postReviewAction({
      offerId: mockOffer.id,
      data: {
        comment: mockReview.comment,
        rating: mockReview.rating
      }
    }));

    const actions = store.getActions().map(({type}) => type);

    expect(actions).toEqual([
      postReviewAction.pending.type,
      postReviewAction.fulfilled.type
    ]);
  });

  it('should dispatch proper actions when GET /hotels/{hotelId}/nearby return status is 200', async () => {
    const {id} = makeFakeOffer();
    const mockOffers = Array.from({length: 5}, makeFakeOffer);
    const store = mockStore();

    mockApi
      .onGet(`${APIRoute.Offers}/${id}/nearby`)
      .reply(200, mockOffers);

    await store.dispatch(fetchNearbyOffers(id));

    const actions = store.getActions().map(({type}) => type);

    expect(actions).toEqual([
      fetchNearbyOffers.pending.type,
      fetchNearbyOffers.fulfilled.type
    ]);
  });

});
