import {State} from '../../types/state';
import {Offer} from '../../types/offer';
import {Namespace} from '../../const';
import {Review} from '../../types/review';
import {SortingType} from '../../components/sorting-select/sorting-select';
import {createSelector} from '@reduxjs/toolkit';

const sortOffers = {
  [SortingType.Popular]: (_offerA: Offer, _offerB: Offer) => 1,
  [SortingType.PriceToHigh]: (offerA: Offer, offerB: Offer) => offerA.price - offerB.price,
  [SortingType.PriceToLow]: (offerA: Offer, offerB: Offer) => offerB.price - offerA.price,
  [SortingType.TopRated]: (offerA: Offer, offerB: Offer) => offerB.rating - offerA.rating
};

export const getOffer = (state: State): Offer | null => state[Namespace.Data].offer;

export const getSortedOffersForCurrentCity = createSelector(

  (state: State) => state[Namespace.App].currentCity,
  (state: State) => state[Namespace.App].sortingType,
  (state: State) => state[Namespace.Data].offers,

  (currentCity, sortingType, offers) => offers
    .filter((offer) => offer.city.name === currentCity)
    .sort(sortOffers[sortingType])
);

export const getNearbyOffers = (state: State): Offer[] => state[Namespace.Data].nearbyOffers;

export const getReviews = (state: State): Review[] => state[Namespace.Data].reviews;

export const getIsDataLoading = (state: State): boolean => state[Namespace.Data].isDataLoading;

export const getError = (state: State): string => state[Namespace.Data].error;

export const getFavoriteOffers = (state: State): Offer[] => state[Namespace.Data].favoriteOffers;

