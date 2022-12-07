import Link from 'next/link';
import { FC } from 'react';
import { CameraIcon, QuestionMarkCircleIcon } from '@heroicons/react/outline';
import { Markup } from 'interweave';

export interface IncidentProps {
  message: string;
}

/**
 * Show a community photo.
 */
const Incident: FC<IncidentProps> = ({ message }) => {
  return (
    <div className="absolute content-center block px-8 py-4 m-8 bg-black border-2 border-red-600 rounded-lg top-12">
      <p className="text-white">
        <Markup content={message} />
      </p>
    </div>
  );
};

export default Incident;
