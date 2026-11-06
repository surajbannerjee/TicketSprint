import { Plus_Jakarta_Sans, Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/Common/Header";
import Footer from "@/components/Common/Footer";

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-heading",
  display: "swap",
  weight: ["400", "500", "600", "700", "800"],
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata = {
  title: "TicketSprint",
  description: "TicketSprint - Fast and Modern Ticket Management",
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${plusJakartaSans.variable} ${inter.variable} dark h-full antialiased`}
    >
      <body className="min-h-full flex flex-col font-sans bg-background text-foreground overflow-x-hidden">
        <Header />
        <div className="flex-1 w-full overflow-x-hidden">{children}</div>
        <Footer />
      </body>
    </html>
  );
}
