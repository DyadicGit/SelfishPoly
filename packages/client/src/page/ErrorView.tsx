import React from 'react';
import { useGlobalState } from '../providers/GlobalStateProvider/GlobalStateProvider';
import { ErrorResponse } from '../providers/utils';

export const ErrorView = () => {
  const { error } = useGlobalState();

  return (
    <main>
      <h1>Something went wrong!</h1>
      {typeof error === 'string' && <code>{error}</code>}
      {error instanceof ErrorResponse && <code>{error.data.message}</code>}
    </main>
  );
};
