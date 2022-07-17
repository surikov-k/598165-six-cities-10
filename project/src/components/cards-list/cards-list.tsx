import {Offer} from '../../types/offer';
import Card from '../card/card';

type OffersListProps = {
  cardType: 'cities' | 'favorites',
  offers: Offer[],
  onMouseOver?: (offer: Offer) => void,
}

function CardsList({cardType, offers, onMouseOver}: OffersListProps): JSX.Element {

  return (
    <>
      {offers.map((offer) => (
        <Card
          key={offer.id}
          cardType={cardType}
          offer={offer}
          onMouseOver={onMouseOver}
        />
      ))}
    </>);
}

export default CardsList;
