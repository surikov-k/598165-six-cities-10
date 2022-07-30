import {createAction} from '@reduxjs/toolkit';
import {Offer} from '../types/offer';
import {Sorting} from '../components/sorting-select/sorting-select';

export const changeCity = createAction<string>('city/change');
export const loadOffers = createAction<Offer[]>('offers/load');
export const changeSorting = createAction<Sorting>('sorting/change');
