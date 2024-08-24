"use client";
import React from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

type Props = {
  error: Error;
  reset: () => void;
};

function ErrorPage({ error, reset }: Props) {
  return (
    <div className="h-screen flex flex-col items-center justify-center">
      <h1 className="text-4xl font-bold mb-4">Something went wrong</h1>
      <p className="text-lg mb-4">{error.message}</p>
      <div className="flex gap-4">
        <Button variant={"secondary"}>
          <Link href="/">Go to Home</Link>
        </Button>
        <Button variant={"secondary"} onClick={reset} className="mb-4">
          Try Again
        </Button>
      </div>
    </div>
  );
}

export default ErrorPage;
