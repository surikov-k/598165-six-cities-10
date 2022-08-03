import {createAsyncThunk} from '@reduxjs/toolkit';
import {AxiosInstance} from 'axios';

import {AppDispatch, State} from '../types/state';
import {
  loadOffer,
  loadOffers,
  loadOffersNearby,
  loadReviews,
  redirectToRoute,
  requireAuthorization,
  saveUserEmail,
  setError,
  setLoadingStatus
} from './action';
import {Offer} from '../types/offer';
import {APIRoute, AppRoute, AuthorizationStatus, CLEAR_ERROR_DELAY} from '../const';
import {dropToken, saveToken} from '../services/token';
import {UserData} from '../types/user-data';
import {AuthData} from '../types/auth-data';
import {store} from './';
import {Review} from '../types/review';

export const clearErrorAction = createAsyncThunk(
  'data/clearError',
  () => {
    setTimeout(
      () => store.dispatch(setError(null)),
      CLEAR_ERROR_DELAY,
    );
  }
);

export const fetchOffersAction = createAsyncThunk<void, undefined, {
  dispatch: AppDispatch,
  state: State,
  extra: AxiosInstance
}>(
  'data/fetchOffers',
  async (_arg, {dispatch, extra: api}) => {
    dispatch(setLoadingStatus(true));
    const {data} = await api.get<Offer[]>(APIRoute.Offers);
    dispatch(loadOffers(data));
    dispatch(setLoadingStatus(false));
  }
);

export const fetchOfferAction = createAsyncThunk<void, Offer['id'], {
  dispatch: AppDispatch,
  state: State,
  extra: AxiosInstance
}>(
  'data/fetchOffer',
  async (id, {dispatch, extra: api}) => {
    try {
      const {data} = await api.get<Offer>(`${APIRoute.Offers}/${id}`);
      dispatch(loadOffer(data));
    } catch {
      dispatch(redirectToRoute(AppRoute.NotFound));
    }
  }
);

export const fetchOffersNearBy = createAsyncThunk<void, Offer['id'], {
  dispatch: AppDispatch,
  state: State,
  extra: AxiosInstance
}>(
  'data/fetchOffersNearby',
  async (id, {dispatch, extra: api}) => {
    try {
      const {data} = await api.get<Offer[]>(`${APIRoute.Offers}/${id}/nearby`);
      dispatch(loadOffersNearby(data));
    } catch {
      dispatch(redirectToRoute(AppRoute.NotFound));
    }
  }
);

export const fetchReviewsAction = createAsyncThunk<void, Offer['id'], {
  dispatch: AppDispatch,
  state: State,
  extra: AxiosInstance
}>(
  'data/fetchReviews',
  async (id, {dispatch, extra: api}) => {

    const {data} = await api
      .get<Review[]>(`${APIRoute.Reviews}/${id}`);
    dispatch(loadReviews(data));
  }
);
export const postReviewAction = createAsyncThunk<void, {
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

    dispatch(loadReviews(reviews));
  }
);

export const checkAuthAction = createAsyncThunk<void, undefined, {
  dispatch: AppDispatch,
  state: State,
  extra: AxiosInstance
}>('user/checkAuth',
  async (_arg, {dispatch, extra: api}) => {
    try {
      const {data: {email: userEmail}} = await api.get(APIRoute.Login);

      dispatch(requireAuthorization(AuthorizationStatus.Auth));
      dispatch(saveUserEmail(userEmail));

    } catch {
      dispatch(requireAuthorization(AuthorizationStatus.NoAuth));
    }
  });

export const loginAction = createAsyncThunk<void, AuthData, {
  dispatch: AppDispatch,
  state: State,
  extra: AxiosInstance
}>('user/login',
  async ({email, password}, {dispatch, extra: api}) => {
    const {data: {token, email: userEmail}} = await api.post<UserData>(APIRoute.Login, {email, password});
    saveToken(token);
    dispatch(requireAuthorization(AuthorizationStatus.Auth));
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
    dispatch(requireAuthorization(AuthorizationStatus.NoAuth));
    dispatch(saveUserEmail(''));
  },
);


