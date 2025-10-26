import { getTicket } from "@/actions/get-ticket";
import { CardCompact } from "@/components/general/card-compact";
import { TicketUpsertForm } from "@/components/ticket/ticket-upsert-form";
import { notFound } from "next/navigation";

type TicketEditPageProps = {
  params: {
    slugNo: string;
  };
};

const TicketEditPage = async ({ params }: TicketEditPageProps) => {
  const ticket = await getTicket(params.slugNo);

  if (!ticket) {
    return notFound();
  }
  return (
    <div className="flex-1 flex flex-col justify-center items-center">
      <CardCompact
        title="Edit TIcket"
        description="Edit Current Ticket "
        className="w-full max-w-[450px]"
        content={<TicketUpsertForm ticket={ticket} />}
      ></CardCompact>
    </div>
  );
};

export default TicketEditPage;
