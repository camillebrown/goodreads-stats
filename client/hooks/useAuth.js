import { useContext, useEffect } from "react";
import { useRouter } from "next/router";

import useToast from "./useToast";
import { ApiContext, UserContext } from "@/pages/_app";
import { getCurrentUser } from "@/lib/actions/auth";

function useAuth() {
  function RequireAuth({ children }) {
    const router = useRouter();
    const makeToast = useToast();
    const api = useContext(ApiContext);
    const { user, setUser } = useContext(UserContext);

    useEffect(() => {
      async function fetchCurrentUser() {
        try {
          const res = await getCurrentUser(api);
          setUser(res.data);
          router.push("/browse?content=discover");
        } catch (error) {
          console.log('UseAuth: Error fetching current user', error);

          if (error?.response?.data?.msg === "Token expired. Route to login") {
            makeToast("You are being logged out due to inactivity", "error", "px-8");
          }

          setUser(null);
          router.push("/login");
        }
      }

      if (!user) {
        fetchCurrentUser();
      }
    }, [user, api, router, makeToast, setUser]);

    return children;
  }

  return RequireAuth;
}

export default useAuth;
