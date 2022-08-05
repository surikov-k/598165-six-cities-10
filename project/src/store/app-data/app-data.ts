import {AppData} from '../../types/state';
import {Namespace} from '../../const';
import {createSlice} from '@reduxjs/toolkit';
import {
  clearErrorAction,
  fetchFavoriteOffersAction,
  fetchNearbyOffers,
  fetchOfferAction,
  fetchOffersAction,
  fetchReviewsAction,
  postReviewAction,
  toggleFavoriteOfferAction
} from '../api-actions';


const initialState: AppData = {
  offer: null,
  offers: [],
  nearbyOffers: [],
  favoriteOffers: [],
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
  extraReducers: function (builder) {
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
      .addCase(fetchFavoriteOffersAction.fulfilled, (state, action) => {
        state.favoriteOffers = action.payload;
      })
      .addCase(toggleFavoriteOfferAction.fulfilled, (state, action) => {
        const toggledOffer = state.offers
          .find((offer) => offer.id === action.payload.id);
        if (toggledOffer) {
          toggledOffer.isFavorite = action.payload.isFavorite;
        }

        if (action.payload.isFavorite) {
          state.favoriteOffers.push(action.payload);
        } else {
          state.favoriteOffers = state.favoriteOffers
            .filter((offer) => offer.id !== action.payload.id);
        }

        state.nearbyOffers.forEach((offer) => {
          if (toggledOffer && offer.id === toggledOffer.id) {
            offer.isFavorite = action.payload.isFavorite;
          }
        });

        if (state.offer && state.offer.id === action.payload.id) {
          state.offer.isFavorite = action.payload.isFavorite;
        }
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
