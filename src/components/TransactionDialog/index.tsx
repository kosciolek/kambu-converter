import styled from "@emotion/styled";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { exchangeSlice } from "../store/slices/exchange";
import { getTransactionById } from "../store/slices/exchange/selectors";
import { Button } from "./Button";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogProps,
  DialogTitle,
} from "./Dialog";
import { Txt } from "./Txt";

export type TransactionDialogProps = {
  action: DialogProps["action"];
  id: string;
};

export const TransactionDialog = ({ action, id }: TransactionDialogProps) => {
  const tran = useAppSelector(getTransactionById(id))!;
  const dispatch = useAppDispatch();

  const onDeleteClick = (close: Function) => {
    dispatch(exchangeSlice.actions.removeTransaction(id));
    close();
  };

  return (
    <>
      <Dialog
        action={action}
        content={({ close }) => (
          <>
            <DialogTitle>{tran.name}</DialogTitle>
            <DialogContent>Content</DialogContent>
            <DialogActions>
              <Dialog
                action={({ open: openInner }) => (
                  <Button onClick={openInner}>Delete</Button>
                )}
                content={({ close: closeInner }) => (
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
                          onDeleteClick(close);
                        }}
                      >
                        Yes, delete
                      </Button>
                      <Button variant="colored" onClick={closeInner}>
                        No
                      </Button>
                    </DialogActions>
                  </>
                )}
              />
              <Button onClick={close} variant="colored">
                OK
              </Button>
            </DialogActions>
          </>
        )}
      />
    </>
  );
};

export const Root = styled.div``;
