import {render, screen} from '@testing-library/react';
import thunk from 'redux-thunk';
import {configureMockStore} from '@jedmao/redux-mock-store';
import {Provider} from 'react-redux';
import Reviews from './reviews';
import {AuthorizationStatus, Namespace} from '../../const';
import {makeFakeState} from '../../utils/mock';

describe('Component: Reviews', () => {
  const mockStore = configureMockStore([thunk]);
  const state = makeFakeState();

  it('should be rendered correctly', async () => {
    render(
      <Provider
        store={mockStore(state)}
      >
        <Reviews offerId={0}/>
      </Provider>
    );

    expect(screen.getByTestId('reviews-amount')).toContainHTML('10');
    expect(screen.getByTestId('reviews-list')).toBeInTheDocument();
    expect(screen.getByTestId('review-form')).toBeInTheDocument();
  });

  it('shouldn\'t render a review form when the user is not authenticated', () => {
    render(
      <Provider
        store={mockStore({
          ...state,
          [Namespace.User]: {
            authorizationStatus: AuthorizationStatus.NoAuth
          }})}
      >
        <Reviews offerId={0}/>
      </Provider>
    );
    expect(screen.queryByTestId('review-form')).toBeNull();
  });
});
