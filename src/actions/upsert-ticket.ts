"use server";
import { z } from "zod";
import { pathTickets, pathTicketSingular } from "@/constants";
import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { setCookiesByKey } from "./cookies";
import {
  ActionState,
  fromErrorToActionState,
  toActionState,
} from "@/components/ticket/to-action-state";
import { toCent } from "@/lib/currency";

const upsertTicketSchema = z.object({
  title: z.string().min(1).max(191),
  content: z.string().min(1).max(1024),
  deadline: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, "Is required"),
  bounty: z.coerce.number().positive(),
});

export const upsertTicket = async (
  id: string | undefined,
  _actionState: ActionState,
  formData: FormData
) => {
  try {
    const data = upsertTicketSchema.parse({
      title: formData.get("title"),
      content: formData.get("content"),
      deadline: formData.get("deadline"),
      bounty: formData.get("bounty"),
    });

    const dbData = {
      ...data,
      bounty: toCent(data.bounty),
    };

    await prisma.ticket.upsert({
      where: {
        id: id || "",
      },
      update: dbData,
      create: dbData,
    });
  } catch (error) {
    return fromErrorToActionState(error);
  }

  revalidatePath(pathTickets());
  if (id) {
    setCookiesByKey("toast", "ticket updated");
    redirect(pathTicketSingular(id));
  }
  return toActionState("SUCCESS", "tickt created");
};
