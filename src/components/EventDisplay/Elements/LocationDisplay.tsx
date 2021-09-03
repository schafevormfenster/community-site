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

  return (
    <span className="mr-2">
      <LocationMarkerIcon className="h-4 w-4 mb-0.5 inline-block mr-1 text-secondary" />
      {['surrounding', 'region'].includes(event.distance) && (
        <RssIcon className="h-4 w-4 mb-0.5 inline-block mr-1 text-secondary" />
      )}
      {event.place?.localname || event.community.name}
      {['municipality', 'surrounding', 'region'].includes(event.distance) && (
        <span> in {event.community.name}</span>
      )}
    </span>
  );
};

export default LocationDisplay;
