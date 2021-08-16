import styled from "@emotion/styled";
import { useCallback } from "react";
import { useAppSelector } from "../../store/hooks";
import { getTransactionById } from "../../store/slices/exchange/selectors";
import { numToDate } from "../../utils/js";
import { Button } from "../Button";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogProps,
  DialogTitle,
} from "../Dialog";
import { Txt } from "../Txt";
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
        <DialogContent>
          A good place for some more <Txt color="primary600">information!</Txt>
          <br />
          <br />
          Let's show the date this transaction was added as well:{" "}
          {numToDate(tran.date, "datetime")}
        </DialogContent>
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
