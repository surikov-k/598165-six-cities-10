import {Offer} from './offer';

export enum Favorite {
  Remove,
  Add
}

export type FavoriteOfferData = {
  id: Offer['id'],
  status: Favorite,
}
