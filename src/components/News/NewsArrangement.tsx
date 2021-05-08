import React, { FC, ReactNode } from 'react';

export interface NewsArrangementProps {
  /**
   * Anzuordnende Elemente.
   */
  children: ReactNode;
}

/**
 */
const NewsArrangement: FC<NewsArrangementProps> = ({ children }) => {
  if (!children) return <></>;
  const itemCount = React.Children.toArray(children).length;
  if (itemCount < 1) return <></>;
  return (
    <div className="overflow-x-scroll md:overflow-auto">
      <div
        className={`h-80 md:h-auto grid grid-cols-${itemCount} md:grid-cols-1 xl:grid-cols-2 gap-4 w-${itemCount}/1 md:w-full`}
      >
        {children}
      </div>
    </div>
  );
};

export default NewsArrangement;
