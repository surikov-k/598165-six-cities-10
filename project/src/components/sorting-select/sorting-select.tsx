import {memo, useState} from 'react';
import {Offer} from '../../types/offer';

export enum SortingType {
  Popular = 'Popular',
  PriceToHigh = 'Price: low to high',
  PriceToLow = 'Price: high to low',
  TopRated = 'Top rated first'
}

type SortingSelectProps = {
  currentType: SortingType;
  changeSorting: (type: SortingType) => void;
}

const SortingSelect = ({currentType, changeSorting}: SortingSelectProps) => {
  const [isOpened, setIsOpened] = useState<boolean>(false);

  return (
    <form
      className="places__sorting"
      onMouseEnter={() => setIsOpened(true)}
      onMouseLeave={() => setIsOpened(false)}
      data-testid="sorting-select"
    >
      <span className="places__sorting-caption">Sort by&nbsp;</span>
      <span className="places__sorting-type" tabIndex={0}>
        {currentType}
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
          Object.values(SortingType)
            .map((type) => (
              <li
                key={type}
                className={`places__option ${type === currentType ? 'places__option--active' : 0}`}
                tabIndex={0}
                onClick={() => {
                  changeSorting(type);
                  setIsOpened(false);
                }}
                data-testid={'sort-item'}
              >
                {type}
              </li>
            ))
        }
      </ul>
    </form>);
};

export const sortOffers = (offers: Offer[], type: SortingType) => ({
  [SortingType.Popular]: offers,
  [SortingType.PriceToHigh]: [...offers]
    .sort((offerA, offerB) => offerA.price - offerB.price),
  [SortingType.PriceToLow]: [...offers]
    .sort((offerA, offerB) => offerB.price - offerA.price),
  [SortingType.TopRated]: [...offers]
    .sort((offerA, offerB) => offerB.rating - offerA.rating)
}[type]);

export default memo(SortingSelect);
