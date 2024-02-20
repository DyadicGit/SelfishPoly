import React, { FC, FormEventHandler, useEffect, useRef } from 'react';
import { useDispatchNewAction } from '../providers/GlobalStateProvider/hooks';
import s from './page.module.scss';
import classnames from 'classnames';
import { useGlobalState } from '../providers/GlobalStateProvider/GlobalStateProvider';
import { ErrorResponse } from '../providers/utils';

export const CreationPanel: FC = () => {
  const formRef = useRef<HTMLFormElement>(null);
  const textAreaRef = useRef<HTMLTextAreaElement>(null);

  const dispatchNewAction = useDispatchNewAction();
  const { error } = useGlobalState();
  const hasError = error instanceof ErrorResponse && error.data.message != null && error.data.culprit == null;

  useEffect(() => {
    if (hasError && textAreaRef.current && formRef.current) {
      textAreaRef.current.setCustomValidity(error.data.message);
      formRef.current.reportValidity();
    }
  }, [error, hasError]);

  const handleSubmit: FormEventHandler<HTMLFormElement> = (event) => {
    event.preventDefault();
    if (event.target instanceof HTMLFormElement) {
      const text = new FormData(event.target).get('text') as string;

      dispatchNewAction({ text }).finally(() =>
        setTimeout(() => textAreaRef.current && (event.target as HTMLFormElement).reportValidity() && (textAreaRef.current.value = ''), 0),
      );
    }
  };

  return (
    <form onSubmit={handleSubmit} name="create-form" className={classnames(s.editableRow, s.createForm)} ref={formRef}>
      <textarea
        name="text"
        id="text"
        rows={3}
        cols={50}
        minLength={10}
        required={true}
        onChange={(event) => event.target.setCustomValidity('')}
        placeholder="type in a new Poly note here..."
        ref={textAreaRef}
      ></textarea>
      <button type="submit">Create new note</button>
    </form>
  );
};
