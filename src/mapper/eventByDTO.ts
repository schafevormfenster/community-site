import { CalendarDisplayMode, CalendarTimeDisplayMode } from '../entities/Calendar';
import { Event } from '../entities/Event';
import { EventDTO } from '../entityDTOs/EventDTO';
import { communityExcerptByDTO } from './communityByDTO';

const imageMimeTypes = [
  'image/jpg',
  'image/jpeg',
  'image/png',
  'image/gif',
  'image/svg',
  'image/webp',
  'image/tif',
  'image/tiff',
];

const googleImageBaseUrl = 'https://drive.google.com/uc?export=view&id=';
const googleDownloadBaseUrl = 'https://drive.google.com/uc?export=download&id=';

export const eventByDTO = (eventDto: EventDTO): Event => {
  if (!eventDto) return undefined;

  const displayMode = (display_mode: string | undefined): CalendarDisplayMode => {
    switch (eventDto?.calendar?.display_mode) {
      case '0':
        return CalendarDisplayMode.MICRO;
      case '1':
        return CalendarDisplayMode.MINI;
      case '2':
        return CalendarDisplayMode.DEFAULT;
      case '3':
        return CalendarDisplayMode.EXTENDED;
      case '4':
        return CalendarDisplayMode.ONELINE;
      case '5':
        return CalendarDisplayMode.ONELINECOMBINED;
      case '6':
        return CalendarDisplayMode.AD;
      default:
        return CalendarDisplayMode.DEFAULT;
    }
  };

  const timeDisplayMode = (display_mode: string | undefined): CalendarTimeDisplayMode => {
    switch (eventDto?.calendar?.time_display_mode) {
      case '0':
        return CalendarTimeDisplayMode.NoTime;
      case '1':
        return CalendarTimeDisplayMode.StartTimeOnly;
      case '2':
        return CalendarTimeDisplayMode.StartAndEndTime;
      default:
        return CalendarTimeDisplayMode.StartAndEndTime;
    }
  };

  const eventStartDate = new Date(eventDto?.start);
  const eventStartDay = new Date(
    eventStartDate.getFullYear(),
    eventStartDate.getMonth(),
    eventStartDate.getDate()
  );

  const eventEndDate = new Date(eventDto?.end);
  const eventEndDay = new Date(
    eventEndDate.getFullYear(),
    eventEndDate.getMonth(),
    eventEndDate.getDate()
  );
  let event: Event = {
    _id: eventDto._id,
    summary: eventDto.name,
    description: eventDto.description ? eventDto.description : null,
    start: eventStartDate.toISOString() || null,
    startDate: null,
    startDay: eventStartDay.toISOString() || null,
    end: eventEndDate.toISOString() || null,
    endDate: null,
    endDay: eventEndDay.toISOString() || null,
    allday: eventDto?.allday ? eventDto.allday : false,
    location: eventDto.location ? eventDto.location : null,
    community: communityExcerptByDTO(eventDto.community),
  };

  if (eventDto.calendar) {
    event.calendar = {
      _id: eventDto.calendar._id,
      name: eventDto.calendar.name,
      display_mode: displayMode(
        eventDto?.calendar?.display_mode ? eventDto.calendar.display_mode : undefined
      ),
      time_display_mode: timeDisplayMode(
        eventDto?.calendar?.time_display_mode ? eventDto.calendar.time_display_mode : undefined
      ),
      organizer: {
        _id: eventDto?.calendar?.organizer ? eventDto.calendar?.organizer._id : null,
        name: eventDto?.calendar?.organizer ? eventDto.calendar?.organizer.name : null,
        longname: eventDto?.calendar?.organizer?.longname
          ? eventDto.calendar?.organizer.longname
          : eventDto.calendar?.organizer.name,
      },
    };
  }

  if (eventDto.place) {
    event.place = {
      _id: eventDto?.place ? eventDto.place._id : null,
      name: eventDto?.place ? eventDto.place.name : null,
      localname: eventDto?.place?.localname ? eventDto.place.localname : eventDto.place.name,
      geoLocation: {
        identifiers: {
          geonamesId: null,
          googlePlaceId: eventDto?.place?.place_id ? eventDto.place.place_id : null,
        },
        address: { address: eventDto?.place?.address ? eventDto.place.address : null },
        point: {
          lat: eventDto?.place?.geolocation?.lat ? eventDto.place.geolocation.lat : null,
          lng: eventDto?.place?.geolocation?.lng ? eventDto.place.geolocation.lng : null,
        },
      },
    };
  }

  if (eventDto.googleeventattachment && eventDto.googleeventattachment[0]) {
    event.attachment = {
      fileUrl: eventDto?.googleeventattachment[0]?.fileUrl
        ? eventDto.googleeventattachment[0].fileUrl
        : null,
      mimeType: eventDto?.googleeventattachment[0]?.mimeType
        ? eventDto.googleeventattachment[0].mimeType
        : null,
      title: eventDto?.googleeventattachment[0]?.title
        ? eventDto.googleeventattachment[0].title
        : null,

      fileId: eventDto?.googleeventattachment[0]?.fileId
        ? eventDto.googleeventattachment[0].fileId
        : null,

      fileExt: eventDto?.googleeventattachment[0]?.fileExt
        ? eventDto.googleeventattachment[0].fileExt
        : null,

      type: imageMimeTypes.includes(eventDto.googleeventattachment[0].mimeType)
        ? 'image'
        : 'download',
    };
    if (event.attachment.type === 'image') {
      event.attachment.url = googleImageBaseUrl + event.attachment.fileId;
    }
    if (event.attachment.type === 'download') {
      event.attachment.url = googleDownloadBaseUrl + event.attachment.fileId;
    }
  }

  return event;
};

/*
  description?: string;
  organizer: Organizer;
  scope: 'Community' | 'Municipality' | 'Surrounding' | 'Region';
  publication_status: '0' | '1';
  display_mode: 'micro' | 'mini' | 'oneline' | 'default' | 'extended';



          _id: string;
  name: string;
  description?: string;
  start?: string;
  end?: string;
  allday?: boolean;
  cancelled?: boolean;
  location?: string;
  googleeventattachment?: string[]; // TODO:
  place?: PlaceDTO;
  community?: CommunityDTO;
  calendar?: CalendarDTO;
  categories?: string[];
      event_id?: string;



      */
