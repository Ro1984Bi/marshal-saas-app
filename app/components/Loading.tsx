"use client";

import { Button } from "@/components/ui/button";
import { Loader, Trash } from "lucide-react";
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

export function StripeSubscriptionButton() {
  const { pending } = useFormStatus();

  return (
    <div>
      {pending ? (
        <Button disabled className="w-full">
          {" "}
          <Loader className="mr-2 w-4 h-4 animate-spin" /> Please wait...
        </Button>
      ) : (
        <Button type="submit" className="w-full">
          Create subscription
        </Button>
      )}
    </div>
  );
}

export function StripePortal() {
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
          View payments details
        </Button>
      )}
    </div>
  );
}

export function DeleteNoteButton() {
  const { pending } = useFormStatus();

  return (
    <div>
      {pending ? (
        <Button disabled size={"icon"} variant={"destructive"}>
          {" "}
          <Loader className="mr-2 w-4 h-4 animate-spin" />
        </Button>
      ) : (
        <Button type="submit" variant={"destructive"} size={"icon"}>
          <Trash className="w-4 h-4" />
        </Button>
      )}
    </div>
  );
}
