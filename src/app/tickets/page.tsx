import { Separator } from "@/components/ui/separator";
import Heading from "@/components/general/heading";
import { Suspense } from "react";
import { Spinner } from "@/components/general/spinner";
import { TicketList } from "@/components/ticket/ticket-list";
import { CardCompact } from "@/components/general/card-compact";
import { TicketUpsertForm } from "@/components/ticket/ticket-upsert-form";

const TicketsPage = () => {
  return (
    <section className="flex-1 flex flex-col gap-y-8">
      <Heading
        params={{ pageTitle: "Tickets", pageDesc: "Place For You to Start" }}
      />

      <CardCompact
        title="Create Ticket"
        description="Creating New Ticket..."
        className="w-full max-w-[640px] self-center"
        content={<TicketUpsertForm />}
      />

      <Separator />
      <Suspense fallback={<Spinner />}>
        <TicketList />
      </Suspense>
    </section>
  );
};

export default TicketsPage;
