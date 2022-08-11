import {render, screen} from '@testing-library/react';
import {configureMockStore} from '@jedmao/redux-mock-store';
import {Namespace} from '../../const';
import {Provider} from 'react-redux';
import {MemoryRouter} from 'react-router-dom';
import Favorites from './favorites';
import {State} from '../../types/state';
import {makeFakeState} from '../../utils/mock';

describe('Page: Favorites', () => {

  const mockStore = configureMockStore();

  it('should be rendered correctly', () => {
    const state: State = makeFakeState();

    const store = mockStore(state);

    render(
      <Provider store={store}>
        <MemoryRouter>
          <Favorites/>
        </MemoryRouter>
      </Provider>
    );

    expect(screen.getByTestId('header')).toBeInTheDocument();
    expect(screen.getAllByTestId('card').length).toBe(5);

    const cityNames: string[] = [
      ...new Set(
        state[Namespace.Data]
          .favoriteOffers
          .reduce((acc: string[], offer) => acc.concat([offer.city.name]), [])
      )
    ];

    cityNames.forEach((cityName) => {
      expect(screen.getByText(cityName)).toBeInTheDocument();
    });
  });

  it('should render the empty favorites component when there are not any favorites', () => {
    const state: State = makeFakeState();
    state[Namespace.Data].favoriteOffers = [];

    const store = mockStore(state);

    render(
      <Provider store={store}>
        <MemoryRouter>
          <Favorites/>
        </MemoryRouter>
      </Provider>
    );

    expect(screen.getByTestId('empty-favorites')).toBeInTheDocument();
  });
});
