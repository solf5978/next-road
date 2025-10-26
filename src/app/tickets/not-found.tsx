import { pathTickets } from "@/constants";
import Placeholder from "@/components/general/placeholder";
import { Button } from "@/components/ui/button";
import { Link } from "lucide-react";

export default function NotFound() {
  return (
    <Placeholder
      label="Yet to find the proper ticket for you, sorry"
      button={
        <Button asChild variant={"outline"}>
          <Link href={pathTickets()}>Go Back To Tickets</Link>
        </Button>
      }
    />
  );
}
