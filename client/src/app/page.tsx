import { Button } from "@/components/ui/button";
import { ENV } from "@/lib/env";
import { nanoid } from "nanoid";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { createRoomLabel } from "../../../consts";
import { SendCreateRoom } from "../../../types";

async function handleSubmit() {
  "use server";
  const voteId = nanoid(6);
  const authorId = nanoid(8);
  const cookie = cookies();

  const data = await fetch(ENV.NEXT_PUBLIC_SERVER_URL + "/" + createRoomLabel, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      roomId: voteId,
      authorId,
    } satisfies SendCreateRoom),
  });
  if (data.status != 200) {
    throw new Error("Didn't add author");
  }

  cookie.set("userId", authorId);
  redirect(`/${voteId}`);
}

export default function Home() {
  return (
    <main className="flex flex-col items-center justify-center min-h-screen py-2 px-4 sm:px-6 lg:px-8">
      <h1 className="text-3xl sm:text-4xl font-bold mb-8 text-center">
        Welcome to the Voting App
      </h1>
      <form action={handleSubmit} className="w-full max-w-xs sm:max-w-sm">
        <Button type="submit" className="w-full py-2">
          Create Voting
        </Button>
      </form>
    </main>
  );
}
