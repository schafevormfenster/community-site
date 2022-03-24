import { FC, ReactNode } from 'react';
import { useIntl } from 'react-intl';

export interface CalendarMonthSectionProps {
  month: Date;
  children: ReactNode;
}

/**
 * Shows a section with a special sticky colored display of a month at the left side.
 */
const CalendarMonthSection: FC<CalendarMonthSectionProps> = ({ month, children }) => {
  console.time('CalendarMonthSection');
  const intl = useIntl();
  const render = (
    <section className="relative">
      <div className="absolute top-0 bottom-0 w-8 bg-secondary bg-gradient-to-b from-secondary to-secondaryDark print:bg-white print:from-transparent print:to-transparent">
        <div className="sticky top-0 w-8 pt-20 mb-8">
          <i className="inline-block py-1 pl-1 w-8 text-vertical text-right transform rotate-180 text-white text-sm not-italic print:hidden">
            {intl.formatDate(month, { month: 'long', year: 'numeric' })}
          </i>
        </div>
      </div>
      <div className="ml-8 print:ml-0">{children}</div>
    </section>
  );
  console.timeEnd('CalendarMonthSection');
  return render;
};

export default CalendarMonthSection;
