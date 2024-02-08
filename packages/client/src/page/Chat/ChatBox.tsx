import React, { FormEventHandler, useRef } from "react";
import s from "./chat.module.scss";
import { useChat } from "./ChatProvider/ChatProvider";

export const ChatBox = () => {
  const textAreaRef = useRef<HTMLTextAreaElement>(null);
  const { messages, sendMessage } = useChat();

  const handleTextAreaSubmit: FormEventHandler<HTMLFormElement> = (event) => {
    event.preventDefault();

    if (event.target instanceof HTMLFormElement && textAreaRef.current) {
      const message = new FormData(event.target).get("message");

      if (typeof message === "string") {
        sendMessage(message);
        textAreaRef.current.value = "";
      }
    }
  };

  return (
    <aside className={s.chatBox}>
      <ol className={s.messageList}>
        {messages.map(({ message, received, sent }, index) => (
          <li
            key={index}
            className={s.message}
            ref={(li) => index === messages.length - 1 && li?.scrollIntoView()}
          >
            {message}
            <span>
              sent: {sent}
              {!!received && (
                <>
                  <br /> received: {received}
                </>
              )}
            </span>
          </li>
        ))}
      </ol>
      <form onSubmit={handleTextAreaSubmit} className={s.chatForm}>
        <textarea
          name="message"
          cols={30}
          rows={4}
          ref={textAreaRef}
          onKeyDown={(event) => {
            if (event.ctrlKey && event.key === "Enter") {
              event.preventDefault();
              (event.target as HTMLTextAreaElement).form?.requestSubmit();
            }
          }}
        ></textarea>
        <button>send</button>
      </form>
    </aside>
  );
};
