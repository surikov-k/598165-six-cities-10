
import CitiesList from '../../components/locations-list/cities-list';
import {useAppDispatch, useAppSelector} from '../../hooks';
import {changeCity} from '../../store/action';
import Header from '../../components/header/header';
import Cities from '../../components/cities/cities';

function Main() {

  const dispatch = useAppDispatch();

  const currentCity = useAppSelector((state) => state.currentCity);
  const offers = useAppSelector((state) => state.offers);

  const offersByCity = offers
    .filter((offer) => offer.city.name === currentCity);

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
        <Cities
          offers={offersByCity}
        />
      </main>
    </div>
  );
}

export default Main;
