import { useCallback } from "react";
import { useNotification } from "../../hooks/notifications";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { exchangeSlice } from "../../store/slices/exchange";
import { getTransactionById } from "../../store/slices/exchange/selectors";
import { Button } from "../Button";
import { Dialog, DialogActions, DialogContent, DialogTitle } from "../Dialog";
import { Txt } from "../Txt";

export type DeleteButtonProps = {
  close: Function;
  id: string;
};

export const DeleteButton = ({ id, close: outerClose }: DeleteButtonProps) => {
  const dispatch = useAppDispatch();
  const tran = useAppSelector(getTransactionById(id))!;

  const makeNotification = useNotification();

  const onDeleteClick = () => {
    makeNotification({
      title: "Deleted",
      content: `Deleted transaction ${tran.name}`,
    });
    dispatch(exchangeSlice.actions.removeTransaction(id));

    outerClose();
  };

  const content = useCallback(
    ({ close: closeInner }) => (
      <>
        <DialogTitle>Confirm delete</DialogTitle>
        <DialogContent>
          Are you sure you want to delete{" "}
          <Txt color="primary600">{tran.name}</Txt>?
          <br />
          <br />
          This operation is non-reversible.
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => {
              closeInner();
              onDeleteClick();
            }}
          >
            Yes, delete
          </Button>
          <Button variant="colored" onClick={closeInner}>
            No
          </Button>
        </DialogActions>
      </>
    ),
    []
  );

  return (
    <Dialog
      action={({ open: openInner }) => (
        <Button onClick={openInner}>Delete</Button>
      )}
      content={content}
    />
  );
};
