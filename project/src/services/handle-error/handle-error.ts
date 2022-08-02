import {store} from '../../store';
import {clearErrorAction} from '../../store/api-actions';
import {setError} from '../../store/action';

export const handleError = (message: string): void => {
  store.dispatch(setError(message));
  store.dispatch(clearErrorAction());
};
