import { Audiowide, Prompt } from "next/font/google";

export const promptFont = Prompt({
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
  display: "swap",
  variable: "--font-prompt",
});
export const AudiowideFont = Audiowide({
  weight: ["400"],
  subsets: ["latin"],
  display: "swap",
});
