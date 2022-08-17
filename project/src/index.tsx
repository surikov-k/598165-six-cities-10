import React from 'react';
import ReactDOM from 'react-dom/client';
import {Provider} from 'react-redux';

import App from './components/app/app';
import {store} from './store';
import {checkAuthAction, fetchFavoriteOffersAction, fetchOffersAction} from './store/api-actions';
import ErrorMessage from './components/error-message/error-message';
import browserHistory from './browser-history';
import HistoryRouter from './components/history-router/history-router';
import ScrollToTop from './components/scroll-to-top/scroll-to-top';

store.dispatch(fetchOffersAction());
store.dispatch(checkAuthAction());

store.dispatch(fetchFavoriteOffersAction());

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement,
);

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <HistoryRouter history={browserHistory}>
        <ScrollToTop/>
        <ErrorMessage/>
        <App/>
      </HistoryRouter>
    </Provider>
  </React.StrictMode>
);

