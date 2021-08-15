import { ReactNode } from "react";
import { Provider } from "react-redux";
import { configureAppStore } from "../store";
import { GlobalStyles } from "../style/GlobalStyles";
import { AppThemeProvider } from "../theme";

export const Config = ({ children }: { children?: ReactNode }) => {
  const store = configureAppStore();
  return (
    <AppThemeProvider>
      <Provider store={store}>
        <GlobalStyles />
        {children}
      </Provider>
    </AppThemeProvider>
  );
};
