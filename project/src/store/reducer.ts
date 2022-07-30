import {createReducer} from '@reduxjs/toolkit';
import {changeCity, changeSorting, loadOffers} from './action';

import {Offer} from '../types/offer';
import {DEFAULT_CITY} from '../const';
import {Sorting} from '../components/sorting-select/sorting-select';


const initialState : {currentCity:string, sorting: Sorting, offers: Offer[] } = {
  currentCity: DEFAULT_CITY,
  sorting: Sorting.Popular,
  offers: []
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
    });
});

export {reducer};
