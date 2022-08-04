export enum AppRoute {
  Login = '/login',
  Root = '/',
  Offer = '/offer/:id',
  Favorites = '/favorites',
  NotFound = '*'
}

export enum AuthorizationStatus {
  Auth = 'AUTH',
  NoAuth = 'NO_AUTH',
  Unknown = 'UNKNOWN'
}

export const URL_MARKER_DEFAULT = '/img/pin.svg';
export const URL_MARKER_CURRENT = '/img/pin-active.svg';

export const DEFAULT_CITY = 'Paris';

export const CITIES = [
  'Paris',
  'Cologne',
  'Brussels',
  'Amsterdam',
  'Hamburg',
  'Dusseldorf'
];

export const CLEAR_ERROR_DELAY = 5000;

export enum APIRoute {
  Offers = '/hotels',
  Login = '/login',
  Logout = '/logout',
  Reviews = '/comments'
}

export enum Namespace {
  Data = 'DATA',
  App = 'APP',
  User = 'USER',
}
