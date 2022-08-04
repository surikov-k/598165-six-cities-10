import {State} from '../../types/state';
import {Offer} from '../../types/offer';
import {Namespace} from '../../const';
import {Review} from '../../types/review';

export const getOffer = (state: State): Offer | null => state[Namespace.Data].offer;

export const getOffers = (state: State): Offer[] => state[Namespace.Data].offers;

export const getNearbyOffers = (state: State): Offer[] => state[Namespace.Data].nearbyOffers;

export const getReviews = (state: State): Review[] => state[Namespace.Data].reviews;

export const getIsDataLoading = (state: State): boolean => state[Namespace.Data].isDataLoading;

export const getError = (state: State): string => state[Namespace.Data].error;
