import {createAsyncThunk} from '@reduxjs/toolkit';
import {AxiosInstance} from 'axios';

import {AppDispatch, State} from '../types/state';
import {Offer} from '../types/offer';
import {APIRoute, CLEAR_ERROR_DELAY} from '../const';
import {dropToken, saveToken} from '../services/token';
import {UserData} from '../types/user-data';
import {AuthData} from '../types/auth-data';
import {Review} from '../types/review';
import {saveUserEmail} from './app-process/app-process';

export const clearErrorAction = createAsyncThunk<void, undefined, {
  dispatch: AppDispatch,
  state: State,
  extra: AxiosInstance
}>(
  'data/clearError',
  async (_arg, {dispatch}) => {
    await setTimeout(
      () => null,
      CLEAR_ERROR_DELAY,
    );
  }
);

export const fetchOffersAction = createAsyncThunk<Offer[], undefined, {
  dispatch: AppDispatch,
  state: State,
  extra: AxiosInstance
}>(
  'data/fetchOffers',
  async (_arg, {dispatch, extra: api}) => {
    const {data} = await api.get<Offer[]>(APIRoute.Offers);
    return data;
  }
);

export const fetchOfferAction = createAsyncThunk<Offer, Offer['id'], {
  dispatch: AppDispatch,
  state: State,
  extra: AxiosInstance
}>(
  'data/fetchOffer',
  async (id, {dispatch, extra: api}) => {
    const {data} = await api.get<Offer>(`${APIRoute.Offers}/${id}`);
    return data;
  }
);

export const fetchNearbyOffers = createAsyncThunk<Offer[], Offer['id'], {
  dispatch: AppDispatch,
  state: State,
  extra: AxiosInstance
}>(
  'data/fetchOffersNearby',
  async (id, {dispatch, extra: api}) => {
    const {data} = await api.get<Offer[]>(`${APIRoute.Offers}/${id}/nearby`);
    return data;
  }
);

export const fetchReviewsAction = createAsyncThunk<Review[], Offer['id'], {
  dispatch: AppDispatch,
  state: State,
  extra: AxiosInstance
}>(
  'data/fetchReviews',
  async (id, {dispatch, extra: api}) => {
    const {data} = await api
      .get<Review[]>(`${APIRoute.Reviews}/${id}`);
    return data;
  });

export const postReviewAction = createAsyncThunk<Review[], {
  offerId: Offer['id'],
  data: {
    comment: Review['comment'],
    rating: Review['rating']
  }
}, {
  dispatch: AppDispatch,
  state: State,
  extra: AxiosInstance
}>(
  'data/postReview',
  async ({offerId, data}, {dispatch, extra: api}) => {

    const {data: reviews} = await api
      .post(`${APIRoute.Reviews}/${offerId}`, data);

    return reviews;
  }
);

export const checkAuthAction = createAsyncThunk<void, undefined, {
  dispatch: AppDispatch,
  state: State,
  extra: AxiosInstance
}>('user/checkAuth',
  async (_arg, {dispatch, extra: api}) => {
    const {data: {email: userEmail}} = await api.get(APIRoute.Login);
    dispatch(saveUserEmail(userEmail));
  });

export const loginAction = createAsyncThunk<void, AuthData, {
  dispatch: AppDispatch,
  state: State,
  extra: AxiosInstance
}>('user/login',
  async ({email, password}, {dispatch, extra: api}) => {
    const {data: {token, email: userEmail}} = await api.post<UserData>(APIRoute.Login, {email, password});
    saveToken(token);
    dispatch(saveUserEmail(userEmail));
  });

export const logoutAction = createAsyncThunk<void, undefined, {
  dispatch: AppDispatch,
  state: State,
  extra: AxiosInstance
}>(
  'user/logout',
  async (_arg, {dispatch, extra: api}) => {
    await api.delete(APIRoute.Logout);
    dropToken();
    dispatch(saveUserEmail(''));
  },
);


