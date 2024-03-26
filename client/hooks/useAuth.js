import { useContext, useEffect } from "react";
import { useRouter } from "next/router";

import useToast from "./useToast";
import { ApiContext, UserContext } from "@/pages/_app";
import { getCurrentUser } from "@/actions/users";

function useAuth() {
  function RequireAuth({ children }) {
    const router = useRouter();
    const makeToast = useToast();
    const api = useContext(ApiContext);
    const { user, setUser } = useContext(UserContext);

    useEffect(() => {
      const userData = JSON.parse(localStorage.getItem("goodreader-auth"));

      async function fetchCurrentUser() {
        if (!userData) router.push("/login");

        if (userData) {
          api.defaults.headers.common[
            "Authorization"
          ] = `Bearer ${userData.token}`;

          await getCurrentUser(api)
            .then((res) => {
              setUser(res.data);
            })
            .catch((error) => {
              console.log(error);
              const msg =
                error?.response?.data?.msg === "Token expired. Route to login"
                  ? "You are being logged out due to inactivity"
                  : error?.response?.data?.msg;

              makeToast(msg, "error", "px-8");
              if (
                error?.response?.data?.msg ===
                "Token expired. Route to login"
              ) {
                router.push("/");
              }
            });
        }
      }

      if (!user) fetchCurrentUser();
    }, [user]);

    return children;
  }

  return RequireAuth;
}

export default useAuth;
