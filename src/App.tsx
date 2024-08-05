import { ReactNode } from "react";
import { store, persitor } from "./redux/store";
import { PersistGate } from "redux-persist/integration/react";
import { Provider } from "react-redux";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { Toaster } from "react-hot-toast";
import { QueryClient, QueryClientProvider } from 'react-query';

interface AppProps {
  children: ReactNode;
}

const clientId = import.meta.env.VITE_CLIENT_ID;
const queryClient = new QueryClient();

function App({ children }: AppProps) {
  return (
    <QueryClientProvider client={queryClient}>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persitor}>
          <GoogleOAuthProvider clientId={clientId}>
            {children}
            <Toaster />
          </GoogleOAuthProvider>
        </PersistGate>
      </Provider>
    </QueryClientProvider>
  );
}

export default App;
