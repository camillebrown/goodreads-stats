"use client";
import "@/styles/globals.css";
import "@/styles/fonts.js";
import axios from "axios";
import classNames from "classnames";
import { Toaster } from "react-hot-toast";
import { useRouter } from "next/router";
import { createContext, useState } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import Navbar from "@/components/layout/Navbar";
import useAuth from "@/hooks/useAuth";
import { raleway, serif } from "@/styles/fonts.js";

export const ApiContext = createContext();
export const BooksContext = createContext();
export const SearchContext = createContext();
export const UserContext = createContext();
export const queryClient = new QueryClient();

const headers = {
  Accept: "application/json",
  "Content-Type": "application/json",
};

export default function App({ Component, pageProps }) {
  const RequireAuth = useAuth();
  const { pathname } = useRouter();
  const [user, setUser] = useState(null);
  const [books, setBooks] = useState(null);
  const [dataLoading, setDataLoading] = useState(false);

  const baseRoutes = ["/", "/login"];
  const isBaseRoute = baseRoutes.includes(pathname);

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
              dataLoading,
              setDataLoading,
            }}
          >
            <main className={classNames(serif.variable, raleway.variable)}>
              <Toaster
                position="top-center"
                reverseOrder={false}
                gutter={8}
                toastOptions={{
                  duration: 3000,
                  style: {
                    boxShadow: "none",
                    minWidth: "20%",
                    background: "none",
                  },
                }}
              />
              {!isBaseRoute && <Navbar />}
              {isBaseRoute ? (
                <Component {...pageProps} />
              ) : (
                <RequireAuth>
                  <Component {...pageProps} />
                </RequireAuth>
              )}
            </main>
          </BooksContext.Provider>
        </UserContext.Provider>
      </ApiContext.Provider>
    </QueryClientProvider>
  );
}