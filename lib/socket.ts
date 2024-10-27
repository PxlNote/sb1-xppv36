import { io, Socket } from 'socket.io-client';

let socket: Socket;

export const initSocket = () => {
  socket = io('http://localhost:3001');
  return socket;
};

export const getSocket = () => {
  if (!socket) {
    return initSocket();
  }
  return socket;
};