import { store, persistor } from "./redux/store";
import { PersistGate } from "redux-persist/integration/react";
import { Provider } from "react-redux";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { Toaster } from "react-hot-toast";
import { QueryClient, QueryClientProvider } from "react-query";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { SocketProvider } from "./contexts/SocketContext";
import NotificationHandler from "./components/notification/NotificationHandler";
import { Routes, Route, useRoutes } from "react-router-dom";
import routes from "./routes/AllRoutes/allRoutes.tsx";
import { useVideoCall, VideoCallProvider } from "./contexts/VideoCallContext.tsx";
import VideoCallComponent from "./components/videoCall/VideoCallComponent.tsx";

const theme = createTheme();
const clientId = import.meta.env.VITE_CLIENT_ID;
const queryClient = new QueryClient();

function App() {
  const routing = useRoutes(routes);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <QueryClientProvider client={queryClient}>
        <Provider store={store}>
          <PersistGate loading={null} persistor={persistor}>
            <GoogleOAuthProvider clientId={clientId}>

                <SocketProvider>
                  <VideoCallProvider>
                  <NotificationHandler />
                  {routing}
                  <Toaster />
                  <ConditionalVideoCallComponent/>
                  </VideoCallProvider>
                </SocketProvider>
            
            </GoogleOAuthProvider>
          </PersistGate>
        </Provider>
      </QueryClientProvider>
    </ThemeProvider>
  );
}

const ConditionalVideoCallComponent = () => {
  const { isCallRequested , isCallAccepted} = useVideoCall()
  if(isCallRequested || isCallAccepted){
    return <VideoCallComponent/>
  }
  return null
} 


export default App;
