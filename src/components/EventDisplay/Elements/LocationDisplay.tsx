import React, { FC } from 'react';
import { Event } from '../../../entities/Event';

export interface LocationDisplayProps {
  event: Event;
}

/**
 * Shows one event with all relevant data.
 */
const LocationDisplay: FC<LocationDisplayProps> = ({ event }) => {
  if (!event) return <></>;

  const placeName: string = event.place?.localname.replace(event.community.name, '').trim() || null;

  return (
    <span className="mr-2">
      {['surrounding'].includes(event.distance) && <></>}
      {['region'].includes(event.distance) && <></>}
      {placeName || event.community.name}
      {['municipality', 'surrounding', 'region'].includes(event.distance) && (
        <span> in {event.community.name}</span>
      )}
    </span>
  );
};

export default LocationDisplay;
