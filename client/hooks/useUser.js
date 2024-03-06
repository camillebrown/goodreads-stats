import { useContext, useEffect } from "react";
import { UserContext } from "@/pages/_app";
import { getCurrentUser } from "@/actions/users";
import { useRouter } from "next/router";

function useUser(api) {
  const router = useRouter();
  const { user, setUser } = useContext(UserContext);

  useEffect(() => {
    const fetchCurrentUser = async () => {
      const currentUser = await getCurrentUser(api);

      if (!user && !currentUser?.data) {
        router.push("/");
      }
      setUser(currentUser);
    };

    if (!user) fetchCurrentUser();
  }, [user]);

  return { user, setUser };
}

export default useUser;
