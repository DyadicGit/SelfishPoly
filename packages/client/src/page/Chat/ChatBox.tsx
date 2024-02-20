import React, { FormEventHandler, useEffect, useRef } from 'react';
import s from './chat.module.scss';
import { useChat } from '../../providers/ChatProvider/ChatProvider';

export const ChatBox = () => {
  const textAreaRef = useRef<HTMLTextAreaElement>(null);
  const { messages, sendMessage } = useChat();

  const handleTextAreaSubmit: FormEventHandler<HTMLFormElement> = (event) => {
    event.preventDefault();

    if (event.target instanceof HTMLFormElement && textAreaRef.current) {
      const message = new FormData(event.target).get('message');

      if (typeof message === 'string' && !!message.trim()) {
        sendMessage(message);
        textAreaRef.current.value = '';
      }
    }
  };
  const lastMessageRef = useRef<HTMLLIElement>(null);
  useEffect(() => {
    lastMessageRef.current?.scrollIntoView();
  }, [messages]);

  return (
    <aside className={s.chatBox}>
      <ol className={s.messageList}>
        {messages.map(({ message, time }, index) => {
          const date = new Date(time);
          return (
            <li key={index} className={s.message} ref={lastMessageRef}>
              {message}
              <span>
                {date.toLocaleString()} {date.getMilliseconds()}ms
              </span>
            </li>
          );
        })}
      </ol>
      <form onSubmit={handleTextAreaSubmit} className={s.chatForm}>
        <textarea
          name="message"
          cols={30}
          rows={4}
          ref={textAreaRef}
          onKeyDown={(event) => {
            if (event.ctrlKey && event.key === 'Enter') {
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
