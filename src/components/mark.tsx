import React from 'react';

/**
 * a function to highlight keyword in name
 * @param name
 * @param keyword
 * @constructor
 */
export const Mark = ({name, keyword}: { name: string; keyword: string }) => {
  if (!keyword) {
    return <>{name}</>;
  }
  const arr = name.split(keyword);
  return (
    <>
      {arr.map((str, index) => (
        <span key={index}>
          {str}
          {index === arr.length - 1 ? null : (
            <span style={{color: '#257AFD'}}>{keyword}</span>
          )}
        </span>
      ))}
    </>
  );
};