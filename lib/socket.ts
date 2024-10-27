// lib/socket.ts
import { io, Socket } from 'socket.io-client';

let socket: Socket;

export const initSocket = () => {
  const SOCKET_URL = process.env.NEXT_PUBLIC_SOCKET_URL || 'http://localhost:3001';
  socket = io(SOCKET_URL);
  return socket;
};

export const getSocket = () => {
  if (!socket) {
    return initSocket();
  }
  return socket;
};
