import { TICKET_ICONS, pathEditPage, pathTicketSingular } from "@/constants";
import Link from "next/link";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import {
  LucideMoreVertical,
  LucidePencil,
  LucideSquareArrowOutUpRight,
} from "lucide-react";
import { Button } from "../ui/button";
import { cn } from "@/lib/utils";
import { Ticket } from "@prisma/client";

import { toCurrencyFromCent } from "@/lib/currency";
import TicketMoreMenu from "./ticket-more-menu";

type TicketItemProps = {
  ticket: Ticket;
  isDetail?: boolean;
};

const TicketItem = ({ ticket, isDetail }: TicketItemProps) => {
  const detailButton = (
    <Button variant={"outline"} size={"icon"} asChild>
      <Link href={pathTicketSingular(ticket.id)} className="text-sm underline">
        <LucideSquareArrowOutUpRight />
      </Link>
    </Button>
  );

  const editButton = (
    <Button variant={"outline"} size={"icon"} asChild>
      <Link prefetch href={pathEditPage(ticket.id)}>
        <LucidePencil className="h-4 w-4" />
      </Link>
    </Button>
  );

  const moreMenu = (
    <TicketMoreMenu
      ticket={ticket}
      trigger={
        <Button variant="outline" size="icon">
          <LucideMoreVertical className="h-4 w-4" />
        </Button>
      }
    />
  );
  return (
    <div
      className={cn("w-full flex gap-x-1", {
        "max-w-[420px]": isDetail,
        "max-w-[640px]": !isDetail,
      })}
    >
      <Card key={ticket.id} className="w-full">
        <CardHeader>
          <CardTitle className="flex gap-x-2">
            <span>{TICKET_ICONS[ticket.status]}</span>
            <span className="truncate mt-1">{ticket.title}</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <span
            className={cn(" whitespace-break-spaces", {
              "line-clamp-3": !isDetail,
            })}
          >
            {ticket.content}
          </span>
        </CardContent>
        <CardFooter className="flex justify-between">
          <p className="text-sm text-muted-foreground">{ticket.deadline}</p>
          <p className="text-sm text-muted-foreground">
            {toCurrencyFromCent(ticket.bounty)}
          </p>
        </CardFooter>
      </Card>
      <div className="flex flex-col gap-y-3">
        {isDetail ? (
          <>
            {editButton}

            {moreMenu}
          </>
        ) : (
          <>
            {detailButton}
            {editButton}
            {moreMenu}
          </>
        )}
      </div>
    </div>
  );
};

export default TicketItem;
