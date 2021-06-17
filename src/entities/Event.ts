import { CommunityExcerpt } from './Community';

/**
 * Event item.
 */
export interface Event {
  _id: string;
  summary: string;
  description?: string;
  location: string;
  start?: Date;
  end?: Date;
  allday?: boolean;
  status?: 'confirmed' | 'cancelled';
  // metadata
  created?: Date;
  updated?: Date;
  // ids
  iCalUID?: string;
  //references
  community: CommunityExcerpt;
}

/*


        {
          title: "Description",
          name: "description",
          type: "string",
        },
        {
          title: "Start",
          name: "start",
          type: "datetime",
          options: {
            dateFormat: "DD.MM.YYYY",
            timeFormat: "HH:mm",
            timeStep: 15,
            calendarTodayLabel: "Today",
          },
          validation: (Rule) => Rule.required(),
        },
        {
          title: "Allday?",
          name: "allday",
          type: "boolean",
        },
        {
          title: "End",
          name: "end",
          type: "datetime",
          options: {
            dateFormat: "DD.MM.YYYY",
            timeFormat: "HH:mm",
            timeStep: 15,
            calendarTodayLabel: "Today",
          },
        },
        {
          title: "Cancelled?",
          name: "cancelled",
          type: "boolean",
        },
        {
          title: "Location",
          name: "location",
          type: "string",
        },
        {
          title: "Google Event Attachment",
          name: "googleeventattachment",
          type: "array",
          of: [{ type: "googleeventattachment" }],
        },
        {
          title: "Place",
          name: "place",
          type: "reference",
          weak: true,
          // to: [{ type: "place" },{ type: "community" }],
          to: [{ type: "place" }],
          description: "At which place does the event happen? Might be a village.",
        },
        {
          title: "Village",
          name: "community",
          type: "reference",
          weak: true,
          to: [{ type: "community" }],
          description: "To which village does that place belong to?",
        },
        {
          title: "Calendar",
          name: "calendar",
          type: "reference",
          weak: true,
          to: [{ type: "calendar" }],
          description: "To which calendar does the event belong to?",
        },
        {
          title: "Categories",
          name: "categories",
          type: "array",
          of: [{ type: "string" }],
          validation: (Rule) => Rule.unique(),
        },
        {
          title: "Google Event ID",
          name: "event_id",
          type: "string",
        },
      ],


      */
