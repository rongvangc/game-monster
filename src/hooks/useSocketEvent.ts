import { useEffect } from "react";
import useSocketIO from "./useSocketIO";

interface UseSocketEventProps {
  roomId?: string;
  eventName: string;
  callback: (...args: any[]) => void;
}

const useSocketEvent = ({
  roomId,
  eventName,
  callback,
}: UseSocketEventProps) => {
  const { isConnected, on, off } = useSocketIO();

  useEffect(() => {
    if (isConnected && roomId) {
      const handleEvent = (...args: any[]) => {
        callback(...args);
      };

      on(eventName, handleEvent);

      return () => {
        off(eventName, handleEvent);
      };
    }
  }, [isConnected, roomId, eventName, callback, on, off]);
};

export default useSocketEvent;
