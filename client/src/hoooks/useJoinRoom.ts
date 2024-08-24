import { socket } from "@/lib/socket";
import { useEffect } from "react";
import { joinRoomLabel } from "../../../consts";

export function useJoinRoom(votingId: string) {
  useEffect(() => {
    socket.emit(joinRoomLabel, votingId);
  }, []);
}
