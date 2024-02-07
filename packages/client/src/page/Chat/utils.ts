import { Message } from "@poly/domain";

/** # importing a class in .ts file causes error in Create-React-App
 * @link https://stackoverflow.com/questions/68848100/typescript-classes-exports-and-imports-not-working-properly-inside-a-react-app
 * */
export const toMessage = (txt: string): Message => ({
    message: txt,
    received: "",
    sent: new Date().toISOString(),
    toString(): string {
        return JSON.stringify({
            message: txt,
            received: "",
            sent: new Date().toISOString(),
        });
    },
});
