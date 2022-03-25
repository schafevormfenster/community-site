import { Organizer } from './Organizer';

/**
 * Calendar.
 */
export enum CalendarDisplayMode {
  MICRO = 'micro',
  MINI = 'mini',
  ONELINE = 'oneline',
  ONELINECOMBINED = 'onelinecombined',
  DEFAULT = 'default',
  EXTENDED = 'extended',
  AD = 'commercialad',
}

export enum CalendarTimeDisplayMode {
  NoTime = 0,
  StartTimeOnly = 1,
  StartAndEndTime = 2,
}

export interface Calendar {
  _id?: string;
  name: string;
  description?: string;
  organizer?: Organizer;
  scope?: 'Community' | 'Municipality' | 'Surrounding' | 'Region';
  publication_status?: '0' | '1';
  display_mode?: CalendarDisplayMode;
  time_display_mode?: CalendarTimeDisplayMode;
}
