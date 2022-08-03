import {createAction} from '@reduxjs/toolkit';
import {Offer} from '../types/offer';
import {Sorting} from '../components/sorting-select/sorting-select';
import {AppRoute, AuthorizationStatus} from '../const';
import {Review} from '../types/review';

export const changeCity = createAction<string>('city/change');

export const loadOffers = createAction<Offer[]>('data/loadOffers');

export const loadOffer = createAction<Offer>('data/loadOffer');

export const loadOffersNearby = createAction<Offer[]>('data/loadOffersNearby');

export const loadReviews = createAction<Review[]>('data/loadReviews');

export const setLoadingStatus = createAction<boolean>('data/setLoadingStatus');

export const changeSorting = createAction<Sorting>('sorting/change');

export const requireAuthorization = createAction<AuthorizationStatus>('user/requireAuthorization');

export const saveUserEmail = createAction<string>('user/saveEmail');

export const setError = createAction<string | null>('data/setError');

export const redirectToRoute = createAction<AppRoute>('app/redirectToRoute');
