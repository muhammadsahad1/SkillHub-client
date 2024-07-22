import { ReactNode, useState } from "react";
import { store, persitor } from "./redux/store";
import { PersistGate } from "redux-persist/integration/react";
import "./App.css";
import { Provider } from "react-redux";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { Toaster } from "react-hot-toast";

interface AppProps {
  children : ReactNode
}

const clientId = import.meta.env.VITE_CLIENT_ID;


function App({children} : AppProps) {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persitor}>
        <GoogleOAuthProvider clientId={clientId}>
          {children}
          <Toaster/>
        </GoogleOAuthProvider>
      </PersistGate>
    </Provider>
  );
}

export default App;
