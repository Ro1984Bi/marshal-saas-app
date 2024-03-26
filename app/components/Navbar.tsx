import Link from "next/link";
import { ModeToggle } from "./ModeToggle";
import { Button } from "@/components/ui/button";

export default function Navbar() {
  return (
    <nav className="border-b bg-background h-[10vh] flex items-center">
      <div className="container flex items-center justify-between">
        <Link href="/">
          <h1 className="font-bold text-3xl">MarshalSaasApp</h1>
        </Link>
        <div className="flex items-center gap-x-5">
            <ModeToggle />
            <div className="flex items-center gap-x-5">
                <Button>Sign In</Button>
                <Button variant={'secondary'}>Sign Up</Button>
            </div>
        </div>
      </div>
    </nav>
  );
}
