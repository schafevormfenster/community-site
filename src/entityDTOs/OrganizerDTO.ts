/**
 * Organizer.
 */
export interface OrganizerDTO {
  _id: string;
  name: string;
  longname?: string;
}

export const OrganizerDTOcoreQueryFields = '_id, name, longname';

export const OrganizerDTOteaserQueryFields = `${OrganizerDTOcoreQueryFields}`;

export const OrganizerDTOdetailQueryFields = `${OrganizerDTOteaserQueryFields}`;
