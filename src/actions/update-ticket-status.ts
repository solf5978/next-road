"use server";

import {
  fromErrorToActionState,
  toActionState,
} from "@/components/ticket/to-action-state";
import { pathTickets } from "@/constants";
import { prisma } from "@/lib/prisma";
import { TicketStatus } from "@prisma/client";
import { revalidatePath } from "next/cache";

export const updateTicketStatus = async (id: string, status: TicketStatus) => {
  try {
    await prisma.ticket.update({
      where: {
        id,
      },
      data: { status },
    });
  } catch (e) {
    return fromErrorToActionState(e);
  }
  revalidatePath(pathTickets());
  return toActionState("SUCCESS", "Status Updated");
};
