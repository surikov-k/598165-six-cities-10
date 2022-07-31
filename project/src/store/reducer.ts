import {createReducer} from '@reduxjs/toolkit';
import {changeCity, changeSorting, loadOffers, setLoadingStatus} from './action';
import {AuthorizationStatus, DEFAULT_CITY} from '../const';
import {Sorting} from '../components/sorting-select/sorting-select';
import {Offer} from '../types/offer';

const initialState = {
  currentCity: DEFAULT_CITY,
  sorting: Sorting.Popular,
  offers: [] as Offer[],
  authorizationStatus: AuthorizationStatus.Unknown,
  isDataLoading: false,
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
    });
});

export {reducer};
