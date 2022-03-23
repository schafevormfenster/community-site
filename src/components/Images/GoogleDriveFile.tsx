import { PaperClipIcon } from '@heroicons/react/outline';
import { Markup } from 'interweave';
import React, { FC } from 'react';

interface GoogleDriveFileProps {
  fileId: string;
  fileExt: string;
  fileName?: string;
}

// plain text data
export const stripHtmlRegex = /<[^>]+>/g;

/**
 * Renders a google drive image passed through api gateway and delivered by cloudinary.
 */
const GoogleDriveFile: FC<GoogleDriveFileProps> = ({ fileId, fileExt, fileName = '' }) => {
  const baseUrl: string = `https://res.cloudinary.com/${process.env.NEXT_PUBLIC_COUNDINARY_CLOUD_NAME}/image/upload/`;
  const googleDriveImageId: string = `${process.env.NEXT_PUBLIC_COUNDINARY_UPLOAD_GOOGLEDRIVE}/${fileId}.${fileExt}`;
  const fileUrl: string = baseUrl + googleDriveImageId;
  return (
    <a href={fileUrl} target="_blank" download>
      <PaperClipIcon className="h-4 w-4 mb-0.5 inline-block mr-1 text-secondary" />
      <Markup content={fileName} noWrap />
    </a>
  );
};

export default GoogleDriveFile;
