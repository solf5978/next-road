import {
  LucideCircleDashed,
  LucideCheckCircle,
  LucideCircleChevronRight,
} from "lucide-react";

/* Path Definition */
const pathHome = () => "/";
const pathTickets = () => "/tickets";
const pathTicketSingular = (slugNo: string) => `/tickets/${slugNo}`;
const pathEditPage = (slugNo: string) => `/tickets/edit/${slugNo}`;

const TICKET_ICONS: { [key: string]: React.ReactElement } = {
  OPEN: <LucideCircleChevronRight />,
  IN_RPOGRESS: <LucideCircleDashed />,
  DONE: <LucideCheckCircle />,
};

const TICKET_STATUS_LABELS = {
  OPEN: "OPEN",
  IN_PROGRESS: "IN_PROGRESS",
  DONE: "DONE",
};

export type Ticket = {
  id: string;
  title: string;
  content: string;
  status: TicketStatus;
};

export type TicketStatus = "OPEN" | "IN_PROGRESS" | "DONE";

const initialTickets: Ticket[] = [
  {
    id: "1",
    title: "ticket 1",
    content: "t1 content",
    status: "DONE",
  },
  {
    id: "2",
    title: "ticket 2",
    content: "t2 content",
    status: "OPEN",
  },
];

export {
  initialTickets,
  TICKET_ICONS,
  TICKET_STATUS_LABELS,
  pathHome,
  pathTickets,
  pathTicketSingular,
  pathEditPage,
};
