import {createAsyncThunk} from '@reduxjs/toolkit';
import {AxiosInstance} from 'axios';

import {AppDispatch, State} from '../types/state';
import {loadOffers, requireAuthorization, saveUserEmail, setLoadingStatus} from './action';
import {Offer} from '../types/offer';
import {APIRoute, AuthorizationStatus} from '../const';
import {dropToken, saveToken} from '../services/token';
import {UserData} from '../types/user-data';
import {AuthData} from '../types/auth-data';

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


