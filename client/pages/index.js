import { useState } from "react";
import Navbar from "@/components/layout/Navbar";

export default function Home() {
  const [books, setBooks] = useState();
  return (
    <div className="font-raleway">
      <Navbar setBooks={setBooks} />
      <div>
        {books?.map((b, idx) => {
          return <p key={idx}>{b.volumeInfo.title}</p>;
        })}
      </div>
    </div>
  );
}
