import { useState, useEffect } from "react";
import { io, Socket } from "socket.io-client";

interface SocketIOHook {
  socket: Socket | null;
  isConnected: boolean;
  emit: (eventName: string, data?: any) => void;
  on: (eventName: string, callback: (...args: any[]) => void) => void;
  off: (eventName: string, callback?: (...args: any[]) => void) => void;
}

const useSocketIO = (): SocketIOHook => {
  const [socket, setSocket] = useState<Socket | null>(null);
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    const newSocket = io(process.env.NEXT_PUBLIC_IO!, {
      transports: ["websocket"],
    });

    newSocket.on("connect", () => {
      console.log("Connected to Socket.IO server");
      setIsConnected(true);
    });

    newSocket.on("disconnect", () => {
      console.log("Disconnected from Socket.IO server");
      setIsConnected(false);
    });

    setSocket(newSocket);

    return () => {
      newSocket.disconnect();
    };
  }, []);

  const emit = (eventName: string, data?: any) => {
    if (socket && isConnected) {
      socket.emit(eventName, data);
    }
  };

  const on = (eventName: string, callback: (...args: any[]) => void) => {
    if (socket && isConnected) {
      socket.on(eventName, callback);
    }
  };

  const off = (eventName: string, callback?: (...args: any[]) => void) => {
    if (socket && isConnected) {
      socket.off(eventName, callback);
    }
  };

  return { socket, isConnected, emit, on, off };
};

export default useSocketIO;
