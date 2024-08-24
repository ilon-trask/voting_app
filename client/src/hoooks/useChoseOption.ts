import { Dispatch, SetStateAction, useEffect } from "react";
import { OptionsDataType, SendVoteType } from "../../../types";
import { socket } from "@/lib/socket";
import { choseLabel } from "../../../consts";

export function useChoseOption(
  timer: number,
  setData: Dispatch<SetStateAction<OptionsDataType[]>>
) {
  useEffect(() => {
    function onChose(data: SendVoteType) {
      setData((prev) => {
        const el = prev.find((el) => el.id === data.id);
        if (el?.votes.find((el) => el.userId == data.userId)) return prev;
        if (!el) throw new Error("no such option");
        if (!el.votes.find((el) => el.id == data.voteId))
          el.votes.push({ id: data.voteId, userId: data.userId });
        return [...prev];
      });
    }
    if (timer > 0) socket.on(choseLabel, onChose);
    return () => {
      socket.off(choseLabel, onChose);
    };
  }, [timer]);
}
