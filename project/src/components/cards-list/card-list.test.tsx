import {render, screen} from '@testing-library/react';
import CardsList from './cards-list';
import {Offer} from '../../types/offer';
import {CardType} from '../card/card';
import {Provider} from 'react-redux';
import HistoryRouter from '../history-router/history-router';
import {configureMockStore} from '@jedmao/redux-mock-store';
import {createMemoryHistory} from 'history';
import {makeFakeOffer} from '../../utils/mock';

describe('Component: CardList', () => {
  const mockStore = configureMockStore();
  const history = createMemoryHistory();
  const offers: Offer[] = Array.from({length: 5}, () => makeFakeOffer());

  it('should be rendered correctly', () => {

    render(
      <Provider store={mockStore({})}>
        <HistoryRouter history={history}>
          <CardsList cardType={CardType.Cities} offers={offers}/>
        </HistoryRouter>
      </Provider>
    );
    expect(screen.getAllByTestId('card').length).toBe(5);
  });
});
