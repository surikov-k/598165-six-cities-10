import CardsList from '../../components/cards-list/cards-list';
import {CardType} from '../../components/card/card';
import {useAppSelector} from '../../hooks';
import Header from '../../components/header/header';
import Logo from '../../components/logo/logo';
import {getOffers} from '../../store/app-data/selectors';

function Favorites(): JSX.Element {
  const offers = useAppSelector(getOffers)
    .slice(0, 10);
  return (
    <div className="page">
      <Header/>
      <main className="page__main page__main--favorites">
        <div className="page__favorites-container container">
          <section className="favorites">
            <h1 className="favorites__title">Saved listing</h1>
            <ul className="favorites__list">
              <li className="favorites__locations-items">
                <div className="favorites__locations locations locations--current">
                  <div className="locations__item">
                    <a className="locations__item-link" href="#">
                      <span>Amsterdam</span>
                    </a>
                  </div>
                </div>
                <div className="favorites__places">
                  <CardsList
                    cardType={CardType.Favorites}
                    offers={offers}
                  />
                </div>
              </li>

              <li className="favorites__locations-items">
                <div className="favorites__locations locations locations--current">
                  <div className="locations__item">
                    <a className="locations__item-link" href="#">
                      <span>Cologne</span>
                    </a>
                  </div>
                </div>
                <div className="favorites__places">
                  <CardsList
                    cardType={CardType.Favorites}
                    offers={offers}
                  />
                </div>
              </li>
            </ul>
          </section>
        </div>
      </main>
      <footer className="footer container">
        <Logo/>
      </footer>
    </div>
  );
}

export default Favorites;
