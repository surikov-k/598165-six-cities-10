import {useAppDispatch, useAppSelector} from '../../hooks';
import {getFavoriteOffers} from '../../store/app-data/selectors';
import CardsList from '../../components/cards-list/cards-list';
import {CardType} from '../../components/card/card';
import Header from '../../components/header/header';
import Logo from '../../components/logo/logo';
import EmptyFavorites from '../../components/empty-favorites/empty-favorites';
import {Offer} from '../../types/offer';
import {Link} from 'react-router-dom';
import {changeCity} from '../../store/app-process/app-process';

const EMPTY_FAVORITES_PAGE_CLASS = 'page--favorites-empty';
const EMPTY_FAVORITES_MAIN_CLASS = 'page__main--favorites-empty';

function Favorites(): JSX.Element {

  const dispatch = useAppDispatch();
  const favoritesOffers = useAppSelector(getFavoriteOffers);

  const getCities = (offers: Offer[]): string[] => [...new Set(offers.reduce((acc, offer) => acc.concat([offer.city.name]), [] as string[]))];

  return (
    <div className={`page  ${favoritesOffers.length === 0 ? EMPTY_FAVORITES_PAGE_CLASS : ''}`}>
      <Header/>
      <main
        className={`page__main page__main--favorites ${favoritesOffers.length === 0 ? EMPTY_FAVORITES_MAIN_CLASS : ''}`}
      >
        <div className="page__favorites-container container">
          {
            favoritesOffers.length > 0
              ?
              <section className="favorites">
                <h1 className="favorites__title">Saved listing</h1>
                <ul className="favorites__list">
                  {
                    getCities(favoritesOffers)
                      .map((city) => (
                        <li key={city} className="favorites__locations-items">
                          <div className="favorites__locations locations locations--current">
                            <div className="locations__item">
                              <Link
                                className="locations__item-link"
                                to={'/'}
                                onClick={() => {
                                  dispatch(changeCity(city));
                                }}
                              >
                                <span>{city}</span>
                              </Link>
                            </div>
                          </div>
                          <div className="favorites__places">
                            <CardsList
                              cardType={CardType.Favorites}
                              offers={favoritesOffers.filter((offer) => offer.city.name === city)}
                            />
                          </div>
                        </li>
                      ))
                  }

                </ul>
              </section>
              : <EmptyFavorites/>
          }
        </div>
      </main>
      <footer className="footer container">
        <Logo/>
      </footer>
    </div>
  );
}

export default Favorites;
