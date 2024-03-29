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

  let tempDay: Date = new Date(eventDto.start);
  tempDay.setHours(0, 0, 0, 0);

  let event: Event = {
    _id: eventDto._id,
    summary: eventDto.name,
    description: eventDto?.description || null,
    start: eventDto?.start || null,
    startDay: eventDto?.start?.substring(0, 10) || null,
    end: eventDto?.end || null,
    allday: eventDto?.allday ? eventDto.allday : false,
    location: eventDto.location ? eventDto.location : null,
    placeName: eventDto.placeName ? eventDto.placeName : null,
    placeLocalName: eventDto.placeLocalName ? eventDto.placeLocalName : null,
    geopoint:
      eventDto?.geolocation?.lat && eventDto?.geolocation?.lng ? eventDto.geolocation : null,
    community: communityExcerptByDTO(eventDto.community),
  };

  if (eventDto.calendar) {
    event.calendar = {
      // _id: eventDto.calendar._id,
      name: eventDto.calendar.name,
      display_mode: displayMode(
        eventDto?.calendar?.display_mode ? eventDto.calendar.display_mode : undefined
      ),
      time_display_mode: timeDisplayMode(
        eventDto?.calendar?.time_display_mode ? eventDto.calendar.time_display_mode : undefined
      ),
      organizer: {
        // _id: eventDto?.calendar?.organizer ? eventDto.calendar?.organizer._id : null,
        name: eventDto?.calendar?.organizer?.longname
          ? eventDto.calendar?.organizer.longname
          : eventDto.calendar?.organizer.name,
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
