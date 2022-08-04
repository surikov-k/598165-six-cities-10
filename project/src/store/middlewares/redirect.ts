import {Middleware} from 'redux';
import browserHistory from '../../browser-history';
import {rootReducer} from '../root-reducer';
import {AppRoute} from '../../const';

type Reducer = ReturnType<typeof rootReducer>

export const redirect: Middleware<unknown, Reducer> =
  (_store) => (next) => (action) => {
    if (action.type === 'app/redirectToRoute') {
      browserHistory.push(action.payload);
    }
    if (action.type === 'data/fetchOffer/rejected') {
      browserHistory.push(AppRoute.NotFound);
    }
    return next(action);
  };
