import {render, screen} from '@testing-library/react';
import {configureMockStore} from '@jedmao/redux-mock-store';
import {Namespace} from '../../const';
import {Provider} from 'react-redux';
import {MemoryRouter} from 'react-router-dom';
import Property from './property';
import thunk from 'redux-thunk';
import {makeFakeState} from '../../utils/mock';
import {Offer} from '../../types/offer';

describe('Page: Property', () => {

  it('should be rendered correctly', () => {

    const mockStore = configureMockStore([thunk]);
    const state = makeFakeState();
    const store = mockStore(state);

    render(
      <Provider store={store}>
        <MemoryRouter>
          <Property/>
        </MemoryRouter>
      </Provider>
    );

    expect(screen.getByTestId('header')).toBeInTheDocument();

    const offer = state[Namespace.Data].offer as Offer;

    const images = offer.images;
    const title = offer.title;

    images
      .slice(0, 6)
      .forEach((image, i) => {
        expect(screen.getByAltText(new RegExp(`${title} -- ${i}`, 'i')))
          .toBeInTheDocument();
      });

    expect(screen.getByTestId('rating-big')).toHaveStyle({width: `${offer.rating * 20}%`});
    expect(screen.getByTestId('feature-entire')).toHaveTextContent(offer.type);
    expect(screen.getByTestId('feature-bedrooms'))
      .toHaveTextContent(new RegExp(`${offer.bedrooms} bedrooms`, 'i'));
    expect(screen.getByTestId('price')).toHaveTextContent(`€${offer?.price}`);
    expect(screen.getByText(/What's inside/i)).toBeInTheDocument();

    offer.goods
      .forEach((item) => {
        expect(screen.getByText(new RegExp(`${item}`, 'i')))
          .toBeInTheDocument();
      });

    expect(screen.getByText(/Meet the host/i)).toBeInTheDocument();
    expect(screen.getByAltText(/Host avatar/i))
      .toHaveAttribute('src', offer.host.avatarUrl);
    expect(screen.getByText(offer.host.name)).toBeInTheDocument();
    expect(screen.getByText(offer.description)).toBeInTheDocument();

    expect(screen.getByText(offer.title)).toBeInTheDocument();

    expect(screen.getByTestId('map')).toBeInTheDocument();

    expect(screen.getAllByTestId('card').length).toBe(3);
  });

  it('should render a pro label if the host is pro', () => {

    const mockStore = configureMockStore([thunk]);
    const state = makeFakeState();

    const {offer} = state[Namespace.Data];
    if (offer) {
      offer.host.isPro = true;
    }

    const store = mockStore(state);

    render(
      <Provider store={store}>
        <MemoryRouter>
          <Property/>
        </MemoryRouter>
      </Provider>
    );
    expect(screen.getByTestId('host-is-pro')).toBeInTheDocument();
  });

  it('should not render a pro label if the host is not pro', () => {

    const mockStore = configureMockStore([thunk]);
    const state = makeFakeState();
    const {offer} = state[Namespace.Data];
    if (offer) {
      offer.host.isPro = false;
    }

    const store = mockStore(state);

    render(
      <Provider store={store}>
        <MemoryRouter>
          <Property/>
        </MemoryRouter>
      </Provider>
    );
    expect(screen.queryByTestId('host-is-pro')).toBeNull();
  });

  it('should render a premium label if the offer is premium', () => {

    const mockStore = configureMockStore([thunk]);
    const state = makeFakeState();

    const {offer} = state[Namespace.Data];
    if (offer) {
      offer.isPremium = true;
    }

    const store = mockStore(state);

    render(
      <Provider store={store}>
        <MemoryRouter>
          <Property/>
        </MemoryRouter>
      </Provider>
    );
    expect(screen.getByTestId('premium-label')).toBeInTheDocument();
  });

  it('should not render a premium label if the offer is not premium', () => {

    const mockStore = configureMockStore([thunk]);
    const state = makeFakeState();

    const {offer} = state[Namespace.Data];
    if (offer) {
      offer.isPremium = false;
    }

    const store = mockStore(state);
    render(
      <Provider store={store}>
        <MemoryRouter>
          <Property/>
        </MemoryRouter>
      </Provider>
    );
    expect(screen.queryByTestId('premium-label')).toBeNull();
  });
});
