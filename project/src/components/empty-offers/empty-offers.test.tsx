import {render, screen} from '@testing-library/react';
import {configureMockStore} from '@jedmao/redux-mock-store';
import {Provider} from 'react-redux';
import EmptyOffers from './empty-offers';
import {Namespace} from '../../const';

describe('Component: EmptyOffers', () => {
  const mockStore = configureMockStore();

  it('should be rendered correctly', () => {
    render(
      <Provider
        store={mockStore({
          [Namespace.App]: {
            currentCity: 'Some city name'
          }
        })}
      >
        <EmptyOffers/>
      </Provider>
    );
    expect(screen.getByText(/No places to stay available/i)).toBeInTheDocument();
    expect(screen.getByText(/Some city name/i)).toBeInTheDocument();
  });
});
