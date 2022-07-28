import {useParams} from 'react-router-dom';
import ReviewForm from '../../components/revew-form/review-form';
import {Review} from '../../types/review';
import ReviewsList from '../../components/reviews-list/reviews-list';
import Map from '../../components/map/map';
import CardsList from '../../components/cards-list/cards-list';
import {CardType} from '../../components/card/card';
import {useAppSelector} from '../../hooks';

type PropertyProps = {
  reviews: Review[];
}

const PROPERTY_MAP_CLASSES = 'property__map map';

function Property({reviews}: PropertyProps): JSX.Element | null {
  const {id} = useParams();
  const offers = useAppSelector((state) => state.offers);
  const currentCity = useAppSelector((state) => state.currentCity);

  if (!id) {
    return null;
  }

  const currentOffer = offers
    .find((offer) => offer.id === parseInt(id, 10));


  if (!currentOffer) {
    return null;
  }

  const nearByOffers = offers
    .filter((offer) => offer.city.name === currentCity)
    .filter((offer) => offer.id !== currentOffer.id)
    .slice(0, 3);

  nearByOffers.push(currentOffer);

  const {
    bedrooms,
    description,
    goods,
    host,
    images,
    isFavorite,
    isPremium,
    maxAdults,
    price,
    rating,
    title,
    type,
  } = currentOffer;

  return (
    <div className="page">
      <header className="header">
        <div className="container">
          <div className="header__wrapper">
            <div className="header__left">
              <a className="header__logo-link" href="main.html">
                <img className="header__logo" src="img/logo.svg" alt="6 cities logo" width="81" height="41"/>
              </a>
            </div>
            <nav className="header__nav">
              <ul className="header__nav-list">
                <li className="header__nav-item user">
                  <a className="header__nav-link header__nav-link--profile" href="#">
                    <div className="header__avatar-wrapper user__avatar-wrapper">
                    </div>
                    <span className="header__user-name user__name">Oliver.conner@gmail.com</span>
                    <span className="header__favorite-count">3</span>
                  </a>
                </li>
                <li className="header__nav-item">
                  <a className="header__nav-link" href="#">
                    <span className="header__signout">Sign out</span>
                  </a>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      </header>

      <main className="page__main page__main--property">
        <section className="property">
          <div className="property__gallery-container container">
            <div className="property__gallery">
              {
                images
                  .slice(0, 6)
                  .map((image, i) => (
                    <div
                      key={image}
                      className="property__image-wrapper"
                    >
                      <img
                        className="property__image"
                        src={image}
                        alt={`${title} -- ${i}`}
                      />
                    </div>
                  ))
              }
            </div>
          </div>
          <div className="property__container container">
            <div className="property__wrapper">
              {
                isPremium &&
                  <div className="property__mark">
                    <span>Premium</span>
                  </div>
              }
              <div className="property__name-wrapper">
                <h1 className="property__name">
                  {title}
                </h1>
                <button
                  className={`property__bookmark-button ${isFavorite ? 'property__bookmark-button--active' : ''} button`}
                  type="button"
                >
                  <svg className="property__bookmark-icon place-card__bookmark-icon" width="31" height="33">
                    <use xlinkHref="#icon-bookmark"></use>
                  </svg>
                  <span className="visually-hidden">{`${isFavorite ? 'In' : 'To'} bookmarks`}</span>
                </button>
              </div>
              <div className="property__rating rating">
                <div className="property__stars rating__stars">
                  <span style={{width: `${rating * 20}%`}}></span>
                  <span className="visually-hidden">Rating</span>
                </div>
                <span className="property__rating-value rating__value">{rating}</span>
              </div>
              <ul className="property__features">
                <li className="property__feature property__feature--entire">
                  {type}
                </li>
                <li className="property__feature property__feature--bedrooms">
                  {bedrooms} Bedrooms
                </li>
                <li className="property__feature property__feature--adults">
                  Max {maxAdults} adults
                </li>
              </ul>
              <div className="property__price">
                <b className="property__price-value">&euro;{price}</b>
                <span className="property__price-text">&nbsp;night</span>
              </div>
              <div className="property__inside">
                <h2 className="property__inside-title">What&apos;s inside</h2>
                <ul className="property__inside-list">
                  {
                    goods.map((item) => (
                      <li
                        key={item}
                        className="property__inside-item"
                      >
                        {item}
                      </li>
                    ))
                  }
                </ul>
              </div>
              <div className="property__host">
                <h2 className="property__host-title">Meet the host</h2>
                <div className="property__host-user user">
                  <div
                    className={`property__avatar-wrapper ${host.isPro ? 'property__avatar-wrapper--pro' : ''}  user__avatar-wrapper`}
                  >
                    <img
                      className="property__avatar user__avatar" src={host.avatarUrl} width="74" height="74"
                      alt="Host avatar"
                    />
                  </div>
                  <span className="property__user-name">
                    {host.name}
                  </span>
                  {
                    host.isPro &&
                      <span className="property__user-status">
                      Pro
                      </span>
                  }
                </div>
                <div className="property__description">
                  <p className="property__text">
                    {description}
                  </p>
                </div>
              </div>
              <section className="property__reviews reviews">
                {
                  reviews.length ?
                    <>
                      <h2 className="reviews__title">Reviews &middot;
                        <span
                          className="reviews__amount"
                        >
                          {reviews.length}
                        </span>
                      </h2>
                      <ReviewsList reviews={reviews}/>
                    </> : ''
                }
                <ReviewForm/>
              </section>
            </div>
          </div>
          <Map
            city={nearByOffers[0].city}
            offers={nearByOffers}
            activeOffer={currentOffer}
            mapClasses={PROPERTY_MAP_CLASSES}
          />
        </section>
        <div className="container">
          <section className="near-places places">
            {
              nearByOffers.length ?
                <>
                  <h2 className="near-places__title">Other places in the neighbourhood</h2>
                  <div className="near-places__list places__list">
                    <CardsList cardType={CardType.NearBy} offers={nearByOffers}/>
                  </div>
                </> : ''
            }
          </section>
        </div>
      </main>
    </div>
  );
}

export default Property;
