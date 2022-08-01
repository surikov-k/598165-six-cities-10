import {useState} from 'react';
import {CardType} from '../../components/card/card';
import {Offer} from '../../types/offer';
import CardsList from '../../components/cards-list/cards-list';
import Map from '../../components/map/map';
import CitiesList from '../../components/locations-list/cities-list';
import {useAppDispatch, useAppSelector} from '../../hooks';
import {changeCity, changeSorting} from '../../store/action';
import SortingSelect, {sortOffers} from '../../components/sorting-select/sorting-select';
import EmptyOffers from '../../components/empty-offers/empty-offers';
import Header from '../../components/header/header';

const CITES_MAP_CLASSES = 'cities__map map';

function Main() {

  const dispatch = useAppDispatch();

  const offers = useAppSelector((state) => state.offers);
  const currentCity = useAppSelector((state) => state.currentCity);
  const sorting = useAppSelector((state) => state.sorting);

  const currentOffers = offers
    .filter((offer) => offer.city.name === currentCity);

  const [activeOffer, setActiveOffer] = useState<Offer | null>(null);

  const handelMouseEnter = (offer: Offer) => setActiveOffer(offer);
  const handelMouseLeave = () => setActiveOffer(null);

  return (
    <div className="page page--gray page--main">
      <Header/>

      <main className={`page__main page__main--index ${!offers.length ? 'page__main--index-empty' : ''}`}>
        <h1 className="visually-hidden">Cities</h1>
        <div className="tabs">
          <CitiesList
            currentCity={currentCity}
            changeCity={(city: string) => {
              dispatch(changeCity(city));
            }}
          />
        </div>
        <div className="cities">
          {
            offers.length > 0
              ?
              <div className="cities__places-container container">
                <section className="cities__places places">
                  <h2 className="visually-hidden">Places</h2>
                  <b className="places__found">{`${currentOffers.length} places to stay in ${currentCity}`}</b>
                  <SortingSelect
                    currentCriterion={sorting}
                    changeSorting={(criteria) => dispatch(changeSorting(criteria))}
                  />
                  <div className="cities__places-list places__list tabs__content">
                    <CardsList
                      cardType={CardType.Cities}
                      offers={sortOffers(currentOffers, sorting)}
                      onMouseEnter={handelMouseEnter}
                      onMouseLeave={handelMouseLeave}
                    />
                  </div>
                </section>

                <div className="cities__right-section">
                  {
                    currentOffers.length &&
                      <Map
                        city={currentOffers[0].city}
                        offers={currentOffers}
                        activeOffer={activeOffer}
                        mapClasses={CITES_MAP_CLASSES}
                      />
                  }
                </div>
              </div>
              :
              <EmptyOffers/>
          }
        </div>
      </main>
    </div>
  );
}

export default Main;
