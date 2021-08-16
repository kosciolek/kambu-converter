import React from "react";
import { useNotification } from "../../hooks/notifications";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { exchangeSlice } from "../../store/slices/exchange";
import { getTransactionCount } from "../../store/slices/exchange/selectors";
import { Button } from "../Button";
import { Dialog, DialogActions, DialogContent, DialogTitle } from "../Dialog";
import { Txt } from "../Txt";

export const DeleteButton = () => {
  const dispatch = useAppDispatch();
  const tranAmount = useAppSelector(getTransactionCount);

  const makeNotification = useNotification();

  const deleteAll = () => {
    makeNotification(
      tranAmount
        ? {
            title: "A catastrophe!",
            content: (
              <>
                You've just deleted <Txt>ALL</Txt> the transactions!
              </>
            ),
          }
        : {
            title: "No transactions",
            content: "Nothing to delete.",
          }
    );
    dispatch(exchangeSlice.actions.removeAllTransactions());
  };

  return (
    <Dialog
      action={({ open }) => <Button onClick={open}>Delete all</Button>}
      content={({ close }) => (
        <>
          <DialogTitle>Confirm deletion</DialogTitle>
          <DialogContent>
            Are you sure you want to{" "}
            <Txt color="primary600">delete ALL transactions</Txt>?
          </DialogContent>
          <DialogActions>
            <Button
              onClick={() => {
                deleteAll();
                close();
              }}
            >
              Yes
            </Button>
            <Button variant="colored" onClick={close}>
              No
            </Button>
          </DialogActions>
        </>
      )}
    />
  );
};
