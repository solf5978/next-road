"use client";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Ticket } from "@prisma/client";
import { upsertTicket } from "@/actions/upsert-ticket";
import { Textarea } from "@/components/ui/textarea";
import { useActionState, useRef } from "react";
import { SubmitButton } from "./submit-button";
import { FieldError } from "./field-error";
import { Form } from "./form";
import { EMPTY_ACTION_STATE } from "./to-action-state";

import { fromCent } from "@/lib/currency";
import {
  DatePicker,
  ImperativeHandleFromDatePicker,
} from "../general/date-picker";

type TicketUpsertFormProps = {
  ticket?: Ticket;
};

const TicketUpsertForm = ({ ticket }: TicketUpsertFormProps) => {
  const [actionState, action] = useActionState(
    upsertTicket.bind(null, ticket?.id),
    EMPTY_ACTION_STATE
  );

  const datePickerImperativeHandleRef =
    useRef<ImperativeHandleFromDatePicker>(null);
  const handleSuccess = () => {
    datePickerImperativeHandleRef.current?.reset();
  };
  return (
    <Form action={action} actionState={actionState} onSuccess={handleSuccess}>
      {/* <Input name="id" type="hidden" defaultValue={ticket?.id} /> */}
      <Label htmlFor="title">title</Label>
      <Input
        id="title"
        name="title"
        type="text"
        className="border-2"
        defaultValue={
          (actionState.payload?.get("title") as string) ?? ticket?.title
        }
      />
      <FieldError actionState={actionState} name="title" />
      <Label htmlFor="content">content</Label>
      <Textarea
        id="content"
        name="content"
        defaultValue={
          (actionState.payload?.get("content") as string) ?? ticket?.content
        }
      />{" "}
      <FieldError actionState={actionState} name="content" />
      <div className="flex gap-x-2 mb-1">
        <div className="w-1/2 gap-y-2">
          <Label htmlFor="deadline">Deadline</Label>

          <DatePicker
            // key={actionState.timestamp} // reset state by lifting using key
            id="deadline"
            name="deadline"
            defaultValue={
              (actionState.payload?.get("deadline") as string) ??
              ticket?.deadline
            }
            imperativeHandleRef={datePickerImperativeHandleRef}
          />
          <FieldError actionState={actionState} name="deadline" />
        </div>
        <div className="w-1/2">
          <Label htmlFor="bounty">bounty</Label>
          <Input
            id="bounty"
            name="bounty"
            type="number"
            step={".01"}
            className="border-2"
            defaultValue={
              (actionState.payload?.get("bounty") as string) ??
              (ticket?.bounty ? fromCent(ticket?.bounty) : "")
            }
          />
          <FieldError actionState={actionState} name="bounty" />
        </div>
      </div>
      <SubmitButton label={ticket ? "Edit" : "Create"} />
    </Form>
  );
};

export { TicketUpsertForm };
