import { Organizer } from './Organizer';

/**
 * Calendar.
 */
export interface Calendar {
  _id: string;
  name: string;
  description?: string;
  organizer: Organizer;
  scope: 'Community' | 'Municipality' | 'Surrounding' | 'Region';
  publication_status: '0' | '1';
  display_mode: 'micro' | 'mini' | 'oneline' | 'default' | 'extended';
}
