import {Offer} from '../../types/offer';
import {Link} from 'react-router-dom';
// import {memo} from 'react';
import {useAppDispatch} from '../../hooks';
import {toggleFavoriteOfferAction} from '../../store/api-actions';
import {Favorite} from '../../types/favorite-offer-data';

export enum CardType {
  Cities = 'cities',
  Favorites = 'favorites',
  NearBy = 'near-places'
}

type CardProps = {
  cardType: CardType
  offer: Offer,
  onMouseEnter?: (offer: Offer) => void,
  onMouseLeave?: () => void,
}

function Card({cardType, offer, onMouseEnter, onMouseLeave}: CardProps): JSX.Element {
  const {
    id,
    isFavorite,
    isPremium,
    price,
    previewImage,
    rating,
    title,
    type
  } = offer;

  const dispatch = useAppDispatch();

  return (
    <article
      className={`${cardType}__card place-card`}
      onMouseEnter={() => onMouseEnter && onMouseEnter(offer)}
      onMouseLeave={() => onMouseLeave && onMouseLeave()}
    >
      {
        isPremium &&
          <div className="place-card__mark">
            <span>Premium</span>
          </div>
      }
      <div className={`${cardType}__image-wrapper place-card__image-wrapper`}>
        <Link to={`/offer/${id}`}>
          <img
            className="place-card__image"
            src={previewImage}
            width={`${cardType === 'favorites' ? 150 : 260}`}
            height={`${cardType === 'favorites' ? 110 : 200}`}
            alt={`${offer.title}`}
          />
        </Link>

      </div>
      <div className={cardType === 'favorites' ? 'favorites__card-info place-card__info' : 'place-card__info'}>
        <div className="place-card__price-wrapper">
          <div className="place-card__price">
            <b className="place-card__price-value">&euro;{price}</b>
            <span className="place-card__price-text">&#47;&nbsp;night</span>
          </div>
          <button
            className={`place-card__bookmark-button ${isFavorite ? 'place-card__bookmark-button--active' : ''} button`}
            type="button"
            onClick={() => dispatch(toggleFavoriteOfferAction({
              id,
              status: isFavorite ? Favorite.Remove : Favorite.Add
            }))}
          >
            <svg className="place-card__bookmark-icon" width="18" height="19">
              <use xlinkHref="#icon-bookmark"></use>
            </svg>
            <span className="visually-hidden">{`${isFavorite ? 'In' : 'To'} bookmarks`}</span>
          </button>
        </div>
        <div className="place-card__rating rating">
          <div className="place-card__stars rating__stars">
            <span style={{width: `${rating * 20}%`}}></span>
            <span className="visually-hidden">Rating</span>
          </div>
        </div>
        <h2 className="place-card__name">
          <Link to={`/offer/${id}`}>{title}</Link>
        </h2>
        <p className="place-card__type">{type}</p>
      </div>
    </article>
  );
}

// export default memo(Card);
export default Card;
