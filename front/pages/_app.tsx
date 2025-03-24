import "../src/styles/globals.css";

import { CookiesProvider } from "react-cookie";
// import { Provider } from "react-redux";
import { AlertProvider } from "@/components/Alert";
import { AuthorizationProvider } from "@/store/AuthorizationProvider";
// import store from '@store'

export default function MyApp({ Component, pageProps }) {
  return (
    // <Provider store={store}>
      <CookiesProvider>
        <AlertProvider>
          <AuthorizationProvider>
            <Component {...pageProps} />
          </AuthorizationProvider>
        </AlertProvider>
      </CookiesProvider>
    // </Provider>
  );
}
