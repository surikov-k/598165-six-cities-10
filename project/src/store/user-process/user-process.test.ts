import {userProcess} from './user-process';
import {UserProcess} from '../../types/state';
import {AuthorizationStatus} from '../../const';
import {checkAuthAction, loginAction, logoutAction} from '../api-actions';

describe('Reducer: UserProcess', () => {
  const initialState: UserProcess = {
    authorizationStatus: AuthorizationStatus.Unknown
  };

  it('should return the initial state when called without additional parameters', () => {
    expect(userProcess.reducer(void 0, {type: 'UNKNOWN_ACTION'}))
      .toEqual(initialState);
  });

  it('should change an unknown user status when user is authenticated', () => {
    const state = {...initialState};

    expect(userProcess.reducer(state, {
      type: checkAuthAction.fulfilled.type
    }))
      .toEqual({
        authorizationStatus: AuthorizationStatus.Auth
      });
  });

  it('should change an unknown user status when user is not authenticated', () => {
    const state = {...initialState};

    expect(userProcess.reducer(state, {
      type: checkAuthAction.rejected.type
    }))
      .toEqual({
        authorizationStatus: AuthorizationStatus.NoAuth
      });
  });

  it('should change a user status when login is successful', () => {
    const state = {...initialState};

    expect(userProcess.reducer(state, {
      type: loginAction.fulfilled.type
    }))
      .toEqual({
        authorizationStatus: AuthorizationStatus.Auth
      });
  });

  it('should change a user status when login is not successful', () => {
    const state = {...initialState};

    expect(userProcess.reducer(state, {
      type: loginAction.rejected.type
    }))
      .toEqual({
        authorizationStatus: AuthorizationStatus.NoAuth
      });
  });

  it('should change a user status when logout is successful', () => {
    const state = {...initialState};

    expect(userProcess.reducer(state, {
      type: logoutAction.fulfilled.type
    }))
      .toEqual({
        authorizationStatus: AuthorizationStatus.NoAuth
      });
  });
});
