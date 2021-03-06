import { OrganizerDTO, OrganizerDTOteaserQueryFields } from './OrganizerDTO';

/**
 * Calendar.
 */
export interface CalendarDTO {
  _id: string;
  name: string;
  description?: string;
  calendar_id?: string;
  organizer?: OrganizerDTO;
  scope?: '0' | '1' | '2' | '3';
  publication_status?: '0' | '1';
  display_mode?: '0' | '1' | '2' | '3' | '4' | '5' | '6';
  time_display_mode?: '0' | '1' | '2';
}

export const CalendarDTOcoreQueryFields = '_id, name';

export const CalendarDTOteaserQueryFields = `${CalendarDTOcoreQueryFields}, scope, display_mode, time_display_mode, organizer->{ ${OrganizerDTOteaserQueryFields} }`;

export const CalendarDTOdetailQueryFields = `${CalendarDTOteaserQueryFields}`;
