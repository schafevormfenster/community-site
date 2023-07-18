import React, { FC } from 'react';

interface GoogleDriveImageProps {
  fileId: string;
  fileExt: string;
  alt: string;
  title?: string;
}

// plain text data
export const stripHtmlRegex = /<[^>]+>/g;

/**
 * Renders a google drive image passed through api gateway and delivered by cloudinary.
 */
const GoogleDriveImage: FC<GoogleDriveImageProps> = ({ fileId, fileExt, alt = '', title = '' }) => {
  const baseUrl: string = `https://res.cloudinary.com/${process.env.NEXT_PUBLIC_COUNDINARY_CLOUD_NAME}/image/upload/`;
  const tranformation: string = 'c_scale,w_800/';
  const googleDriveImageId: string = `${process.env.NEXT_PUBLIC_COUNDINARY_UPLOAD_GOOGLEDRIVE}/${fileId}`;
  const imageFormat: string = 'webp';
  const imageUrl: string = baseUrl + tranformation + googleDriveImageId + '.' + imageFormat;
  return (
    <img
      className="w-full h-auto"
      src={imageUrl}
      alt={(alt || '').replace(stripHtmlRegex, '').substring(0, 50)}
      title={
        title
          ? title.replace(stripHtmlRegex, '').substring(0, 120)
          : (alt || '').replace(stripHtmlRegex, '').substring(0, 50)
      }
    />
  );
};

export default GoogleDriveImage;
