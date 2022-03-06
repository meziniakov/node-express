import React, { useEffect, useState } from 'react';

export const DomainPage = ({ domains }) => {
  const alldomains = domains.map((el, index) => {
    return (
      <ul key={index}>
        <li>{el.domain}</li>
        <li>{el.traffic}</li>
      </ul>
    );
  });

  return (
    <div className="container">
      <h1>DomainPage</h1>
      {alldomains}
    </div>
  );
};
