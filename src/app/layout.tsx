import "./globals.css";
import Navbar from "@/components/navbar/Navbar";
import HeroSlider from "@/components/site/HeroSlider";
export const metadata = {
  title: "Mixbazar",
  description: "",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fa">
      <body>
        <Navbar />
        <HeroSlider/>
        {children}
      </body>
    </html>
  );
}
