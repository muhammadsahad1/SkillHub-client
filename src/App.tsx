import { ReactNode, useState } from "react";
import { store, persitor } from "./redux/store";
import { PersistGate } from "redux-persist/integration/react";
import "./App.css";
import { Provider } from "react-redux";
import { GoogleOAuthProvider } from "@react-oauth/google";

interface AppProps {
  children : ReactNode
}

function App({children} : AppProps) {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persitor}>
        <GoogleOAuthProvider clientId={import.meta.env.VITE_CLIENT_ID}>
          {children}
        </GoogleOAuthProvider>
      </PersistGate>
    </Provider>
  );
}

export default App;
