"use client";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { OptionsDataType } from "../../../types";
import { socket } from "@/lib/socket";
import { getDataLabel, giveDataLabel } from "../../../consts";

export function useGetData(
  votingId: string,
  data: OptionsDataType[],
  setAuthorId: Dispatch<SetStateAction<string>>
) {
  const [error, setError] = useState("");
  useEffect(() => {
    function onGetData({
      roomId,
      authorId,
    }: {
      roomId: string;
      authorId: string | undefined;
    }) {
      if (roomId === votingId) {
        if (!authorId) {
          setError("no such voting");
          throw new Error("no such voting");
        }

        setAuthorId(authorId);
        if (data.length != 0) {
          socket.emit(giveDataLabel, { roomId, data: data });
        }
      }
    }

    socket.on(getDataLabel, onGetData);

    return () => {
      socket.off(getDataLabel, onGetData);
    };
  }, [data]);
  return error;
}
