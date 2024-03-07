import { Raleway } from "next/font/google";
import localFont from "next/font/local";

export const serif = localFont({
  src: [
    {
      path: '../styles/fonts/Merriweather/Merriweather-Black.ttf',
      weight: '900',
      style: 'normal',
    },
    {
      path: '../styles/fonts/Merriweather/Merriweather-BlackItalic.ttf',
      weight: '900',
      style: 'italic',
    },
    {
      path: '../styles/fonts/Merriweather/Merriweather-Bold.ttf',
      weight: '700',
      style: 'normal',
    },
    {
      path: '../styles/fonts/Merriweather/Merriweather-BoldItalic.ttf',
      weight: '700',
      style: 'italic',
    },
    {
      path: '../styles/fonts/Merriweather/Merriweather-Light.ttf',
      weight: '300',
      style: 'normal',
    },
    {
      path: '../styles/fonts/Merriweather/Merriweather-Regular.ttf',
      weight: '400',
      style: 'normal',
    },
  ],
  style: ["normal", "italic"],
  weight: ["300", "400", "700", "900"],
  variable: "--font-serif",
})

export const raleway = Raleway({
  subsets: ["latin"],
  style: ["normal", "italic"],
  weight: ["200", "300", "400", "600"],
  variable: "--font-raleway",
});