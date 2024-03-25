"use client";
import "@/styles/globals.css";
import "@/styles/fonts.js";
import axios from "axios";
import { createContext, useEffect, useContext, useState } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import classNames from "classnames";
import Navbar from "@/components/layout/Navbar";
import { useRouter } from "next/router";
import { raleway, serif } from "@/styles/fonts.js";
import { getCurrentUser } from "@/actions/users";
import useToast from "@/hooks/useToast";

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
  const { pathname } = useRouter();
  const [user, setUser] = useState(null);
  const [books, setBooks] = useState(null);
  const [dataLoading, setDataLoading] = useState(false);

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
              dataLoading,
              setDataLoading,
            }}
          >
            <main className={classNames(serif.variable, raleway.variable)}>
              {!baseRoutes.includes(pathname) && <Navbar />}
              <RequireAuth>
                <Component {...pageProps} />
              </RequireAuth>
            </main>
          </BooksContext.Provider>
        </UserContext.Provider>
      </ApiContext.Provider>
    </QueryClientProvider>
  );
}

function RequireAuth({ children }) {
  const router = useRouter();
  const api = useContext(ApiContext);
  const makeToast = useToast();

  useEffect(() => {
    const fetchCurrentUser = async () => {
      try {
        const current_user = await getCurrentUser(api);
        if (current_user) {
          api.defaults.headers.common[
            "Authorization"
          ] = `Bearer ${current_user.token}`;
        }
      } catch (error) {
        makeToast(
          error.response.status === 401
            ? "You are being logged out due to inactivity"
            : "Error fetching current user",
          "error",
          "px-8"
        );
        setTimeout(() => {
          router.push("/");
        }, 2000);
      }
    };

    fetchCurrentUser();
  }, []);

  return children;
}
