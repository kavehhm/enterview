import { AppProvider } from "@/Context";
import "@/styles/globals.css";
import { Toaster } from "react-hot-toast";

export default function App({ Component, pageProps }) {
  return (
    <AppProvider>
      <div className="p-10">
        <Toaster />
        <p className="font-bold">
          enter
          <span className="text-blue-600">view</span>
        </p>
        <Component {...pageProps} />
      </div>
    </AppProvider>
  );
}
