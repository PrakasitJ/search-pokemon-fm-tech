"use client";

import { useEffect } from "react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center p-4 text-center">
      <h2 className="text-2xl font-bold text-red-500 mb-4">Something went wrong!</h2>
      <button
        onClick={() => reset()}
        className="px-6 py-2 bg-zinc-800 text-white rounded-lg hover:bg-zinc-700 transition-colors"
      >
        Try again
      </button>
    </div>
  );
}
