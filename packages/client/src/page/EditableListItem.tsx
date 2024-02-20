import React, { FC, FormEventHandler, useEffect, useRef, useState } from 'react';
import { Note } from '@poly/domain';
import { useDispatch, useGlobalState } from '../providers/GlobalStateProvider/GlobalStateProvider';
import { useDispatchDeleteAction, useDispatchEditAction } from '../providers/GlobalStateProvider/hooks';
import s from './page.module.scss';
import { ErrorResponse } from '../providers/utils';

export const EditableListItem: FC<Note> = ({ id, text: initText }) => {
  const [isEditMode, setEditMode] = useState(false);
  const dispatch = useDispatch();
  const { error } = useGlobalState();
  const dispatchEditAction = useDispatchEditAction();
  const dispatchDeleteAction = useDispatchDeleteAction();
  const formRef = useRef<HTMLFormElement>(null);
  const textAreaRef = useRef<HTMLTextAreaElement>(null);
  const hasError = error instanceof ErrorResponse && error.data.culprit === id;

  useEffect(() => {
    if (hasError && textAreaRef.current && formRef.current) {
      textAreaRef.current.setCustomValidity(error.data.message);
      formRef.current?.reportValidity();
    }
  }, [error, hasError]);

  const handleSubmit: FormEventHandler<HTMLFormElement> = (event) => {
    event.preventDefault();
    if (event.target instanceof HTMLFormElement) {
      const formText = new FormData(event.target).get('text') as string;
      const formId = new FormData(event.target).get('id') as string;

      const switchToViewMode = () => setTimeout(() => setEditMode(!(event.target as HTMLFormElement).reportValidity()), 0);
      dispatchEditAction({ id: formId, text: formText }).finally(switchToViewMode);
    } else {
      dispatch({ type: 'ERR_EDIT' });
    }
  };

  return (
    <li className={s.listItem} data-id={id}>
      <form className={s.editableRow} onSubmit={handleSubmit} name={id} ref={formRef}>
        <textarea
          name="text"
          cols={50}
          readOnly={!isEditMode}
          defaultValue={initText}
          minLength={6}
          required={true}
          onChange={(event) => event.target.setCustomValidity('')}
          ref={textAreaRef}
        ></textarea>
        <input hidden={true} name="id" readOnly={true} value={id} />
        <input type={'button'} value={isEditMode ? 'View' : 'Edit'} onClick={() => setEditMode(!isEditMode)} disabled={isEditMode && hasError} />
        <input type="submit" value="Submit" disabled={!isEditMode} />
        <input type="button" value="Delete" disabled={isEditMode} onClick={() => dispatchDeleteAction(id)} />
      </form>
    </li>
  );
};
