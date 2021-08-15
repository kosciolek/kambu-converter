import React from "react";
import { useAppDispatch } from "../../store/hooks";
import { exchangeSlice } from "../../store/slices/exchange";
import { Button } from "../Button";
import { Dialog, DialogActions, DialogContent, DialogTitle } from "../Dialog";
import { Txt } from "../Txt";

export const DeleteButton = () => {
  const dispatch = useAppDispatch();
  const deleteAll = () =>
    dispatch(exchangeSlice.actions.removeAllTransactions());

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
