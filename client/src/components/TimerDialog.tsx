"use client";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { socket } from "@/lib/socket";
import { useRouter } from "next/navigation";
import React, { Dispatch, SetStateAction, useState } from "react";
import { useForm } from "react-hook-form";

type Props = {
  votingId: string;
  setStatus: Dispatch<SetStateAction<"start" | "end">>;
};

function TimerModal({ votingId, setStatus }: Props) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    values: {
      timer: 0,
    },
  });
  const onSubmit = ({ timer }: { timer: number }) => {
    socket.emit("counter", { roomId: votingId, timer });
    setStatus("end");
  };
  const router = useRouter();
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button>Start voting</Button>
      </AlertDialogTrigger>
      <AlertDialogContent className="max-w-md">
        <form onSubmit={handleSubmit(onSubmit)}>
          <AlertDialogHeader>
            <AlertDialogTitle>
              Скільки часу буде тривати голосування?
            </AlertDialogTitle>
            <AlertDialogDescription>
              Введіть кількість часу в секундах
            </AlertDialogDescription>
            <Input
              {...register("timer", {
                required: "Це поле є обов'язковим",
                valueAsNumber: true,
                min: {
                  value: 1,
                  message: "Мінімалька кількість часу - 1 секунда",
                },
                max: {
                  value: 60,
                  message: "Максимальна кількість часу - 60 секунд",
                },
              })}
              type="number"
              placeholder="0"
            />
            {errors.timer && (
              <p className="text-red-500 text-sm mt-1">
                {errors.timer.message}
              </p>
            )}
          </AlertDialogHeader>
          <AlertDialogFooter className="mt-4">
            <AlertDialogCancel>Назад</AlertDialogCancel>
            <AlertDialogAction type="submit">Зберегти</AlertDialogAction>
          </AlertDialogFooter>
        </form>
      </AlertDialogContent>
    </AlertDialog>
  );
}

export default TimerModal;
