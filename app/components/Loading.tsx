"use client";

import { Button } from "@/components/ui/button";
import { Loader } from "lucide-react";
import { useFormStatus } from "react-dom";

export default function LoadingButton() {
  const { pending } = useFormStatus();
  return (
    <div>
      {pending ? (
        <Button disabled className="w-fit">
          {" "}
          <Loader className="mr-2 w-4 h-4 animate-spin" /> Please wait...
        </Button>
      ) : (
        <Button type="submit" className="w-fit">
          Save
        </Button>
      )}
    </div>
  );
}
