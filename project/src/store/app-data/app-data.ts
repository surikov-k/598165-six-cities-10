import {AppData} from '../../types/state';
import {Namespace} from '../../const';
import {createSlice} from '@reduxjs/toolkit';
import {
  fetchOfferAction,
  fetchOffersAction,
  fetchNearbyOffers,
  fetchReviewsAction,
  clearErrorAction, postReviewAction
} from '../api-actions';


const initialState: AppData = {
  offer: null,
  offers: [],
  nearbyOffers: [],
  reviews: [],
  isDataLoading: false,
  error: '',
};

export const appData = createSlice({
  name: Namespace.Data,
  initialState,
  reducers: {
    setError: (state, action) => {
      state.error = action.payload;
    }
  },
  extraReducers(builder) {
    builder
      .addCase(fetchOfferAction.fulfilled, (state, action) => {
        state.offer = action.payload;
      })
      .addCase(fetchOffersAction.pending, (state) => {
        state.isDataLoading = true;
      })
      .addCase(fetchOffersAction.fulfilled, (state, action) => {
        state.offers = action.payload;
        state.isDataLoading = false;
      })
      .addCase(fetchNearbyOffers.fulfilled, (state, action) => {
        state.nearbyOffers = action.payload;
      })
      .addCase(fetchReviewsAction.fulfilled, (state, action) => {
        state.reviews = action.payload;
      })
      .addCase(postReviewAction.fulfilled, (state, action) => {
        state.reviews = action.payload;
      })
      .addCase(clearErrorAction.fulfilled, (state) => {
        state.error = '';
      });
  }
});

export const {setError} = appData.actions;
