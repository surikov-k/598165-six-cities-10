import {BrowserRouter, Route, Routes} from 'react-router-dom';

import {AppRoute} from '../../const';
import Favorites from '../../pages/favorites/favorites';
import Login from '../../pages/login/login';
import Main from '../../pages/main/main';
import NotFound from '../../pages/not-found/not-found';
import PrivateRoute from '../private-route/private-route';
import Property from '../../pages/property/property';
import {Review} from '../../types/review';
import {useAppSelector} from '../../hooks';
import LoadingScreen from '../../pages/loading-screen/loading-screen';

type AppProps = {
  reviews: Review[]
}

function App({reviews}: AppProps): JSX.Element {
  const {
    isDataLoading,
  } = useAppSelector((state) => state);

  if (isDataLoading) {
    return (
      <LoadingScreen />
    );
  }

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
            <PrivateRoute>
              <Favorites/>
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
