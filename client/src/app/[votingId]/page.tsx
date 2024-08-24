"use client";
import React, { useState } from "react";
import { Card } from "@/components/ui/card";
import { OptionsDataType } from "../../../../types";
import OptionForm from "../../components/OptionForm";
import OptionCard from "../../components/OptionCard";
import TimerDialog from "../../components/TimerDialog";
import {
  useAddOption,
  useChoseOption,
  useConnect,
  useGetData,
  useGiveData,
  useJoinRoom,
  useTimer,
} from "@/hoooks";
import LoadingComponent from "@/components/LoadingComponent";
import useIsAuthor from "@/hoooks/useIsAuthor";
import { Button } from "@/components/ui/button";
import Link from "next/link";

type Props = {
  params: { votingId: string };
};

export default function Page({ params: { votingId } }: Props) {
  const [isConnected, transport] = useConnect();
  const [timer] = useTimer();
  const [status, setStatus] = useState<"start" | "end">("start");
  const [data, setData] = useState<OptionsDataType[]>([]);
  const [authorId, setAuthorId] = useState<string>("");
  useAddOption(setData);
  useGiveData(setData);
  useJoinRoom(votingId);
  useChoseOption(timer, setData);
  const getDataErr = useGetData(votingId, data, setAuthorId);
  if (getDataErr) throw new Error(getDataErr);

  const isAuthor = useIsAuthor(authorId);

  return (
    <div className="h-screen flex flex-col">
      <div className="flex justify-between px-6 py-4">
        <Button variant={"ghost"} className="text-black">
          <Link href={"/"}>back</Link>
        </Button>
        {isConnected && isAuthor ? (
          <TimerDialog votingId={votingId} setStatus={setStatus} />
        ) : null}
      </div>
      {isConnected ? (
        <>
          {timer > 0 && <p className="mt-4 text-center text-4xl">{timer}</p>}
          {timer <= 0 && status == "end" && (
            <p className="mt-4 text-center text-4xl">vote has ended</p>
          )}
          <div className="flex-grow  flex items-center justify-center">
            <div className="px-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 flex-wrap justify-center max-w-screen-lg mx-auto">
              {data.map((el) => (
                <OptionCard
                  key={el.id}
                  votingId={votingId}
                  el={el}
                  timer={timer}
                />
              ))}
              {isAuthor && timer <= 0 && status == "start" && (
                <Card className="flex-1 p-6 ">
                  <OptionForm votingId={votingId} />
                </Card>
              )}
            </div>
          </div>
        </>
      ) : (
        <LoadingComponent />
      )}
    </div>
  );
}
