import {BrowserRouter, Route, Routes} from 'react-router-dom';

import {AppRoute, AuthorizationStatus} from '../../const';
import Favorites from '../../pages/favorites/favorites';
import Login from '../../pages/login/login';
import Main from '../../pages/main/main';
import NotFound from '../../pages/not-found/not-found';
import PrivateRoute from '../private-route/private-route';
import Property from '../../pages/property/property';
import {Review} from '../../types/review';
import {useAppDispatch} from '../../hooks';

import {loadOffers} from '../../store/action';
import {Offer} from '../../types/offer';
import {useEffect} from 'react';

type AppProps = {
  offers: Offer[];
  reviews: Review[]
}

function App({offers: mocks, reviews}: AppProps): JSX.Element {

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(loadOffers(mocks));

  }, [dispatch, mocks]);

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path={AppRoute.Root}
          element={<Main/>}
        />
        <Route
          path={AppRoute.Login}
          element={<Login/>}
        />
        <Route
          path={AppRoute.Favorites}
          element={
            <PrivateRoute authorizationStatus={AuthorizationStatus.Auth}>
              <Favorites />
            </PrivateRoute>
          }
        />
        <Route
          path={AppRoute.Offer}
          element={
            <Property
              reviews={reviews}
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
