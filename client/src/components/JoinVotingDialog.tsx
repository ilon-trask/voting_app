"use client";
import React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import { Button } from "./ui/button";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";


function JoinVotingModal() {
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<{ votingId: string }>();
  const router = useRouter();
  function onSubmit(data: { votingId: string }) {
    router.push(data.votingId)
  }
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">Join Voting</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <form onSubmit={handleSubmit(onSubmit)}>
          <DialogHeader>
            <DialogTitle>Join Voting</DialogTitle>
            <DialogDescription>Enter VotingId to join voting</DialogDescription>
          </DialogHeader>
          <div>
            <Label htmlFor="votingId" className="text-right">
              VotingId
            </Label>
            <Input
              id="votingId"
              className="col-span-3 mt-2"
              {...register("votingId")}
            />
            {errors.votingId && (
              <p className="text-red-500 text-sm mt-1">
                {errors.votingId.message}
              </p>
            )}
          </div>
          <DialogFooter>
            <Button type="submit">Join</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

export default JoinVotingModal;
