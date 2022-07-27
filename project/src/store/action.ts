import {createAction} from '@reduxjs/toolkit';
import {Offer} from '../types/offer';

export const changeCity = createAction<string>('city/change');
export const loadOffers = createAction<Offer[]>('offers/load');
