import {createReducer} from '@reduxjs/toolkit';
import {
  changeCity,
  changeSorting,
  loadOffers,
  requireAuthorization,
  saveUserEmail,
  setError,
  setLoadingStatus
} from './action';
import {AuthorizationStatus, DEFAULT_CITY} from '../const';
import {Sorting} from '../components/sorting-select/sorting-select';
import {Offer} from '../types/offer';

const initialState = {
  currentCity: DEFAULT_CITY,
  sorting: Sorting.Popular,
  offers: [] as Offer[],
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
    .addCase(changeCity, (state, action) => {
      state.currentCity = action.payload;
    })
    .addCase(changeSorting, (state, action) => {
      state.sorting = action.payload;
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
