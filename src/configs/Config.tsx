import { ReactNode } from "react";
import { QueryClient, QueryClientProvider } from "react-query";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { configureAppStore } from "../store";
import { GlobalStyles } from "../style/GlobalStyles";
import { AppThemeProvider } from "../theme";

export type ConfigProps = {
  persist?: boolean;
  children?: ReactNode;
};

export const Config = ({ children, persist = false }: ConfigProps) => {
  /* todo refactor to pipe-like */
  let node = children;

  /* react-query */
  const queryClient = new QueryClient();
  node = <QueryClientProvider client={queryClient}>{node}</QueryClientProvider>;

  /* Global styles */
  node = (
    <>
      <GlobalStyles />
      {node}
    </>
  );

  /* Redux */
  const { store, persistor } = configureAppStore({
    persist,
  });
  node = <Provider store={store}>{node}</Provider>;

  /* Redux-persist */
  if (persist) node = <PersistGate persistor={persistor}>{node}</PersistGate>;

  /* Theme */
  node = <AppThemeProvider>{node}</AppThemeProvider>;

  return <>{node}</>;
};
