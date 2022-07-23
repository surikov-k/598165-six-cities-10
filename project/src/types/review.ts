import {User} from './offer';

export type Review = {
  id: number;
  user: User;
  rating: number;
  comment: string;
  date: string
}

