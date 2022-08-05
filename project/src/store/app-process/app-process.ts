import {DEFAULT_CITY, Namespace} from '../../const';
import {SortingType} from '../../components/sorting-select/sorting-select';
import {AppProcess} from '../../types/state';
import {createSlice} from '@reduxjs/toolkit';

const initialState: AppProcess = {
  currentCity: DEFAULT_CITY,
  sortingType: SortingType.Popular,
  userEmail: '',
};

export const appProcess = createSlice({
  name: Namespace.App,
  initialState,
  reducers: {
    changeCity: (state, action) => {
      state.currentCity = action.payload;
    },
    changeSorting: (state, action) => {
      state.sortingType = action.payload;
    },
    saveUserEmail: (state, action) => {
      state.userEmail = action.payload;
    },
  }
});

export const {changeCity, changeSorting, saveUserEmail} = appProcess.actions;
