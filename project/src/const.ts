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
