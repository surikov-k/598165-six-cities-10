import {useParams} from 'react-router-dom';
import Map from '../../components/map/map';
import CardsList from '../../components/cards-list/cards-list';
import {CardType} from '../../components/card/card';
import Header from '../../components/header/header';
import {useEffect, useState} from 'react';
import {Offer} from '../../types/offer';
import {useAppDispatch} from '../../hooks';
import {redirectToRoute} from '../../store/action';
import {APIRoute, AppRoute} from '../../const';
import {api} from '../../store';
import Reviews from '../../components/reviews/reviews';

const PROPERTY_MAP_CLASSES = 'property__map map';

function Property(): JSX.Element | null {
  const {id} = useParams();
  const dispatch = useAppDispatch();


  const [offer, setOffer] = useState<Offer | null>(null);
  const [nearbyOffers, setNearbyOffers] = useState<Offer[] | []>([]);


  useEffect(() => {

    const getOfferData = async () => {

      const {data: currentOffer} = await api
        .get<Offer>(`${APIRoute.Offers}/${id}`);
      setOffer(currentOffer);

      const {data: currentOfferNearby} = await api
        .get<Offer[]>(`${APIRoute.Offers}/${id}/nearby`);
      setNearbyOffers(currentOfferNearby);
    };

    getOfferData().catch(() => {
      dispatch(redirectToRoute(AppRoute.NotFound));
    });

  }, [id, dispatch]);

  if (!offer) {
    return null;
  }

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
  } = offer;

  return (
    <div className="page">
      <Header/>

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
              <Reviews offerId={offer.id}/>
            </div>
          </div>
          <Map
            center={{...offer.location, zoom: offer.city.location.zoom}}
            offers={[...nearbyOffers, offer]}
            activeOffer={offer}
            mapClasses={PROPERTY_MAP_CLASSES}
          />
        </section>
        <div className="container">
          <section className="near-places places">
            {
              nearbyOffers.length ?
                <>
                  <h2 className="near-places__title">Other places in the neighbourhood</h2>
                  <div className="near-places__list places__list">
                    <CardsList cardType={CardType.NearBy} offers={nearbyOffers}/>
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
