import { useCallback, useState } from "react";

/**
 * Both vals not null, and their prototype and typeof is different.
 */
const isControlled = (resolvedValue: any, newValue: any) =>
  resolvedValue !== null &&
  newValue !== null &&
  (typeof resolvedValue !== typeof newValue ||
    Object.getPrototypeOf(resolvedValue) !== Object.getPrototypeOf(newValue));

/**
 * Use controlled/uncontrolled state.
 * If props passed in, uses props for state. If not, uses internal state.
 * @param value The value passed in by props
 * @param onChange The onChange callback passed in by props
 * @param initial Initial state, in uncontrolled
 * @param extract A function that extracts state from onChange args
 */
export function useControlled<STATE, ONCHANGE_ARGS extends any[]>({
  value: valueProp,
  onChange: onChangeProp,
  initial,
  extract = (...args) => args[0],
}: {
  value?: STATE;
  onChange?: (...args: ONCHANGE_ARGS) => void;
  initial: STATE;
  extract?: (...args: ONCHANGE_ARGS) => STATE;
}) {
  const [valueState, setValueState] = useState<STATE>(initial);

  const resolvedValue = valueProp !== undefined ? valueProp : valueState;

  const update = useCallback<(...args: ONCHANGE_ARGS) => void>(
    (...args) => {
      onChangeProp?.(...args);

      const newValue = extract(...args);

      if (process.env.NODE_ENV === "development") {
        if (isControlled(resolvedValue, newValue)) {
          // eslint-disable-next-line no-console
          console.warn(
            "[useControlledState] - The previous and next state have different types. Did you forget to specify the extract function?"
          );
        }
      }

      setValueState(newValue);
    },
    [onChangeProp, resolvedValue, extract]
  );

  return [resolvedValue, update] as const;
}
