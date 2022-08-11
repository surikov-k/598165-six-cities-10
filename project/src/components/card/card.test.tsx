import {render, screen} from '@testing-library/react';
import Card, {CardType} from './card';
import {Offer} from '../../types/offer';
import {configureMockStore} from '@jedmao/redux-mock-store';
import {Provider} from 'react-redux';
import {createMemoryHistory} from 'history';
import HistoryRouter from '../history-router/history-router';
import {makeFakeOffer} from '../../utils/mock';

const mockStore = configureMockStore();
const history = createMemoryHistory();

const offer: Offer = makeFakeOffer();
const type: CardType = CardType.Cities;

describe('Component: Card', () => {
  it('should be rendered correctly', () => {
    render(
      <Provider store={mockStore({})}>
        <HistoryRouter history={history}>
          <Card cardType={type} offer={offer}/>
        </HistoryRouter>
      </Provider>
    );

    expect(screen.getByAltText(`${offer.title}`)).toBeInTheDocument();
    expect(screen.getByText(`€${offer.price}`)).toBeInTheDocument();
    expect(screen.getByTestId('rating')).toHaveStyle(`width: ${offer.rating * 20}%`);
    expect(screen.getByText(`${offer.title}`)).toBeInTheDocument();
    expect(screen.getByText(/apartment/i)).toBeInTheDocument();
  });

  it('should render a premium label if the offer is premium', () => {
    render(
      <Provider store={mockStore({})}>
        <HistoryRouter history={history}>
          <Card
            cardType={type}
            offer={{
              ...offer,
              isPremium: true
            }}
          />
        </HistoryRouter>
      </Provider>
    );
    expect(screen.getByText(/Premium/i)).toBeInTheDocument();
  });

  it('should not render a premium label if the offer is not premium', () => {
    render(
      <Provider store={mockStore({})}>
        <HistoryRouter history={history}>
          <Card
            cardType={type}
            offer={{
              ...offer,
              isPremium: false
            }}
          />
        </HistoryRouter>
      </Provider>
    );
    expect(screen.queryByText(/Premium/i)).toBeNull();
  });

  it('should add a proper class if the offer is favorite', () => {
    render(
      <Provider store={mockStore({})}>
        <HistoryRouter history={history}>
          <Card
            cardType={type}
            offer={{
              ...offer,
              isFavorite: true
            }}
          />
        </HistoryRouter>
      </Provider>
    );
    expect(screen.getByRole('button')).toHaveClass('place-card__bookmark-button--active');

  });

  it('should not add a proper class if the offer is not favorite', () => {
    render(
      <Provider store={mockStore({})}>
        <HistoryRouter history={history}>
          <Card
            cardType={type}
            offer={{
              ...offer,
              isFavorite: false
            }}
          />
        </HistoryRouter>
      </Provider>
    );
    expect(screen.getByRole('button'))
      .not.toHaveClass('place-card__bookmark-button--active');
  });

});
