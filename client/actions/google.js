import axios from "axios";

export const getGoogleBooks = async (query) => {
  if (!query) return;
  const result = await axios.get(
    `${process.env.NEXT_PUBLIC_GOOGLE_API_URL}?q=${query}&maxResults=20&key=${process.env.NEXT_PUBLIC_GOOGLE_API_KEY}`
  );

  return result;
};
