import {BrowserRouter, Route, Routes} from 'react-router-dom';

import {AppRoute, AuthorizationStatus} from '../../const';
import Favorites from '../../pages/favorites/favorites';
import Login from '../../pages/login/login';
import Main from '../../pages/main/main';
import NotFound from '../../pages/not-found/not-found';
import PrivateRoute from '../private-route/private-route';
import Property from '../../pages/property/property';
import {Review} from '../../types/review';
import {useAppDispatch, useAppSelector} from '../../hooks';

import {loadOffers} from '../../store/action';
import {Offer} from '../../types/offer';

type AppProps = {
  offers: Offer[];
  reviews: Review[]
}

function App({offers: mocks, reviews}: AppProps): JSX.Element {

  const dispatch = useAppDispatch();

  dispatch(loadOffers(mocks));

  const offers = useAppSelector((state) => state.offers);
  const currentCity = useAppSelector((state) => state.currentCity);

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path={AppRoute.Root}
          element={
            <Main
              currentOffers={offers.filter((offer) => offer.city.name === currentCity)}
              currentCity={currentCity}
            />
          }
        />
        <Route
          path={AppRoute.Login}
          element={<Login/>}
        />
        <Route
          path={AppRoute.Favorites}
          element={
            <PrivateRoute authorizationStatus={AuthorizationStatus.Auth}>
              <Favorites offers={offers.slice(0, 10)}/>
            </PrivateRoute>
          }
        />
        <Route
          path={AppRoute.Offer}
          element={
            <Property
              offers={offers.filter((offer) => offer.city.name === currentCity)}
              reviews={reviews}
              nearby={offers
                .filter((offer) => offer.city.name === currentCity)
                .slice(0, 4)}
            />
          }
        />
        <Route
          path={AppRoute.NotFound}
          element={<NotFound/>}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
