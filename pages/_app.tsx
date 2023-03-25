import "../styles/globals.css";
import type { AppProps } from "next/app";
import { Libre_Franklin } from "@next/font/google";

// If loading a variable font, you don't need to specify the font weight
const libre_franklin = Libre_Franklin({
  weight: "400",
  subsets: ["latin"],
});

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <div className={`${libre_franklin.className}`}>
      <Component {...pageProps} />
    </div>
  );
}

export default MyApp;
