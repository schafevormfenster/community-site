import { Organizer } from './Organizer';

/**
 * Calendar.
 */

export type CalendarDisplayMode = 'micro' | 'mini' | 'oneline' | 'default' | 'extended';

export enum CalendarDisplayModeEnum {
  MICRO = 'micro',
  MINI = 'mini',
  ONELINE = 'oneline',
  DEFAULT = 'default',
  EXTENDED = 'extended',
}

export interface Calendar {
  _id: string;
  name: string;
  description?: string;
  organizer?: Organizer;
  scope?: 'Community' | 'Municipality' | 'Surrounding' | 'Region';
  publication_status?: '0' | '1';
  display_mode?: CalendarDisplayMode;
}
