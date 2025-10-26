import Link from "next/link";
import { pathTickets } from "@/constants";
import Heading from "@/components/general/heading";

const HomePage = () => {
  return (
    <section className="flex-1 flex flex-col gap-y-8">
      <Heading params={{ pageTitle: "Home", pageDesc: "This is homePage" }} />
      <div className="flex-1 flex flex-col items-center">
        <Link href={pathTickets()}>Tickets</Link>
      </div>
    </section>
  );
};

export default HomePage;
