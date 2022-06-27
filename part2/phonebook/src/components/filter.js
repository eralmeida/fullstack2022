import React from 'react';

const Filter = ({ searchTerm, handler }) => {
  return (
    <div>
      Filter <input value={searchTerm} onChange={handler}></input>
    </div>
  );
};

export default Filter;
