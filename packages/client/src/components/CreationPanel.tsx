import React, { FC, FormEventHandler, useRef } from "react";
import { useDispatchNewAction } from "../providers/hooks";
import s from "./components.module.scss";
import classnames from "classnames";

export const CreationPanel: FC = () => {
  const textAreaRef = useRef<HTMLTextAreaElement>(null);
  const dispatchNewAction = useDispatchNewAction();
  const handleSubmit: FormEventHandler<HTMLFormElement> = (event) => {
    event.preventDefault();
    if (event.target instanceof HTMLFormElement) {
      const text = new FormData(event.target).get("text") as string;
      dispatchNewAction({ text }).finally(
        () => textAreaRef.current && (textAreaRef.current.value = "")
      );
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
        minLength={10}
        placeholder="type in a new Poly note here..."
        ref={textAreaRef}
      ></textarea>
      <button type="submit">Create new note</button>
    </form>
  );
};
