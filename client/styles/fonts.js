import { Manrope, Montserrat, Raleway } from "next/font/google";

export const raleway = Raleway({
  subsets: ["latin"],
  style: ["normal"],
  weight: ["200", "300", "400", "600", "800"],
  variable: "--font-raleway",
  preload: false,
});

export const montserrat = Montserrat({
  subsets: ["latin"],
  style: ["normal"],
  weight: ["200", "300", "400", "600", "800"],
  variable: "--font-montserrat",
  preload: false,
});

export const manrope = Manrope({
  subsets: ["latin"],
  style: ["normal"],
  weight: ["200", "300", "400", "600", "800"],
  variable: "--font-manrope",
  preload: false,
});
