import styled from "@emotion/styled";
import React, { useState } from "react";
import { useExchange } from "../../api/exchange/hooks";
import { useAppDispatch } from "../../store/hooks";
import { exchangeSlice } from "../../store/slices/exchange";
import { getId } from "../../utils/js";
import { Button } from "../Button";
import { Dialog, DialogActions, DialogContent, DialogTitle } from "../Dialog";
import { Input } from "../Input";
import { Select } from "../Select";

export const AddButton = () => {
  const dispatch = useAppDispatch();
  const [name, setName] = useState("");
  const [amount, setAmount] = useState("10");
  const [amountError, setAmountError] = useState("");
  const [currency, setCurrency] = useState("EUR");
  /* TODO Move to react-hook-form */

  const { exchange } = useExchange();

  const add = (close: Function) => {
    if (!Number.isNaN(Number(amount))) {
      dispatch(
        exchangeSlice.actions.addTransaction({
          id: getId(),
          name,
          date: Date.now(),

          ...(currency === "EUR"
            ? {
                eur: Number(amount),
                originalPln: exchange({
                  from: "EUR",
                  to: "PLN",
                  amount: Number(amount),
                })! as number,
              }
            : {
                originalPln: Number(amount),
                eur: exchange({
                  from: "PLN",
                  to: "EUR",
                  amount: Number(amount),
                })! as number,
              }),
        })
      );
      close();
    } else {
      setAmountError("Incorrect amount.");
    }
  };

  const clean = () => {
    setName("");
    setAmount("");
  };

  return (
    <Dialog
      onClose={clean}
      action={({ open }) => (
        <Button onClick={open} variant="colored">
          Add
        </Button>
      )}
      content={({ close }) => (
        <>
          <DialogTitle>Add transaction</DialogTitle>
          <DialogContent>
            <Content>
              <Input
                label="Name"
                value={name}
                onChange={(_, val) => setName(val)}
              />
              <Input
                error={amountError}
                label="Amount"
                value={String(amount)}
                onChange={(_, val) => {
                  setAmount(val);
                  setAmountError("");
                }}
              />
              <Select
                label="Currency"
                value={currency}
                onChange={(val) => setCurrency(val as string)}
                placeholder="Currency"
                options={[{ value: "EUR" }, { value: "PLN" }]}
              />
            </Content>
          </DialogContent>
          <DialogActions>
            <Button onClick={close}>Cancel</Button>
            <Button
              variant="colored"
              onClick={() => {
                add(close);
              }}
            >
              Add
            </Button>
          </DialogActions>
        </>
      )}
    />
  );
};

const Content = styled.div`
  display: flex;
  flex-direction: column;
  & > * + * {
    margin-top: 16px;
  }
`;
