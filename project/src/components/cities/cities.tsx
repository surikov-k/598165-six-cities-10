import {Offer} from '../../types/offer';
import SortingSelect, {SortingType} from '../sorting-select/sorting-select';
import CardsList from '../cards-list/cards-list';
import {CardType} from '../card/card';
import Map from '../map/map';
import EmptyOffers from '../empty-offers/empty-offers';
import {useAppDispatch, useAppSelector} from '../../hooks';
import {useCallback, useState} from 'react';
import {getCurrentCity, getSortingType} from '../../store/app-process/selectors';
import {changeSorting} from '../../store/app-process/app-process';

const CITES_MAP_CLASSES = 'cities__map map';

type CitiesProps = {
  offers: Offer[]
}

function Cities({offers}: CitiesProps): JSX.Element {
  const dispatch = useAppDispatch();

  const sortingType = useAppSelector(getSortingType);
  const currentCity = useAppSelector(getCurrentCity);

  const [activeOffer, setActiveOffer] = useState<Offer | null>(null);

  const handelMouseEnter = useCallback(
    (offer: Offer) => setActiveOffer(offer),
    []
  );

  const handelMouseLeave = useCallback(
    () => setActiveOffer(null),
    []
  );

  const handleSorting = useCallback(
    (type: SortingType) => dispatch(changeSorting(type)),
    [dispatch]
  );

  return (
    <div className="cities" data-testid="cities">
      {
        offers.length > 0
          ?
          <div className="cities__places-container container">
            <section className="cities__places places">
              <h2 className="visually-hidden">Places</h2>
              <b className="places__found">{`${offers.length} places to stay in ${currentCity}`}</b>
              <SortingSelect
                currentType={sortingType}
                changeSorting={handleSorting}
              />
              <div className="cities__places-list places__list tabs__content">
                <CardsList
                  cardType={CardType.Cities}
                  offers={offers}
                  onMouseEnter={handelMouseEnter}
                  onMouseLeave={handelMouseLeave}
                />
              </div>
            </section>

            <div className="cities__right-section">
              {
                offers.length &&
                  <Map
                    center={offers[0].city.location}
                    offers={offers}
                    activeOffer={activeOffer}
                    mapClasses={CITES_MAP_CLASSES}
                  />
              }
            </div>
          </div>
          :
          <EmptyOffers/>
      }
    </div>);
}

export default Cities;
