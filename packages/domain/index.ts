export type KnownError = { message: string; culprit?: string };

export type Note = { id: string; text: string };

export type A<T, P> = { type: T; payload: P };

export class Message {
  public message: string = "";
  public received: string = "";
  public sent: string = "";

  constructor(txt: string) {
    this.message = txt;
    this.sent = new Date().toISOString();
  }

  public toString() {
    return JSON.stringify({
      message: this.message,
      received: this.received,
      sent: this.sent,
    } as Message);
  }

  public static fromString(jsonParsable: Buffer | ArrayBuffer | Buffer[] | string): Message {
    let msg = { message: "", received: "", sent: "" } as Message;
    try {
      if (Buffer.isBuffer(jsonParsable)) {
        msg = JSON.parse(`${jsonParsable}`);
      }
      if (typeof jsonParsable === "string") {
        msg = JSON.parse(jsonParsable);
      }
    } catch (e) {
      console.error(e);
    }

    return msg;
  }
}

export type MessageT =  Message
