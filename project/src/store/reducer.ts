import {createReducer} from '@reduxjs/toolkit';
import {changeCity, loadOffers} from './action';

import {Offer} from '../types/offer';
import {DEFAULT_CITY} from '../const';


const initialState : {currentCity:string, offers: Offer[] } = {
  currentCity: DEFAULT_CITY,
  offers: []
};

const reducer = createReducer(initialState, (builder) => {
  builder
    .addCase(loadOffers, (state, action) => {
      state.offers = action.payload;
    })
    .addCase(changeCity, (state, action) => {
      state.currentCity = action.payload;
    });
});

export {reducer};
