import {Review} from '../types/review';

export const reviews: Review[] = [
  {
    id: 1,
    user: {
      id: 18,
      isPro: true,
      name: 'Sophie',
      avatarUrl: 'https://10.react.pages.academy/static/avatar/9.jpg'
    },
    rating: 4,
    comment: 'Home is amazing. It\'s like staying in a museum. The rooms, furnishings and artworks are incredible. The views of My Vesuvius',
    date: '2022-05-25T12:25:36.939Z'
  },
  {
    id: 2,
    user: {
      id: 18,
      isPro: true,
      name: 'Sophie',
      avatarUrl: 'https://10.react.pages.academy/static/avatar/9.jpg'
    },
    rating: 5,
    comment: 'I stayed here for one night and it was an unpleasant experience.',
    date: '2022-05-25T12:25:36.939Z'
  }
];
