import "@/styles/globals.css";
import { Merriweather, Raleway } from "next/font/google";

const raleway = Raleway({
  subsets: ["latin"],
  weight: ["200", "300", "400", "600"],
  variable: "--font-raleway",
});

const merriweather = Merriweather({
  subsets: ["latin"],
  weight: ["300"],
  variable: "--font-merriweather",
});

export default function App({ Component, pageProps }) {
  return (
    <main className={`${merriweather.variable} ${raleway.variable}`}>
      <Component {...pageProps} />
    </main>
  );
}
