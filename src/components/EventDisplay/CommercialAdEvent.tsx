import Image from 'next/image';
import Interweave, { Markup } from 'interweave';
import moment from 'moment';
import React, { FC } from 'react';
import { Event } from '../../entities/Event';
import {
  ClockIcon,
  SpeakerphoneIcon,
  PaperClipIcon,
  PresentationChartLineIcon,
} from '@heroicons/react/outline';
import { Event as EventJsonLd, WithContext } from 'schema-dts';
import Head from 'next/head';
import LocationDisplay from './Elements/LocationDisplay';
import { CloudConfig, Cloudinary, CloudinaryImage } from '@cloudinary/url-gen';
import { AdvancedImage } from '@cloudinary/react';

export interface CommercialAdEventProps {
  event: Event;
}

/**
 * Shows one event with all relevant data.
 */
const CommercialAdEvent: FC<CommercialAdEventProps> = ({ event }) => {
  if (!event) return <></>;

  // get target url from description
  const urlRegex = /(https?:\/\/[^ ]*)/;
  const targetUrl = event.description.match(urlRegex)[1];

  // plain text data
  const stripHtmlRegex = /<[^>]+>/g;

  const cld = new Cloudinary({
    cloud: {
      cloudName: process.env.NEXT_PUBLIC_COUNDINARY_CLOUD_NAME,
    },
  });

  const cloud = new CloudConfig({ cloudName: process.env.NEXT_PUBLIC_COUNDINARY_CLOUD_NAME });

  const image1 = new CloudinaryImage(event.attachment.url, cloud).setDeliveryType('fetch');

  const image2 = new CloudinaryImage(
    'googledrive/uc?export=view&id=13yRuI6FE8jELmktvo-Q8QYjb6XXnk8nA',
    cloud
  );

  const image3 = new CloudinaryImage(
    'https://upload.wikimedia.org/wikipedia/commons/thumb/d/da/Melkerschule_Schlatkow.jpg/800px-Melkerschule_Schlatkow.jpg',
    cloud
  ).setDeliveryType('fetch');

  const image4 = new CloudinaryImage(
    'wikimedia/wikipedia/commons/thumb/d/da/Melkerschule_Schlatkow.jpg/800px-Melkerschule_Schlatkow.jpg',
    cloud
  );

  const image5 = new CloudinaryImage(
    'https://doc-14-bs-docs.googleusercontent.com/docs/securesc/rcc41125177unde8ocpnma3b3pgqr2kb/nbvcvno1or7hr0uhh4rpmcakf51ttn3g/1646394525000/02046118595084422997/02046118595084422997/13yRuI6FE8jELmktvo-Q8QYjb6XXnk8nA?e=view&ax=ACxEAsZuDdjud_RsEXD05F5ErMRYgW61MGaJB5bgXBc-vDXTJSJeA-upGQyVBgi-_ulau1fl55aq44JId5hm-c6ME_Ykg8kSWZ0xx2mAiJDFII7pAvXbWRDikqxSjpwKFpG2AloBZ9cTeRDIia_1SaH8-yYdk91K4OCJ8IYsoC6O1m4XxJwWjTW5XxzMXggb6lw2QTdswVbP1mKAYqphXA2zMyf0f8wgajTW_7UhCoJiCZeyfBigpWec1uXKhguVXiZjGEXTtod9Dnv0vrcZTEUuv2w54703C0PldsB_CzLGHTpJqrNNwK4N9A0jcXgD6ilBwF8qM41bqn-8rpVkdumOb7dYk8ht8FMb4Y7ZFXclWh3mPqK-1kbg7wo2iO1o7VBnX73nbZ0pdh43Zut4Ut5wMi0MDmBA6vnyBJEqHrnC2miOCyL4GLD2FR84q_GV48ipBgqyvfvEyGpVRU7LFnZfI5n_lyNKxaJ9UsXoT295CNLU3laGbRevckeWH3dQ_VeLBVIxVqZjq0-q60Rc5GZZiPrSLTj5HCdiOJjjc3D6RlOxRHIe0guLKSb4YTMc1lxfMGQGKlliFsglQHVPG1IHnnXJlG5zPwVW3zdEBgvK7hSJdSzETCnZB13VtsuI-0PcbvclwY90_vA9_z2Q9xRcEgjJx9YzLMQx66stAs7E&authuser=0&nonce=hkbcroq2obtqe&user=02046118595084422997&hash=6i8lh60923dlmru5a6p3uq8jha6j7he5',
    cloud
  ).setDeliveryType('fetch');

  return (
    <div className="pb-2 pt-2 border-t border-solid border-gray-200 first:border-t-0">
      {event?.attachment?.type === 'image' && (
        <p className="mt-2 mb-2 text-gray-700 print:text-black leading-none print:hidden">
          <a
            href={targetUrl}
            target="_blank"
            // onMouseDown={"_etracker.sendEvent(new et_UserDefinedEvent('Links.html', 'Links', 'Click', 'Link'));"}
          >
            <AdvancedImage cldImg={image1} />
            <AdvancedImage cldImg={image2} />
            <AdvancedImage cldImg={image3} />
            <AdvancedImage cldImg={image4} />
            <AdvancedImage cldImg={image5} />
            <pre>{event.attachment.url}</pre>
            <Image
              src={event.attachment.url}
              alt={event.summary.replace(stripHtmlRegex, '')}
              title={event.description.replace(stripHtmlRegex, '')}
              width={1200}
              height={420}
              layout="responsive"
            />
          </a>
        </p>
      )}
      {event.calendar?.organizer?.name && (
        <p className="mt-2 mb-2 text-right text-sm text-gray-600 leading-none print:hidden">
          <SpeakerphoneIcon className="h-4 w-4 mb-0.5 inline-block mr-1 text-gray-500" />
          <Markup content={event.calendar?.organizer?.name} noWrap />
          <PresentationChartLineIcon className="h-4 w-4 mb-0.5 inline-block ml-2 mr-1 text-gray-500" />
          <span className="mr-1">Anzeige</span>
        </p>
      )}
    </div>
  );
};

export default CommercialAdEvent;
