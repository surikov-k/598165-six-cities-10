import {render, screen} from '@testing-library/react';
import CitiesList from './cities-list';
import {CITIES} from '../../const';
import userEvent from '@testing-library/user-event';

describe('Component: CitiesList', () => {
  const currentCity = 'Amsterdam';
  const onCityChange = jest.fn();

  it('should be rendered correctly', () => {
    render(
      <CitiesList currentCity={currentCity} changeCity={onCityChange}/>
    );
    CITIES.forEach((cityName) => {
      expect(screen.getByText(cityName)).toBeInTheDocument();
    });
  });

  it('gives an active class to the current city\'s tab', () => {
    render(
      <CitiesList currentCity={currentCity} changeCity={onCityChange}/>
    );
    expect(screen.getByTestId(`tab-${currentCity}`)).toHaveClass('tabs__item--active');
  });

  it('should call callback to change an active city', async () => {

    render(
      <CitiesList currentCity={currentCity} changeCity={onCityChange}/>
    );

    for (const cityName of CITIES) {
      await userEvent.click(screen.getByTestId(`tab-${cityName}`));
      expect(onCityChange).toHaveBeenCalled();
    }
  });
});
