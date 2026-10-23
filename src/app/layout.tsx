import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import "./globals.css";

export const metadata = {
  title: "Bazar Dor - Daily Grocery Price Tracker",
  description: "Track daily market prices in Bangladesh",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" data-theme="light">
      <body className="min-h-screen flex flex-col justify-between bg-gray-50 text-gray-800">
        <Navbar />
        <main className="flex-grow">{children}</main>
        <Footer />
      </body>
    </html>
  );
}