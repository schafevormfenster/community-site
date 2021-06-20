import { MunicipalityDTOteaserQueryFields } from './MunicipalityDTO';
import { OrganizerDTO } from './OrganizerDTO';

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
  display_mode?: '0' | '1' | '2' | '3' | '4';
}

export const CalendarDTOcoreQueryFields = '_id, name';

export const CalendarDTOteaserQueryFields = `${CalendarDTOcoreQueryFields}`;

export const CalendarDTOdetailQueryFields = `${CalendarDTOteaserQueryFields}`;
