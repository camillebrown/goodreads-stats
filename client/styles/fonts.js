import { Raleway } from "next/font/google";
import localFont from "next/font/local";

export const black_serif = localFont({
  src: "../styles/fonts/Merriweather/Merriweather-Black.ttf",
});
export const black_italic_serif = localFont({
  src: "../styles/fonts/Merriweather/Merriweather-BlackItalic.ttf",
});
export const bold_serif = localFont({
  src: "../styles/fonts/Merriweather/Merriweather-Bold.ttf",
});
export const bold_italic_serif = localFont({
  src: "../styles/fonts/Merriweather/Merriweather-BoldItalic.ttf",
});
export const light_serif = localFont({
  src: "../styles/fonts/Merriweather/Merriweather-Light.ttf",
});
export const regular_serif = localFont({
  src: "../styles/fonts/Merriweather/Merriweather-Regular.ttf",
});

export const raleway = Raleway({
  subsets: ["latin"],
  style: ["normal", "italic"],
  weight: ["200", "300", "400", "600"],
  variable: "--font-raleway",
});