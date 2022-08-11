import {appProcess, changeCity, changeSorting, saveUserEmail} from './app-process';
import {AppProcess} from '../../types/state';
import {DEFAULT_CITY} from '../../const';
import {SortingType} from '../../components/sorting-select/sorting-select';
import * as faker from 'faker';

const initialState: AppProcess = {
  currentCity: DEFAULT_CITY,
  sortingType: SortingType.Popular,
  userEmail: '',
};

describe('Reducer: AppProcess', () => {
  it('should return the initial state when called without additional parameters', () => {
    expect(appProcess.reducer(void 0, {type: 'UNKNOWN_ACTION'}))
      .toEqual(initialState);
  });

  it('should change a current city to a given value', () => {
    const state = {...initialState};
    const city = faker.address.city();

    expect(appProcess.reducer(state, changeCity(city)))
      .toEqual({
        currentCity: city,
        sortingType: SortingType.Popular,
        userEmail: '',
      });
  });

  it('should change a sorting to a given value', () => {
    const state = {...initialState};
    expect(appProcess.reducer(state, changeSorting(SortingType.PriceToLow)))
      .toEqual({
        currentCity: DEFAULT_CITY,
        sortingType: SortingType.PriceToLow,
        userEmail: '',
      });
  });

  it('should save a user email', () => {
    const state = {...initialState};
    const email = faker.internet.email();

    expect(appProcess.reducer(state, saveUserEmail(email)))
      .toEqual({
        currentCity: DEFAULT_CITY,
        sortingType: SortingType.Popular,
        userEmail: email,
      });
  });
});
