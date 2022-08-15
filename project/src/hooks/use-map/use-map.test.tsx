import {renderHook} from '@testing-library/react';
import useMap from './use-map';
import {MutableRefObject} from 'react';
import {makeFakeOffer} from '../../utils/mock';
import {Map} from 'leaflet';

const {city: {location}} = makeFakeOffer();
const center = {lat: location.latitude, lng: location.longitude};

jest.mock('leaflet');

describe('Hook: UseMap', () => {
  it('should return a map instanse with a set center location', () => {

    const ref = {
      current: {}
    } as MutableRefObject<HTMLElement>;

    const {result} = renderHook(() => useMap(ref, location));

    expect(result.current).toBeInstanceOf(Map);
    expect(result.current?.setView).toBeCalledWith(
      center,
      location.zoom,
      {
        animate: true,
        duration: 0.4
      }
    );
  });
});
