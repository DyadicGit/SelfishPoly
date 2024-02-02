import React, { FC, FormEventHandler } from "react";
import { useDispatchNewAction } from "../providers/hooks";
import s from "./components.module.scss";
import classnames from "classnames";

export const CreationPanel: FC = () => {
  const dispatchNewAction = useDispatchNewAction();
  const handleSubmit: FormEventHandler<HTMLFormElement> = (event) => {
    event.preventDefault();
    if (event.target instanceof HTMLFormElement) {
      const text = new FormData(event.target).get("text") as string;
      dispatchNewAction({ text });
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      name="create-form"
      className={classnames(s.editableRow, s.createForm)}
    >
      <textarea
        name="text"
        id="text"
        rows={3}
        cols={50}
        placeholder="type in a new Poly note here..."
      ></textarea>
      <button type="submit">Create new note</button>
    </form>
  );
};
