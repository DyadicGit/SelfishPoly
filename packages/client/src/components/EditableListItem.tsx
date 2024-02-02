import React, { FC, FormEventHandler, useState } from "react";
import { Note } from "@poly/domain";
import { useDispatch } from "../providers/GlobalStateProvider";
import { apiDeleteNote } from "../providers/api-functions";
import {
  useDispatchDeleteAction,
  useDispatchEditAction,
} from "../providers/hooks";
import s from "./components.module.scss";

export const EditableListItem: FC<Note> = ({ id, text: initText }) => {
  const [isEditMode, setEditMode] = useState(false);
  const dispatch = useDispatch();
  const dispatchEditAction = useDispatchEditAction();
  const dispatchDeleteAction = useDispatchDeleteAction();

  const handleSubmit: FormEventHandler<HTMLFormElement> = (event) => {
    event.preventDefault();
    if (event.target instanceof HTMLFormElement) {
      const formText = new FormData(event.target).get("text") as string;
      const formId = new FormData(event.target).get("id") as string;

      dispatchEditAction({ id: formId, text: formText }).finally(() =>
        setEditMode(false)
      );
    } else {
      dispatch({ type: "ERR_EDIT" });
    }
  };

  return (
    <li className={s.listItem}>
      <form className={s.editableRow} onSubmit={handleSubmit} name={id}>
        <textarea
          name="text"
          cols={50}
          readOnly={!isEditMode}
          defaultValue={initText}
          minLength={6}
          required={true}
        ></textarea>
        <input hidden={true} name="id" readOnly={true} value={id} />
        <input
          type={"button"}
          value={isEditMode ? "View" : "Edit"}
          onClick={() => setEditMode(!isEditMode)}
        />
        <input type="submit" value="Submit" disabled={!isEditMode} />
        <input
          type="button"
          value="Delete"
          disabled={isEditMode}
          onClick={() => dispatchDeleteAction(id)}
        />
      </form>
    </li>
  );
};
