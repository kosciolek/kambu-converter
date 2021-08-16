import styled from "@emotion/styled";
import { useCallback } from "react";
import { useAppSelector } from "../../store/hooks";
import { getTransactionById } from "../../store/slices/exchange/selectors";
import { Button } from "../Button";
import { Dialog, DialogActions, DialogProps, DialogTitle } from "../Dialog";
import { DeleteButton } from "./DeleteButton";

export type TransactionDialogProps = {
  action: DialogProps["action"];
  id: string;
};

export const TransactionDialog = ({ action, id }: TransactionDialogProps) => {
  const tran = useAppSelector(getTransactionById(id))!;

  const content = useCallback(
    ({ close }) => (
      <>
        <DialogTitle>{tran.name}</DialogTitle>
        <DialogActions>
          <DeleteButton close={close} id={tran.id} />
          <Button onClick={close} variant="colored">
            OK
          </Button>
        </DialogActions>
      </>
    ),
    [tran.id, tran.name]
  );

  return <Dialog action={action} content={content} />;
};

export const Root = styled.div``;
