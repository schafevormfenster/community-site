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
  const widthStyle = `calc(${itemCount * 90}vw + ${itemCount}rem)`;
  if (itemCount < 1) return <></>;
  return (
    <div className="w-screen overflow-x-hidden lg:w-full">
      <div className="w-full overflow-x-scroll lg:overflow-auto">
        <div style={{ width: widthStyle }} className={`relative h-80 lg:h-auto lg:w-full`}>
          {children}
        </div>
      </div>
    </div>
  );
};

export default NewsArrangement;
