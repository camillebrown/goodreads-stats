import "@/styles/globals.css";
import { createContext, useState } from "react";
import { Merriweather, Raleway } from "next/font/google";
import axios from "axios";

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

export const UserContext = createContext();
export const ApiContext = createContext();

const headers = {
  Accept: "application/json",
  "Content-Type": "application/json",
};

export default function App({ Component, pageProps }) {
  const [user, setUser] = useState(null);

  return (
    <ApiContext.Provider
      value={axios.create({
        baseURL: process.env.NEXT_PUBLIC_BASE_URL,
        headers: headers,
      })}
    >
      <UserContext.Provider value={{ user, setUser }}>
        <main className={`${merriweather.variable} ${raleway.variable}`}>
          <Component {...pageProps} />
        </main>
      </UserContext.Provider>
    </ApiContext.Provider>
  );
}
