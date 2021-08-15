import { ReactNode } from "react";
import { Provider } from "react-redux";
import { configureAppStore } from "../store";
import { AppThemeProvider } from "../theme";

export const Config = ({ children }: { children?: ReactNode }) => {
  const store = configureAppStore();
  return (
    <AppThemeProvider>
      <Provider store={store}>{children}</Provider>
    </AppThemeProvider>
  );
};
