"use client";

import Placeholder from "@/components/general/placeholder";

export default function Error({ error }: { error: Error }) {
  return <Placeholder label={error.message || "something went wrong!"} />;
}
