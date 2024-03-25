import { useContext, useEffect } from "react";
import { useRouter } from "next/router";
import { DateTime } from "luxon";

import { UserContext } from "@/pages/_app";

function useUser() {
  const router = useRouter();
  const { user, setUser } = useContext(UserContext);

  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem("goodreader-auth"));

    if (userData)
      console.log({
        expires: DateTime.fromMillis(userData?.expires).toLocaleString(
          DateTime.DATETIME_FULL_WITH_SECONDS
        ),
        isExpired: DateTime.now() > DateTime.fromMillis(userData?.expires),
      });

    const fetchCurrentUser = async () => {
      if (
        !userData ||
        DateTime.now() > DateTime.fromMillis(userData?.expires)
      ) {
        localStorage.removeItem("goodreader-auth");
        router.push("/login");
      } else {
        setUser(userData);
      }
    };

    if (!user) fetchCurrentUser();
  }, [user]);

  return { user, setUser };
}

export default useUser;
