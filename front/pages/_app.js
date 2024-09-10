import "../src/styles/globals.css";

import { CookiesProvider } from "react-cookie";
import { AlertProvider } from "@/components/Alert";
import { AuthorizationProvider } from "@/store/AuthorizationProvider";

export default function MyApp({ Component, pageProps }) {
	return (
		<CookiesProvider>
			<AlertProvider>
				<AuthorizationProvider>
					<Component {...pageProps} />
				</AuthorizationProvider>
			</AlertProvider>
		</CookiesProvider>
	);
}
