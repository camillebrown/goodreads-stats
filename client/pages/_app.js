"use client";

import "../styles/globals.css";
import "../styles/fonts.js";

import { createContext, useState } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import axios from "axios";
import { useRouter } from "next/router";
import { Toaster } from "react-hot-toast";

import useAuth from "@hooks/useAuth";
import { BooksProvider } from "@hooks/useBooks";
import { SearchResultsProvider } from "@hooks/useSearchResults";
import Navbar from "@layout/Navbar";
import { manrope, montserrat, raleway } from "../styles/fonts.js";

export const ApiContext = createContext();
export const SearchContext = createContext();
export const UserContext = createContext();
export const queryClient = new QueryClient();

export default function App({ Component, pageProps }) {
  const api = configureAxios();
  const RequireAuth = useAuth();
  const { pathname } = useRouter();
  const [user, setUser] = useState(null);

  const baseRoutes = ["/", "/login", "/signup"];
  const isBaseRoute = baseRoutes.includes(pathname);

  return (
    <QueryClientProvider client={queryClient}>
      <ApiContext.Provider value={api}>
        <UserContext.Provider value={{ user, setUser }}>
          <BooksProvider>
            <SearchResultsProvider>
              <main
                className={`${manrope.variable} ${montserrat.variable} ${raleway.variable}`}
              >
                <Toaster
                  position="top-center"
                  reverseOrder={false}
                  gutter={8}
                  toastOptions={{ duration: 5000 }}
                />
                {!isBaseRoute && <Navbar />}
                {["/login", "/signup"].includes(pathname) ? (
                  <Component {...pageProps} />
                ) : (
                  <RequireAuth>
                    <Component {...pageProps} />
                  </RequireAuth>
                )}
              </main>
            </SearchResultsProvider>
          </BooksProvider>
        </UserContext.Provider>
      </ApiContext.Provider>
    </QueryClientProvider>
  );
}

function configureAxios() {
  const axiosInstance = axios.create({
    baseURL: process.env.NEXT_PUBLIC_SERVER_URL,
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    withCredentials: true,
  });

  return axiosInstance;
}
