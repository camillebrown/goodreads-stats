import { useContext, useState } from "react";

import { ApiContext} from "./_app";
import useUser from "@/hooks/useUser";

export default function Home() {
  const api = useContext(ApiContext);
  const [books, setBooks] = useState();
  useUser(api);

  return (
    <div className="h-screen font-raleway bg-light-gray">
      <div>
        {books?.map((b, idx) => {
          return <p key={idx}>{b.volumeInfo.title}</p>;
        })}
      </div>
    </div>
  );
}
