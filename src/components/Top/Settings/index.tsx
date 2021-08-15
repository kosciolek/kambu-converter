import styled from "@emotion/styled";
import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import { exchangeSlice } from "../../../store/slices/exchange";
import {
  getRate,
  getUseLiveRate,
} from "../../../store/slices/exchange/selectors";
import { Button } from "../../Button";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "../../Dialog";
import { Input } from "../../Input";
import { Select } from "../../Select";

export const Settings = () => {
  const rate = useAppSelector(getRate);
  const dispatch = useAppDispatch();

  const isLiveRate = useAppSelector(getUseLiveRate);

  return (
    <Dialog
      action={({ open }) => (
        <Button onClick={open} noPadding noWave>
          Settings
        </Button>
      )}
      content={({ close }) => (
        <>
          <StyledDialogContent>
            <DialogTitle>Settings</DialogTitle>
            <Input
              onChange={(_, newVal) => {
                const float = parseFloat(newVal);
                if (!Number.isNaN(float))
                  dispatch(exchangeSlice.actions.setRate(float));
              }}
              value={String(rate)}
              label="Manual rate (base to auxiliary)"
            />
            <Input label="Refresh live rates every (s)" />
            <Select
              label="Rate source"
              value={isLiveRate ? "live" : "manual"}
              onChange={(val) =>
                dispatch(exchangeSlice.actions.setUseLive(val === "live"))
              }
              options={[
                { value: "manual", render: "Manual rate" },
                { value: "live", render: "Live rate" },
              ]}
            />
          </StyledDialogContent>
          <DialogActions>
            <Button onClick={close} variant="colored">
              OK!
            </Button>
          </DialogActions>
        </>
      )}
    />
  );
};

const StyledDialogContent = styled(DialogContent)`
  & > * + * {
    margin-top: 8px;
  }
`;
