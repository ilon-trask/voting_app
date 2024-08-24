"use client";
import React, { useEffect, useState } from "react";

type Props = {};

function useLoadingDots() {
  const [loadingDots, setLoadingDots] = useState(1);
  useEffect(() => {
    const intervalId = setInterval(() => {
      setLoadingDots((prev) => {
        if (prev < 3) return prev + 1;
        return 1;
      });
    }, 400);
    return () => clearInterval(intervalId);
  }, []);
  return [loadingDots, setLoadingDots] as const;
}

function LoadingComponent({}: Props) {
  const [loadingDots] = useLoadingDots();

  return (
    <div className="h-screen flex items-center justify-center">
      <p>
        Loading
        {Array.from({ length: loadingDots }, (_, i) => i).map((el) => ".")}
      </p>
    </div>
  );
}

export default LoadingComponent;
