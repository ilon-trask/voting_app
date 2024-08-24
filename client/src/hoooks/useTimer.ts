import { socket } from "@/lib/socket";
import { useEffect, useState } from "react";
import { counterLabel } from "../../../consts";

export function useTimer() {
  const [timer, setTimer] = useState(0);

  useEffect(() => {
    function onCounter(counter: number) {
      setTimer(counter);
    }

    socket.on(counterLabel, onCounter);

    return () => {
      socket.off(counterLabel, onCounter);
    };
  }, []);
  return [timer, setTimer] as const;
}
