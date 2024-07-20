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
        <GoogleOAuthProvider clientId="977342398446-gj3k3vi19d53gdh3a3n8c51m10al8ksq.apps.googleusercontent.com">
          {children}
        </GoogleOAuthProvider>
      </PersistGate>
    </Provider>
  );
}

export default App;
