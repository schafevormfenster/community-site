import React, { FC } from 'react';
import { Event } from '../../../entities/Event';
import { LocationMarkerIcon, RssIcon } from '@heroicons/react/outline';

export interface LocationDisplayProps {
  event: Event;
}

/**
 * Shows one event with all relevant data.
 */
const LocationDisplay: FC<LocationDisplayProps> = ({ event }) => {
  if (!event) return <></>;

  const placeName: string = event.placeLocalName || event.placeName || event.community.name;

  return (
    <span className="mr-2">
      <LocationMarkerIcon className="h-4 w-4 mb-0.5 inline-block mr-1 text-secondary print:text-black" />
      {['surrounding'].includes(event.distance) && (
        <>
          <RssIcon className="h-4 w-4 mb-0.5 inline-block mr-1 text-secondary print:text-black" />
        </>
      )}
      {['region'].includes(event.distance) && (
        <>
          <RssIcon className="transform -rotate-90 h-4 w-4 mb-0.5 inline-block -mr-2 text-red-700 print:text-black" />
          <RssIcon className="h-4 w-4 mb-0.5 inline-block mr-1 text-red-700 print:text-black" />
        </>
      )}
      {placeName || event.community.name}
      {['municipality', 'surrounding', 'region'].includes(event.distance) && (
        <span> in {event.community.name}</span>
      )}
    </span>
  );
};

export default LocationDisplay;
