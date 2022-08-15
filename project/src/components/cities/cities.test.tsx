import {render, screen} from '@testing-library/react';
import Cities from './cities';
import {Provider} from 'react-redux';
import {configureMockStore} from '@jedmao/redux-mock-store';
import {MemoryRouter} from 'react-router-dom';
import {makeFakeState} from '../../utils/mock';
import {Namespace} from '../../const';

describe('Component: Cities', () => {
  const mockStore = configureMockStore();
  const initialState = makeFakeState();
  const store = mockStore(initialState);

  it('should be rendered correctly', () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <Cities offers={initialState[Namespace.Data].offers}/>
        </MemoryRouter>
      </Provider>
    );

    expect(screen.getByTestId('sorting-select')).toBeInTheDocument();
    expect(screen.getAllByTestId('card').length).toBe(10);
    expect(screen.getByTestId('map')).toBeInTheDocument();
  });

  it('should render the empty offers component when there are not any offers', () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <Cities offers={[]}/>
        </MemoryRouter>
      </Provider>
    );

    expect(screen.getByTestId('empty-offers')).toBeInTheDocument();

  });
});
