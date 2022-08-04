import {store} from '../store';

import {AuthorizationStatus} from '../const';
import {Offer} from './offer';
import {Review} from './review';
import {SortingType} from '../components/sorting-select/sorting-select';

export type UserProcess = {
  authorizationStatus: AuthorizationStatus
}

export type AppData = {
  offer: Offer | null,
  offers: Offer[],
  nearbyOffers: Offer[],
  reviews: Review[],
  isDataLoading: boolean,
  error: string,
}

export type AppProcess = {
  currentCity: string,
  sortingType: SortingType.Popular,
  userEmail: string,
}

export type State = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
