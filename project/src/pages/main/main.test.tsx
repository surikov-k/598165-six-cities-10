import {render, screen} from '@testing-library/react';
import Main from './main';
import {createMemoryHistory} from 'history';
import {configureMockStore} from '@jedmao/redux-mock-store';
import {Provider} from 'react-redux';
import HistoryRouter from '../../components/history-router/history-router';
import {makeFakeState} from '../../utils/mock';
import {Namespace} from '../../const';

describe('Page: Main', () => {
  const history = createMemoryHistory();


  it('should be rendered correctly', () => {

    const mockStore = configureMockStore([]);
    const state = makeFakeState();
    const store = mockStore(state);

    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <Main/>
        </HistoryRouter>
      </Provider>
    );

    expect(screen.getByTestId('header')).toBeInTheDocument();
    expect(screen.getByTestId('cities-list')).toBeInTheDocument();
    expect(screen.getByTestId('cities')).toBeInTheDocument();
  });

  it('should render an empty-offers component when there arent any offers', () => {

    const mockStore = configureMockStore([]);
    const state = makeFakeState();
    state[Namespace.Data].offers = [];
    const store = mockStore(state);

    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <Main/>
        </HistoryRouter>
      </Provider>);
    expect(screen.getByTestId('empty-offers')).toBeInTheDocument();
  });
});
