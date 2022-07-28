import {useState} from 'react';
import {Offer} from '../../types/offer';

export enum Sorting {
  Popular = 'Popular',
  PriceToHigh = 'Price: low to high',
  PriceToLow = 'Price: high to low',
  TopRated = 'Top rated first'
}

type SortingDropdownProps = {
  currentCriterion: Sorting;
  changeSorting: (criterion: Sorting) => void;
}

const SortingDropdown = ({currentCriterion, changeSorting}: SortingDropdownProps) => {
  const [isOpened, setIsOpened] = useState<boolean>(false);

  return (
    <form
      className="places__sorting"
      onMouseEnter={() => setIsOpened(true)}
      onMouseLeave={() => setIsOpened(false)}
    >
      <span className="places__sorting-caption">Sort by&nbsp;</span>
      <span className="places__sorting-type" tabIndex={0}>
        {currentCriterion}
        <svg className="places__sorting-arrow" width="7" height={4}>
          <use xlinkHref="#icon-arrow-select"></use>
        </svg>
      </span>
      <ul
        className={`places__options places__options--custom ${isOpened
          ? 'places__options--opened'
          : ''
        }`}
      >
        {
          Object.values(Sorting)
            .map((criterion) => (
              <li
                key={criterion}
                className={`places__option ${criterion === currentCriterion ? 'places__option--active' : 0}`}
                tabIndex={0}
                onClick={() => {
                  changeSorting(criterion);
                  setIsOpened(false);
                }}
              >
                {criterion}
              </li>
            ))
        }
      </ul>
    </form>);
};

export const sortOffers = (offers: Offer[], criterion: Sorting) => ({
  [Sorting.Popular]: offers,
  [Sorting.PriceToHigh]: [...offers]
    .sort((offerA, offerB) => offerA.price - offerB.price),
  [Sorting.PriceToLow]: [...offers]
    .sort((offerA, offerB) => offerB.price - offerA.price),
  [Sorting.TopRated]: [...offers]
    .sort((offerA, offerB) => offerB.rating - offerA.rating)
}[criterion]);

export default SortingDropdown;
