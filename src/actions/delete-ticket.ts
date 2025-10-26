"use server";
import { pathTickets } from "@/constants";
import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { setCookiesByKey } from "./cookies";
export const deleteTicket = async (id: string) => {
  await prisma.ticket.delete({
    where: {
      id,
    },
  });
  revalidatePath(pathTickets());
  setCookiesByKey("toast", "Ticket deleted");
  redirect(pathTickets());
};
