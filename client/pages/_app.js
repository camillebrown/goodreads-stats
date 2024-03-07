"use client";
import "@/styles/globals.css";
import "@/styles/fonts.js";
import axios from "axios";
import { createContext, useState } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import classNames from "classnames";
import Navbar from "@/components/layout/Navbar";
import { useRouter } from "next/router";
import { raleway, serif } from "@/styles/fonts.js";

export const ApiContext = createContext();
export const BooksContext = createContext();
export const UserContext = createContext();
export const queryClient = new QueryClient();

const headers = {
  Accept: "application/json",
  "Content-Type": "application/json",
};

export default function App({ Component, pageProps }) {
  const { pathname } = useRouter();
  const [user, setUser] = useState(null);
  const [books, setBooks] = useState(null);
  const [dataLoading, setDataLoading] = useState(false);
  const [searchResults, setSearchResults] = useState(null);

  const baseRoutes = ["/", "/login"];

  return (
    <QueryClientProvider client={queryClient}>
      <ApiContext.Provider
        value={axios.create({
          baseURL: process.env.NEXT_PUBLIC_BASE_URL,
          headers: headers,
          withCredentials: true,
        })}
      >
        <UserContext.Provider value={{ user, setUser }}>
          <BooksContext.Provider
            value={{
              books,
              setBooks,
              searchResults,
              setSearchResults,
              dataLoading,
              setDataLoading,
            }}
          >
            <main className={classNames(serif.variable, raleway.variable)}>
              {!baseRoutes.includes(pathname) && <Navbar />}
              <Component {...pageProps} />
            </main>
          </BooksContext.Provider>
        </UserContext.Provider>
      </ApiContext.Provider>
    </QueryClientProvider>
  );
}
