import { ReactNode } from "react";
import { AppThemeProvider } from "../theme";

export const Config = ({ children }: { children?: ReactNode }) => (
  <AppThemeProvider>{children}</AppThemeProvider>
);
