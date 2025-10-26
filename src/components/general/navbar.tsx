import { pathHome, pathTickets } from "@/constants";
import Link from "next/link";
import { Button, buttonVariants } from "../ui/button";
import { ThemeSwitcher } from "../theme/theme-switcher";

const Navbar = () => {
  return (
    <nav className="supports-backdrop-blur:bg-backgroun/60 fixed left-0 right-0 top-0 z-20 bg-background/95 backdrop-blur w-full flex justify-between py-2.5 px-5 border-b">
      <Button asChild variant="ghost">
        <Link href={pathHome()}> Mandarin </Link>
      </Button>

      <div className="flex align-item gap-x-2">
        <ThemeSwitcher />
        <Link
          href={pathTickets()}
          className={buttonVariants({ variant: "default" })}
        >
          Tickets
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
