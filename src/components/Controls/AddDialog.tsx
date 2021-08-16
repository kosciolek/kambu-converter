import styled from "@emotion/styled";
import React from "react";
import { Controller, useForm } from "react-hook-form";
import { useExchange } from "../../api/exchange/hooks";
import { useNotification } from "../../hooks/notifications";
import { useAppDispatch } from "../../store/hooks";
import { exchangeSlice } from "../../store/slices/exchange";
import { getId } from "../../utils/js";
import { Button } from "../Button";
import { Dialog, DialogActions, DialogContent, DialogTitle } from "../Dialog";
import { Input } from "../Input";
import { Select } from "../Select";

type AddData = { name: string; amount: string; currency: "EUR" | "PLN" };

export const AddDialog = () => (
  <Dialog
    action={({ open }) => (
      <Button onClick={open} variant="colored">
        Add
      </Button>
    )}
    content={Contents}
  />
);

const Contents = ({ close }: { close: () => void }) => {
  const dispatch = useAppDispatch();

  const { exchange } = useExchange();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<AddData>();

  const makeNotification = useNotification();

  const onSubmit = ({ amount: amountString, currency, name }: AddData) => {
    const amount = Number(amountString);

    makeNotification({
      title: "Transaction added",
      content: name,
    });

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
                amount,
              })! as number,
            }
          : {
              originalPln: amount,
              eur: exchange({
                from: "PLN",
                to: "EUR",
                amount,
              })! as number,
            }),
      })
    );
  };

  return (
    <form
      onSubmit={handleSubmit((data) => {
        onSubmit(data);
        close();
      })}
    >
      <DialogTitle>Add transaction</DialogTitle>
      <DialogContent>
        <Content>
          <Controller
            name="name"
            control={control}
            rules={{
              required: true,
              maxLength: 15,
              minLength: 1,
            }}
            render={({ field: { ref, ...rest } }) => (
              <Input
                inputRef={ref}
                {...rest}
                placeholder="My Company"
                label="Name"
                error={errors.name && "Incorrect name"}
              />
            )}
          />
          <Controller
            name="amount"
            control={control}
            rules={{
              required: true,
              pattern: /^\d*(\.\d\d?)?$/,
              validate: (val) => !Number.isNaN(Number(val)),
            }}
            render={({ field: { ref, ...rest } }) => (
              <Input
                inputRef={ref}
                {...rest}
                placeholder="12.34"
                label="Amount"
                error={errors.amount && "Incorrect amount"}
              />
            )}
          />
          <Controller
            name="currency"
            control={control}
            defaultValue="EUR"
            render={({ field }) => (
              <Select
                {...field}
                label="Currency"
                placeholder="Currency"
                options={[{ value: "EUR" }, { value: "PLN" }]}
              />
            )}
          />
        </Content>
      </DialogContent>
      <DialogActions>
        <Button onClick={close}>Cancel</Button>
        <Button data-testid="add-transaction" type="submit" variant="colored">
          Add
        </Button>
      </DialogActions>
    </form>
  );
};

const Content = styled.div`
  display: flex;
  flex-direction: column;
  & > * + * {
    margin-top: 16px;
  }
`;
