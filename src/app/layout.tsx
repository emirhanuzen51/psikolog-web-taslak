import type { Metadata, Viewport } from "next";
import { Cormorant_Garamond, DM_Sans } from "next/font/google";
import "./globals.css";
import { pro } from "@/lib/data";
import { SmoothScroll } from "@/components/site";

const serif = Cormorant_Garamond({ subsets: ["latin", "latin-ext"], weight: ["300", "400", "500"], style: ["normal", "italic"], variable: "--font-cormorant", display: "swap" });
const sans = DM_Sans({ subsets: ["latin", "latin-ext"], variable: "--font-dmsans", display: "swap" });

export const metadata: Metadata = {
  title: `İç Alan Psikoloji | ${pro.name} — Psikolojik danışmanlık ve psikoterapi`,
  description: "Duygularını anlamak, kendini keşfetmek ve yaşam deneyimlerine farklı bir perspektiften bakmak için güvenli bir görüşme alanı.",
};
export const viewport: Viewport = { themeColor: "#f3eee7" };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="tr" className={`${serif.variable} ${sans.variable}`}>
      <body>
        <SmoothScroll />
        {children}
      </body>
    </html>
  );
}
