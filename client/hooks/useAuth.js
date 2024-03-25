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
      let timeoutId;
    
      async function fetchCurrentUser() {
        if (!userData) router.push("/login");
    
        if (userData) {
          api.defaults.headers.common["Authorization"] = `Bearer ${userData.token}`;
    
          await getCurrentUser(api)
            .then((res) => {
              setUser(res.data);
            })
            .catch((error) => {
              const msg =
                error.response.data.msg === "Token expired. Route to login"
                  ? "You are being logged out due to inactivity"
                  : "Error fetching current user";
    
              makeToast(msg, "error", "bg-error-red px-8");
              timeoutId = setTimeout(() => {
                router.push("/");
              }, 2000);
            });
        }
      };
    
      if (!user) fetchCurrentUser();
    
      return () => {
        if (timeoutId) {
          clearTimeout(timeoutId);
        }
      };
    }, [user]);
    
  
    return children;
  }

  return RequireAuth;
}

export default useAuth;
