import { useContext, useEffect, useState } from "react";

import Navbar from "@/components/layout/Navbar";
import { ApiContext, UserContext } from "./_app";
import { getCurrentUser } from "@/actions/users";
import useUser from "@/hooks/useUser";

export default function Home() {
  const api = useContext(ApiContext);
  const [books, setBooks] = useState();
  useUser(api);

  return (
    <div className="h-screen font-raleway bg-light-gray">
      <Navbar setBooks={setBooks} />
      <div>
        {books?.map((b, idx) => {
          return <p key={idx}>{b.volumeInfo.title}</p>;
        })}
      </div>
    </div>
  );
}
