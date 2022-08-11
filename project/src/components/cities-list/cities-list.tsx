import {CITIES} from '../../const';

type LocationsListProps = {
  currentCity: string;
  changeCity: (string: string) => void;
}

const CitiesList = ({currentCity, changeCity}: LocationsListProps) => (
  <section className="locations container" data-testid="cities-list">
    <ul className="locations__list tabs__list" >
      {
        CITIES.map((cityName) => (
          <li
            key={cityName}
            className="locations__item"
            style={{
              cursor: `${cityName === currentCity
                ? 'default'
                : 'pointer'}`
            }}
          >
            <span
              data-testid={`tab-${cityName}`}
              className={`locations__item-link tabs__item ${
                cityName === currentCity
                  ? 'tabs__item--active'
                  : ''
              }`}
              onClick={() => changeCity(cityName)}
            >
              <span>{cityName}</span>
            </span>
          </li>
        ))
      }
    </ul>
  </section>
);

export default CitiesList;
