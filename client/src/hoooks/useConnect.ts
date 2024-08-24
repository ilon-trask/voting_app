import { socket } from "@/lib/socket";
import { useEffect, useState } from "react";
import { connectLabel, disconnectLabel } from "../../../consts";

export function useConnect() {
  const [isConnected, setIsConnected] = useState(false);
  const [transport, setTransport] = useState("N/A");
  useEffect(() => {
    if (socket.connected) onConnect();

    function onConnect() {
      setIsConnected(true);
      setTransport(socket.io.engine.transport.name);

      socket.io.engine.on("upgrade", (transport) => {
        setTransport(transport.name);
      });
    }

    function onDisconnect() {
      setIsConnected(false);
      setTransport("N/A");
    }

    socket.on(connectLabel, onConnect);
    socket.on(disconnectLabel, onDisconnect);

    return () => {
      socket.off(connectLabel, onConnect);
      socket.off(disconnectLabel, onDisconnect);
    };
  }, []);

  return [isConnected, transport];
}
