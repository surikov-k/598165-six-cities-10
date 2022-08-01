import {createAction} from '@reduxjs/toolkit';
import {Offer} from '../types/offer';
import {Sorting} from '../components/sorting-select/sorting-select';
import {AuthorizationStatus} from '../const';

export const changeCity = createAction<string>('city/change');

export const loadOffers = createAction<Offer[]>('data/loadOffers');

export const setLoadingStatus = createAction<boolean>('data/setLoadingStatus');

export const changeSorting = createAction<Sorting>('sorting/change');

export const requireAuthorization = createAction<AuthorizationStatus>('user/requireAuthorization');

export const saveUserEmail = createAction<string>('user/saveEmail');
