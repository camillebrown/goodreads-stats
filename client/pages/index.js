import axios from "axios";
import { useEffect } from "react";

export default function Home() {
  useEffect(() => {
    async function fetchData() {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/current_user`
      );
      console.log(!response.data);
    }
    fetchData();
  }, []);
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div>Hi there</div>
    </main>
  );
}
