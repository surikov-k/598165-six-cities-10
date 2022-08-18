import CitiesList from '../../components/cities-list/cities-list';
import {useAppDispatch, useAppSelector} from '../../hooks';
import Header from '../../components/header/header';
import Cities from '../../components/cities/cities';
import {getCurrentCity} from '../../store/app-process/selectors';
import {changeCity} from '../../store/app-process/app-process';
import {getSortedOffersForCurrentCity} from '../../store/app-data/selectors';

function Main(): JSX.Element {

  const dispatch = useAppDispatch();

  const currentCity = useAppSelector(getCurrentCity);
  const offers = useAppSelector(getSortedOffersForCurrentCity);

  return (
    <div className="page page--gray page--main" data-testid="main">
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
          offers={offers}
        />
      </main>
    </div>
  );
}

export default Main;
