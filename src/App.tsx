import { ReactNode } from "react";
import { store, persistor } from "./redux/store";
import { PersistGate } from "redux-persist/integration/react";
import { Provider } from "react-redux";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { Toaster } from "react-hot-toast";
import { QueryClient, QueryClientProvider } from "react-query";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
// import { SocketProvider } from "./contexts/SocketContext";

interface AppProps {
  children: ReactNode;
}

const theme = createTheme();

const clientId = import.meta.env.VITE_CLIENT_ID;
const queryClient = new QueryClient();

function App({ children }: AppProps) {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <QueryClientProvider client={queryClient}>
        <Provider store={store}>
          <PersistGate loading={null} persistor={persistor}>
            <GoogleOAuthProvider clientId={clientId}>
              {/* <SocketProvider>{children}</SocketProvider> */}
              {children}
              <Toaster />
            </GoogleOAuthProvider>
          </PersistGate>
        </Provider>
      </QueryClientProvider>
    </ThemeProvider>
  );
}

export default App;
