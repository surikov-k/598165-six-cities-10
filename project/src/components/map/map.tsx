import {useEffect, useRef} from 'react';
import {Icon, Marker} from 'leaflet';

import {City, Offer} from '../../types/offer';
import useMap from '../../hooks/use-map/use-map';
import {URL_MARKER_CURRENT, URL_MARKER_DEFAULT} from '../../const';

import 'leaflet/dist/leaflet.css';

type MapProps = {
  city: City;
  offers: Offer[];
  activeOffer: Offer | null;
}

const defaultCustomIcon = new Icon({
  iconUrl: URL_MARKER_DEFAULT,
  iconSize: [27, 39],
  iconAnchor: [13, 39]
});

const currentCustomIcon = new Icon({
  iconUrl: URL_MARKER_CURRENT,
  iconSize: [27, 39],
  iconAnchor: [13, 39]
});

function Map({city, offers, activeOffer}: MapProps): JSX.Element {

  const mapRef = useRef(null);
  const map = useMap(mapRef, city);

  useEffect(() => {
    if (map) {
      offers.forEach((offer) => {
        const marker = new Marker({
          lat: offer.location.latitude,
          lng: offer.location.longitude
        });

        marker.setIcon(
          activeOffer !== null && offer.id === activeOffer.id
            ? currentCustomIcon
            : defaultCustomIcon
        );
        marker.addTo(map);
      });
    }
  }, [map, activeOffer, offers]);


  return (
    <section
      ref={mapRef}
      className="cities__map map"
      style={{height: 800}}
    >
    </section>
  );
}

export default Map;
