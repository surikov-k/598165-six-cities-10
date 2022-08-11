import {City, Location, Offer, User} from '../types/offer';
import * as faker from 'faker';
import {Review} from '../types/review';
import {AuthorizationStatus, DEFAULT_CITY, Namespace} from '../const';
import {SortingType} from '../components/sorting-select/sorting-select';

const getRandomInt = (min: number, max: number): number => Math
  .floor(Math.random() * (max - min) + min);

const getRandom = (min: number, max: number): number => Math.random() * (max - min) + min;

const getLocation = (): Location => ({
  latitude: parseInt(faker.address.latitude(51, 52), 10),
  longitude: parseInt(faker.address.longitude(6, 7), 10),
  zoom: 13,
});


const getCity = (): City => ({
  location: getLocation(),
  name: faker.address.cityName(),
});

const getUser = (): User => ({
  avatarUrl: faker.internet.avatar(),
  id: getRandomInt(0, 10),
  isPro: faker.datatype.boolean(),
  name: faker.internet.userName(),
});

export const makeFakeOffer = (): Offer => ({
  bedrooms: getRandomInt(1, 4),
  city: getCity(),
  description: faker.lorem.paragraph(),
  goods: Array
    .from({length: getRandomInt(1, 4)}, () => faker.lorem.words()),
  host: getUser(),
  id: faker.unique(() => getRandomInt(0, 10000)),
  images: Array.from({length: 15}, () => faker.image.imageUrl() + faker.datatype.string(4)),
  isFavorite: faker.datatype.boolean(),
  isPremium: faker.datatype.boolean(),
  location: getLocation(),
  maxAdults: getRandomInt(1, 5),
  previewImage: faker.image.city(),
  price: getRandomInt(100, 1000),
  rating: parseInt(getRandom(0, 5).toFixed(1), 10),
  title: faker.lorem.sentence(),
  type: 'apartment',
});

export const makeFakeReview = (): Review => ({
  id: faker.unique(() => getRandomInt(0, 10000)),
  user: getUser(),
  rating: parseInt(getRandom(0, 10).toFixed(1), 10),
  comment: faker.lorem.paragraph(),
  date: faker.date.soon().toISOString(),
});

export const makeFakeState = () => ({
  [Namespace.App]: {
    currentCity: DEFAULT_CITY,
    sortingType: SortingType.Popular,
    userEmail: faker.internet.email(),
  },
  [Namespace.Data]: {
    offer: makeFakeOffer() as Offer,
    offers: Array.from({length: 10}, () => makeFakeOffer()),
    nearbyOffers: Array.from({length: 3}, () => makeFakeOffer()),
    favoriteOffers: Array.from({length: 5}, () => makeFakeOffer()),
    reviews: Array.from({length: 10}, () => makeFakeReview()),
    isDataLoading: false,
    error: '',
  },
  [Namespace.User]: {
    authorizationStatus: AuthorizationStatus.Auth,
  }
});

