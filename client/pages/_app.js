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
import { raleway, manrope, montserrat } from "../styles/fonts.js";

export const ApiContext = createContext();
export const BooksContext = createContext();
export const SearchContext = createContext();
export const UserContext = createContext();
export const queryClient = new QueryClient();

export default function App({ Component, pageProps }) {
  const RequireAuth = useAuth();
  const { pathname } = useRouter();
  const [user, setUser] = useState(null);

  const [books, setBooks] = useState(null);
  const [dataLoading, setDataLoading] = useState(false);
  const [searchResults, setSearchResults] = useState(null);

  const baseRoutes = ["/", "/login"];
  const isBaseRoute = baseRoutes.includes(pathname);

  return (
    <QueryClientProvider client={queryClient}>
      <ApiContext.Provider value={configureAxios()}>
        <UserContext.Provider value={{ user, setUser }}>
          <BooksContext.Provider
            value={{
              books,
              setBooks,
              dataLoading,
              setDataLoading,
              searchResults,
              setSearchResults,
            }}
          >
            <main
              className={`${manrope.variable} ${montserrat.variable} ${raleway.variable}`}
            >
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
              {pathname === "/login" ? (
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

function configureAxios() {
  const axiosInstance = axios.create({
    baseURL: process.env.NEXT_PUBLIC_BASE_URL,
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    withCredentials: true,
  });

  axiosInstance.interceptors.request.use(
    (config) => {
      const userData = JSON.parse(localStorage.getItem("goodreader-auth"));
      if (userData && userData.token) {
        config.headers.Authorization = `Bearer ${userData.token}`;
      }
      return config;
    },
    (error) => {
      console.log("Error with bearer token", error);
      return Promise.reject(error);
    }
  );

  return axiosInstance;
}
