import styled from "@emotion/styled";
import React, { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { exchangeSlice } from "../../store/slices/exchange";
import {
  getLiveRateInterval,
  getRate,
  getUseLiveRate,
} from "../../store/slices/exchange/selectors";
import { adaptInput } from "../../utils/react-hook-form";
import { Button } from "../Button";
import { Dialog, DialogActions, DialogContent, DialogTitle } from "../Dialog";
import { Input } from "../Input";
import { Select } from "../Select";

type SettingsData = {
  manualRate: string;
  liveRefreshInterval: string;
  rateSource: "manual" | "live";
};
export const Settings = () => {
  return (
    <Dialog
      action={({ open }) => (
        <Button onClick={open} variant="colored">
          Settings
        </Button>
      )}
      content={Contents}
    />
  );
};

const Contents = ({ close }: { close: Function }) => {
  const dispatch = useAppDispatch();

  const rate = useAppSelector(getRate);
  const isLiveRate = useAppSelector(getUseLiveRate);
  const liveInterval = useAppSelector(getLiveRateInterval);

  const {
    control,
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<SettingsData>({
    defaultValues: {
      manualRate: String(rate),
      rateSource: isLiveRate ? "live" : "manual",
      liveRefreshInterval: String(liveInterval / 1000),
    },
  });

  const onSubmit = ({
    liveRefreshInterval: liveRefreshIntervalString,
    manualRate: manualRateString,
    rateSource,
  }: SettingsData) => {
    const interval = Number(liveRefreshIntervalString) * 1000;
    const manual = Number(manualRateString);

    dispatch(exchangeSlice.actions.setRate(manual));
    dispatch(exchangeSlice.actions.setUseLive(rateSource === "live"));
    dispatch(exchangeSlice.actions.setLiveRateInterval(interval));
  };

  return (
    <form
      onSubmit={handleSubmit((data) => {
        onSubmit(data);
        close();
      })}
    >
      <StyledDialogContent>
        <DialogTitle>Settings</DialogTitle>
        <Controller
          name={"manualRate"}
          control={control}
          rules={{
            min: 0,
            validate: (val) => !Number.isNaN(Number(val)),
            required: true,
          }}
          render={({ field: { ref, ...fieldRest } }) => (
            <Input
              {...fieldRest}
              inputRef={ref}
              label="Manual rate (EUR to PLN)"
              error={errors.manualRate && "Incorrect rate"}
            />
          )}
        />
        <Controller
          name="liveRefreshInterval"
          control={control}
          rules={{
            min: 1,
            max: 3600 * 24,
            pattern: /^\d+$/,
            required: true,
          }}
          render={({ field: { ref, ...fieldRest } }) => (
            <Input
              {...fieldRest}
              inputRef={ref}
              label="Refresh live rates every (s)"
              error={errors.liveRefreshInterval && "Incorrect interval"}
            />
          )}
        />
        <Controller
          name="rateSource"
          control={control}
          defaultValue="live"
          render={({ field }) => (
            <Select
              {...field}
              label="Rate source"
              options={[
                { value: "manual", render: "Manual rate" },
                { value: "live", render: "Live rate" },
              ]}
            />
          )}
        />
      </StyledDialogContent>
      <DialogActions>
        <Button type="submit" variant="colored">
          Apply
        </Button>
      </DialogActions>
    </form>
  );
};

const StyledDialogContent = styled(DialogContent)`
  & > * + * {
    margin-top: 8px;
  }
`;
