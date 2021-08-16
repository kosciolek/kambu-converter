import { ReactNode } from "react";
import { QueryClient, QueryClientProvider } from "react-query";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { configureAppStore, RootState } from "../store";
import { GlobalStyles } from "../style/GlobalStyles";
import { AppThemeProvider } from "../theme";

export type ConfigProps = {
  persist?: boolean;
  children?: ReactNode;
  initialState?: RootState;
};

export const Config = ({
  children,
  persist = false,
  initialState,
}: ConfigProps) => {
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
    initialState,
    persist,
  });
  node = <Provider store={store}>{node}</Provider>;

  /* Redux-persist */
  if (persist) node = <PersistGate persistor={persistor}>{node}</PersistGate>;

  /* Theme */
  node = <AppThemeProvider>{node}</AppThemeProvider>;

  return <>{node}</>;
};
