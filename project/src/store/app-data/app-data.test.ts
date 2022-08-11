import {appData} from './app-data';
import {AppData} from '../../types/state';
import {
  clearErrorAction,
  fetchFavoriteOffersAction,
  fetchNearbyOffers,
  fetchOfferAction,
  fetchOffersAction,
  fetchReviewsAction, postReviewAction,
  toggleFavoriteOfferAction
} from '../api-actions';
import {makeFakeOffer, makeFakeReview} from '../../utils/mock';

const initialState: AppData = {
  offer: null,
  offers: [],
  nearbyOffers: [],
  favoriteOffers: [],
  reviews: [],
  isDataLoading: false,
  error: '',
};

const offer = makeFakeOffer();
const offers = Array.from({length: 5}, makeFakeOffer);
const reviews = Array.from({length: 5}, makeFakeReview);


describe('Reducer: AppData', () => {
  it('should return the initial state when called without additional parameters', () => {

    expect(appData.reducer(void 0, {type: 'UNKNOWN_ACTION'}))
      .toEqual(initialState);
  });

  it('should update offer by loading offer', () => {
    const state = {...initialState};
    expect(appData.reducer(
      state, {type: fetchOfferAction.fulfilled.type, payload: offer}))
      .toEqual({
        ...initialState,
        offer
      });
  });

  it('should update offers by loading offers', () => {
    const state = {...initialState};
    expect(appData.reducer(
      state, {type: fetchOffersAction.fulfilled.type, payload: offers}))
      .toEqual({
        ...initialState,
        offers
      });
  });

  it('should update nearby offers by loading nearby offers', () => {
    const state = {...initialState};
    expect(appData.reducer(
      state, {type: fetchNearbyOffers.fulfilled.type, payload: offers}))
      .toEqual({
        ...initialState,
        nearbyOffers: offers
      });
  });

  it('should update favorite offers by loading favorite offers', () => {
    const state = {...initialState};
    expect(appData.reducer(
      state, {type: fetchFavoriteOffersAction.fulfilled.type, payload: offers}))
      .toEqual({
        ...initialState,
        favoriteOffers: offers
      });
  });

  it('should update reviews by loading reviews', () => {
    const state = {...initialState};
    expect(appData.reducer(
      state, {type: fetchReviewsAction.fulfilled.type, payload: reviews}))
      .toEqual({
        ...initialState,
        reviews
      });
  });

  it('should update reviews when posting a review', () => {
    const state = {...initialState};
    expect(appData.reducer(
      state, {type: postReviewAction.fulfilled.type, payload: reviews}))
      .toEqual({
        ...initialState,
        reviews
      });
  });

  it('toggle favorite offer status', () => {
    const fakeOffer = makeFakeOffer();
    const favoriteOffer = {
      ...fakeOffer,
      isFavorite: true
    };
    const notFavoriteOffer = {
      ...fakeOffer,
      isFavorite: false
    };

    const state = {
      offer: favoriteOffer,
      offers: [favoriteOffer],
      nearbyOffers: [favoriteOffer],
      favoriteOffers: [favoriteOffer],
      reviews: [],
      isDataLoading: false,
      error: '',
    };

    expect(appData.reducer(
      state, {
        type: toggleFavoriteOfferAction.fulfilled.type,
        payload: notFavoriteOffer
      }))
      .toEqual({
        offer: notFavoriteOffer,
        offers: [notFavoriteOffer],
        nearbyOffers: [notFavoriteOffer],
        favoriteOffers: [],
        reviews: [],
        isDataLoading: false,
        error: '',
      });
  });


  it('should clear an error', () => {
    const state = {
      ...initialState,
      error: 'Error'
    };
    expect(appData.reducer(
      state, {type: clearErrorAction.fulfilled.type}))
      .toEqual(initialState);
  });
});
