import {
  HtmlHTMLAttributes,
  ReactElement,
  cloneElement,
  useActionState,
  useState,
} from "react";
import { ActionState, EMPTY_ACTION_STATE } from "../ticket/to-action-state";
import {
  AlertDialogHeader,
  AlertDialogFooter,
  AlertDialogContent,
  AlertDialog,
  AlertDialogDescription,
  AlertDialogCancel,
  AlertDialogTitle,
  AlertDialogAction,
} from "../ui/alert-dialog";
import { SubmitButton } from "../ticket/submit-button";
import { Form } from "../ticket/form";

type useConfirmDialogProps = {
  title?: string;
  description?: string;
  action: () => Promise<ActionState>;
  trigger: React.ReactElement;
};

const useConfirmDialog = ({
  title = "Are you absolutely sure?",
  description = "This action cannot be undone. This will permanently delete your account and remove your data from our servers.",
  action,
  trigger,
}: useConfirmDialogProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const dialogTrigger = cloneElement(
    trigger as ReactElement<HtmlHTMLAttributes<HTMLElement>>,
    {
      onClick: () => setIsOpen((state) => !state),
    }
  );
  const handleSuccess = () => {
    setIsOpen(false);
  };

  const [actionState, formAction] = useActionState(action, EMPTY_ACTION_STATE);
  const dialog = (
    <AlertDialog open={isOpen} onOpenChange={setIsOpen}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{title}</AlertDialogTitle>
          <AlertDialogDescription>{description}</AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction asChild>
            <Form
              action={formAction}
              actionState={actionState}
              onSuccess={handleSuccess}
            >
              <SubmitButton label="Confirm" />
            </Form>
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
  return [dialogTrigger, dialog];
};

export default useConfirmDialog;
