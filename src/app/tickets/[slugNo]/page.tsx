import { getTicket } from "@/actions/get-ticket";
import TicketItem from "@/components/ticket/ticket-item";
import { notFound } from "next/navigation";

type TicketPageProps = {
  params: Promise<{
    slugNo: string;
  }>;
};

const TicketPage = async ({ params }: TicketPageProps) => {
  const _ = await params;
  const ticket = await getTicket(_.slugNo);

  if (!ticket) {
    return notFound();
  }
  return (
    <div className="flex justify-center animate-fade-in-from-top">
      <TicketItem ticket={ticket} isDetail />
    </div>
  );
};

export default TicketPage;
