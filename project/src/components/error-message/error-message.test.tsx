import {render, screen} from '@testing-library/react';
import ErrorMessage from './error-message';
import {configureMockStore} from '@jedmao/redux-mock-store';
import {Provider} from 'react-redux';
import {Namespace} from '../../const';

const mockStore = configureMockStore();

describe('Component: ErrorMessage', () => {
  it('should be rendered correctly', () => {
    render(
      <Provider
        store={mockStore({
          [Namespace.Data]: {
            error: 'Some error message',
          }
        })}
      >
        <ErrorMessage/>
      </Provider>
    );
    expect(screen.getByText(/Some error message/i)).toBeInTheDocument();
  });
});
