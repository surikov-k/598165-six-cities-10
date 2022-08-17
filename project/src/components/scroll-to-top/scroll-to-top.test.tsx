import {render} from '@testing-library/react';
import {createMemoryHistory} from 'history';
import HistoryRouter from '../history-router/history-router';
import ScrollToTop from './scroll-to-top';

describe('Component: ScrollToTop', () => {

  const history = createMemoryHistory();
  global.scrollTo = jest.fn();

  it('should call window.scrollTo', () => {
    render(
      <HistoryRouter history={history}>
        <ScrollToTop/>
      </HistoryRouter>
    );
    expect(window.scrollTo).toHaveBeenCalledWith(0, 0);
  });
});
