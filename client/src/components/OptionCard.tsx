import { Card } from "@/components/ui/card";
import React from "react";
import { OptionsDataType, SendVoteType } from "../../../types";
import { nanoid } from "nanoid";
import { socket } from "@/lib/socket";
import { choseLabel } from "../../../consts";
import { cx } from "class-variance-authority";

type Props = {
  el: OptionsDataType;
  votingId: string;
  timer: number;
};

function OptionCard({ el, votingId, timer }: Props) {
  const choseHandler = (id: string) => {
    if (!socket.id) throw new Error("no socket id");
    socket.emit(choseLabel, {
      room: votingId,
      value: {
        id,
        voteId: nanoid(4),
        userId: socket.id,
      } satisfies SendVoteType,
    });
  };
  return (
    <Card
      className={cx(
        "flex-1 p-6 select-none flex flex-col items-center justify-center text-center",
        timer > 0 ? "cursor-pointer" : "cursor-not-allowed"
      )}
      onClick={() => {
        choseHandler(el.id);
      }}
    >
      <p>{el.name}</p>
      <p>{el.count()}</p>
    </Card>
  );
}

export default OptionCard;
