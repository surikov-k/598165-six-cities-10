import {State} from '../../types/state';
import {AuthorizationStatus, Namespace} from '../../const';

export const getAuthorizationStatus = (state: State): AuthorizationStatus =>
  state[Namespace.User].authorizationStatus;
