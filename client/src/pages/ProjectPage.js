import React, { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';

export const ProjectPage = () => {
  const auth = useContext(AuthContext);
  return (
    <div>
      <h1>ProjectPage</h1>
    </div>
  );
};
