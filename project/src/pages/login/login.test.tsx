import {render, screen} from '@testing-library/react';
import {configureMockStore} from '@jedmao/redux-mock-store';
import {AuthorizationStatus, Namespace} from '../../const';
import {Provider} from 'react-redux';
import {MemoryRouter} from 'react-router-dom';
import Login from './login';

describe('Component: Login', () => {
  const mockStore = configureMockStore();
  const state = {
    [Namespace.User]: {
      authorizationStatus: AuthorizationStatus.Auth,
    }
  };
  const store = mockStore(state);

  it('should be rendered correctly', () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <Login/>
        </MemoryRouter>
      </Provider>
    );

    expect(screen.getByRole('heading')).toHaveTextContent(/Sign in/i);
    expect(screen.getByPlaceholderText(/Email/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/Password/i)).toBeInTheDocument();
    expect(screen.getByRole('button')).toHaveTextContent(/Sign in/i);
  });
});
