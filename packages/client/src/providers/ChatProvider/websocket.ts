import { dispatchPongHandshakeAction, dispatchIncomingAction, dispatchLoadHistoryAction, dispatchPingHandshakeAction } from './actions';
import { ChatAction } from '@poly/domain';
import { SERVER_PORT } from '../host';

function initializeClientID() {
  if (!document.cookie.includes('clientUID')) {
    const clientUID = window.crypto.randomUUID();
    sessionStorage.setItem('clientUID', clientUID);
    document.cookie = `clientUID=${clientUID}; SameSite=None; Secure`;
  }
}

initializeClientID();
const HOST = `ws://localhost:${SERVER_PORT}`;
export const socket = new WebSocket(HOST);

function incomingActionsOrchestrator(actionFromServer: ChatAction) {
  switch (actionFromServer.type) {
    case 'GREETINGS':
      return dispatchPongHandshakeAction(actionFromServer.payload);
    case 'LOAD_HISTORY':
      return dispatchLoadHistoryAction(actionFromServer.payload);
    case 'TO_CLIENT':
      return dispatchIncomingAction(actionFromServer.payload);
    case 'TO_SERVER':
      return /*not possible*/;
  }
}

socket.addEventListener('open', (event) => {
  console.log('Connection established', event);
  socket.send(JSON.stringify(dispatchPingHandshakeAction("Hello Poly, I'm client.")));
});
socket.addEventListener('message', (event) => {
  const actionFromServer: ChatAction = JSON.parse(event.data);
  console.log('Message from server ', actionFromServer);
  incomingActionsOrchestrator(actionFromServer);
});
socket.addEventListener('close', (event) => {
  console.log('Connection closed!', event);
});
socket.addEventListener('error', (event) => {
  console.log('WS Ups!', event);
});
