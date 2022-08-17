import {render, screen} from '@testing-library/react';
import Card, {CardType} from './card';
import {Offer} from '../../types/offer';
import {configureMockStore} from '@jedmao/redux-mock-store';
import {Provider} from 'react-redux';
import {createMemoryHistory} from 'history';
import HistoryRouter from '../history-router/history-router';
import {makeFakeOffer} from '../../utils/mock';
import userEvent from '@testing-library/user-event';
import thunk, {ThunkDispatch} from 'redux-thunk';
import {toggleFavoriteOfferAction} from '../../store/api-actions';
import {api} from '../../store';
import {State} from '../../types/state';
import {Action} from 'redux';

const mockStore = configureMockStore([thunk]);
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
    expect(screen.getByTestId('rating'))
      .toHaveStyle(`width: ${(Math.round(offer.rating)) * 20}%`);
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

  it('should dispatch toggleFavoriteOfferAction when button is clicked', async () => {

    const middlewares = [thunk.withExtraArgument(api)];

    const mockStoreWithThunk = configureMockStore<State,
      Action,
      ThunkDispatch<State, typeof api, Action>>(middlewares);

    const store = mockStoreWithThunk({});

    render(
      <Provider store={store}>
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
    await userEvent.click(screen.getByRole('button'));

    const actions = store.getActions().map(({type: t}) => t);
    expect(actions).toEqual([
      toggleFavoriteOfferAction.pending.type,
    ]);
  });

  it('should call a callback on mouse entering', async () => {
    const onMouseEnter = jest.fn();
    render(
      <Provider store={mockStore({})}>
        <HistoryRouter history={history}>
          <Card
            cardType={type}
            offer={offer}
            onMouseEnter={onMouseEnter}
          />
        </HistoryRouter>
      </Provider>
    );

    await userEvent.hover(screen.getByTestId('card'));
    expect(onMouseEnter).toHaveBeenCalled();
    expect(onMouseEnter).toHaveBeenCalledWith(offer);
  });

  it('should call a callback on mouse leaving', async () => {
    const onMouseLeave = jest.fn();
    render(
      <Provider store={mockStore({})}>
        <HistoryRouter history={history}>
          <Card
            cardType={type}
            offer={offer}
            onMouseLeave={onMouseLeave}
          />
        </HistoryRouter>
      </Provider>
    );

    await userEvent.unhover(screen.getByTestId('card'));
    expect(onMouseLeave).toHaveBeenCalled();
  });

});
