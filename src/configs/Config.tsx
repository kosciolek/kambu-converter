import { ReactNode } from "react";
import { QueryClient, QueryClientProvider } from "react-query";
import { Provider } from "react-redux";
import { configureAppStore } from "../store";
import { GlobalStyles } from "../style/GlobalStyles";
import { AppThemeProvider } from "../theme";

export const Config = ({ children }: { children?: ReactNode }) => {
  const store = configureAppStore();
  const queryClient = new QueryClient();

  return (
    <AppThemeProvider>
      <Provider store={store}>
        <GlobalStyles />
        <QueryClientProvider client={queryClient}>
          {children}
        </QueryClientProvider>
      </Provider>
    </AppThemeProvider>
  );
};
