import { useEffect, useRef } from "react";
import { ActionState } from "./to-action-state";

type OnArgs = {
  actionState: ActionState;
};
type UseActionFeedbackOptions = {
  onSuccess?: (onArgs: OnArgs) => void;
  onError?: ({ actionState }: { actionState: ActionState }) => void;
};

const useActionFeedback = (
  actionState: ActionState,
  options: UseActionFeedbackOptions
) => {
  const prevTimestamp = useRef(actionState.timestamp);
  // eslint-disable-next-line react-hooks/refs
  const isUpdate = prevTimestamp.current !== actionState.timestamp;
  useEffect(() => {
    if (!isUpdate) return;
    if (actionState.status === "SUCCESS") {
      //   if (options.onSuccess)
      options.onSuccess?.({ actionState });
    }

    if (actionState.status === "ERROR") {
      options.onError?.({ actionState });
    }
    prevTimestamp.current = actionState.timestamp;
  }, [isUpdate, actionState, options]);
};
export { useActionFeedback };
