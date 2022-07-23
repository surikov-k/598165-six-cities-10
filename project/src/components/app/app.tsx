import {BrowserRouter, Route, Routes} from 'react-router-dom';

import {AppRoute, AuthorizationStatus} from '../../const';
import Favorites from '../../pages/favorites/favorites';
import Login from '../../pages/login/login';
import Main from '../../pages/main/main';
import NotFound from '../../pages/not-found/not-found';
import PrivateRoute from '../private-route/private-route';
import Property from '../../pages/property/property';
import {Offer} from '../../types/offer';
import {Review} from '../../types/review';

type AppProps = {
  offers: Offer[];
  reviews: Review[]
}

function App({offers, reviews}: AppProps): JSX.Element {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path={AppRoute.Root}
          element={<Main offers={offers}/>}
        />
        <Route
          path={AppRoute.Login}
          element={<Login/>}
        />
        <Route
          path={AppRoute.Favorites}
          element={
            <PrivateRoute authorizationStatus={AuthorizationStatus.Auth}>
              <Favorites offers={offers}/>
            </PrivateRoute>
          }
        />
        <Route
          path={AppRoute.Offer}
          element={<Property offers={offers} reviews={reviews} nearby={offers}/>}
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
