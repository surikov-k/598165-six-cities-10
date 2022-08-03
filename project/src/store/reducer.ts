import {createReducer} from '@reduxjs/toolkit';
import {
  changeCity,
  changeSorting, loadOffer,
  loadOffers, loadOffersNearby, loadReviews,
  requireAuthorization,
  saveUserEmail,
  setError,
  setLoadingStatus
} from './action';
import {AuthorizationStatus, DEFAULT_CITY} from '../const';
import {SortingType} from '../components/sorting-select/sorting-select';
import {Offer} from '../types/offer';
import {Review} from '../types/review';

const initialState = {
  currentCity: DEFAULT_CITY,
  sortingType: SortingType.Popular,
  offer:  null as Offer | null,
  offers: [] as Offer[],
  nearbyOffers: [] as Offer[],
  reviews: [] as Review[],
  authorizationStatus: AuthorizationStatus.Unknown,
  userEmail: '',
  isDataLoading: false,
  error: null as string | null,
};

const reducer = createReducer(initialState, (builder) => {
  builder
    .addCase(loadOffers, (state, action) => {
      state.offers = action.payload;
    })
    .addCase(loadOffer, (state, action) => {
      state.offer = action.payload;
    })
    .addCase(loadOffersNearby, (state, action) => {
      state.nearbyOffers = action.payload;
    })
    .addCase(loadReviews, (state, action) => {
      state.reviews = action.payload;
    })
    .addCase(changeCity, (state, action) => {
      state.currentCity = action.payload;
    })
    .addCase(changeSorting, (state, action) => {
      state.sortingType = action.payload;
    })
    .addCase(setLoadingStatus, (state, action) => {
      state.isDataLoading = action.payload;
    })
    .addCase(requireAuthorization, (state, action) => {
      state.authorizationStatus = action.payload;
    })
    .addCase(saveUserEmail, (state, action) => {
      state.userEmail = action.payload;
    })
    .addCase(setError, (state, action) => {
      state.error = action.payload;
    });
});

export {reducer};
