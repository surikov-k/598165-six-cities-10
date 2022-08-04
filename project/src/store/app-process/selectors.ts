import {State} from '../../types/state';
import {Namespace} from '../../const';
import {SortingType} from '../../components/sorting-select/sorting-select';

export const getCurrentCity = (state: State): string => state[Namespace.App].currentCity;

export const getSortingType = (state: State): SortingType => state[Namespace.App].sortingType;

export const getUserEmail = (state: State): string => state[Namespace.App].userEmail;
