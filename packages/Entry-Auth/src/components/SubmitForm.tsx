import React from 'react';

export const SubmitForm = ({ children }: { children: React.ReactNode }) => {
  return <form onSubmit={(e) => e.preventDefault()}>{children}</form>;
};
