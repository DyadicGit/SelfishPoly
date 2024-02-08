export type KnownError = { message: string; culprit?: string };

export type Note = { id: string; text: string };

export type A<T, P> = { type: T; payload: P };

export type ChatAction =
  | A<"GREETINGS", Message>
  | A<"LOAD_HISTORY", Message[]>
  | A<"TO_CLIENT", Message>
  | A<"TO_SERVER", Message>;

export type Message = {
  message: string;
  time: string;
};
