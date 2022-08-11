import {render, screen} from '@testing-library/react';
import LoadingScreen from './loading-screen';
describe('Page: LoadingScreen', () => {
  it('should be rendered correctly', () => {
    render(<LoadingScreen/>);

    expect(screen.getByRole('heading'))
      .toHaveTextContent(/The offers are loading.../i);
    expect(screen.getByRole('img')).toHaveAttribute('src', 'img/spinner.svg');
  });
});
