import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import React from "react";
import { useForm } from "react-hook-form";
import { JSONOptionsDataType } from "../../../types";
import { nanoid } from "nanoid";
import { addOptionLabel } from "@/../../../consts";
import { socket } from "@/lib/socket";

type Props = { votingId: string };

function OptionForm({ votingId }: Props) {
  const { register, handleSubmit, formState, reset } = useForm({
    values: { name: "" },
    defaultValues: { name: "" },
  });

  const onSubmit = (data: { name: string }) => {
    if (!socket.id) throw new Error("no socket id");
    socket.emit(addOptionLabel, {
      room: votingId,
      value: {
        id: nanoid(4),
        authorId: socket.id,
        name: data.name,
      } satisfies JSONOptionsDataType,
    });
    reset();
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Label htmlFor="name">Name</Label>
      <Input
        id="name"
        type="text"
        {...register("name", {
          required: true,
        })}
      />
      <div className="mt-2 flex justify-end">
        <Button type="submit">add option</Button>
      </div>
    </form>
  );
}

export default OptionForm;
