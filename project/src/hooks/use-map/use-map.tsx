import {MutableRefObject, useEffect, useRef, useState} from 'react';
import {LatLng, Map, TileLayer} from 'leaflet';
import {Location} from '../../types/offer';

function useMap(
  mapRef: MutableRefObject<HTMLElement | null>,
  center: Location
): Map | null {
  const [map, setMap] = useState<Map | null>(null);
  const isRenderedRef = useRef<boolean>(false);

  const {
    latitude,
    longitude,
    zoom,
  } = center;

  useEffect(() => {
    if (mapRef.current !== null && !isRenderedRef.current) {
      const instance = new Map(mapRef.current, {
        center: {
          lat: latitude,
          lng: longitude,
        },
        zoom: zoom,
        scrollWheelZoom: false
      });

      const layer = new TileLayer(
        'https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png',
        {
          attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
        },
      );

      instance.addLayer(layer);

      setMap(instance);
      isRenderedRef.current = true;
    } else {
      map?.setView(new LatLng(latitude, longitude), zoom, {
        animate: true,
        duration: 0.4
      });
    }

  }, [mapRef, latitude, longitude, zoom, map]);

  return map;
}

export default useMap;
