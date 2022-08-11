import {useEffect, useRef} from 'react';
import {Icon, LayerGroup, layerGroup, Marker} from 'leaflet';

import {Location, Offer} from '../../types/offer';
import useMap from '../../hooks/use-map/use-map';
import {URL_MARKER_CURRENT, URL_MARKER_DEFAULT} from '../../const';

import 'leaflet/dist/leaflet.css';

type MapProps = {
  center: Location;
  offers: Offer[];
  activeOffer: Offer | null;
  mapClasses: string
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

function Map({center, offers, activeOffer, mapClasses}: MapProps): JSX.Element {

  const mapRef = useRef(null);
  const map = useMap(mapRef, center);

  useEffect(() => {
    let layer: LayerGroup;

    if (map) {
      layer = layerGroup().addTo(map);

      offers.forEach((offer) => {
        const marker = new Marker({
          lat: offer.location.latitude,
          lng: offer.location.longitude
        });

        marker.setIcon(
          activeOffer !== null && offer.id === activeOffer?.id
            ? currentCustomIcon
            : defaultCustomIcon
        );
        marker.addTo(layer);
      });
    }
    return () => {
      if (layer) {
        layer.clearLayers();
      }
    };
  }, [map, activeOffer, offers, center]);


  return (
    <section
      ref={mapRef}
      className={mapClasses}
      data-testid="map"
    >
    </section>
  );
}

export default Map;
