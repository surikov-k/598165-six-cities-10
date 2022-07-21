import {Offer} from '../../types/offer';
import Card, {CardType} from '../card/card';

type OffersListProps = {
  cardType: CardType,
  offers: Offer[],
  onMouseEnter?: (offer: Offer) => void,
  onMouseLeave?: () => void,
}

function CardsList({cardType, offers, onMouseEnter, onMouseLeave}: OffersListProps): JSX.Element {

  return (
    <>
      {offers.map((offer) => (
        <Card
          key={offer.id}
          cardType={cardType}
          offer={offer}
          onMouseEnter={onMouseEnter}
          onMouseLeave={onMouseLeave}
        />
      ))}
    </>);
}

export default CardsList;
