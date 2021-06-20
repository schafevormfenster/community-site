import { Organizer } from './Organizer';

/**
 * Calendar.
 */
export interface Calendar {
  _id: string;
  name: string;
  description?: string;
  organizer: Organizer;
  scope: '0' | '1' | '2' | '3';
  publication_status: '0' | '1';
  display_mode: '0' | '1' | '2' | '3' | '4';
}
