import type { Metadata } from "next";
import { Roboto_Mono } from "next/font/google";
import "./globals.css";
import NavBar from "@/components/nav-bar";
import Footer from "@/components/footer";
import { PostHogProvider } from "@/app/providers";

const robotoMono = Roboto_Mono({
  weight: "400",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Welcome to PyCon Kenya 2025",
  description: "Africa's largest Python conference, held in Nairobi, Kenya.",
  authors: [
    {
      name: "Rodney Osodo",
      url: "https://rodneyosodo.com",
    },
  ],
  keywords: [
    "Python",
    "Conference",
    "Africa",
    "Nairobi",
    "Kenya",
    "Developer",
    "Community",
  ],
  openGraph: {
    type: "website",
    title: "Welcome to PyCon Kenya 2025",
    description:
      "Africa's largest Python conference, held in Nairobi, Kenya. Join us for a weekend of inspiring talks, informative workshops, and fun networking events.",
    url: process.env.NEXT_PUBLIC_BASE_URL || "https://pycon.ke",
    siteName: "PyConKE 2025",
    images: [
      {
        url: `${process.env.NEXT_PUBLIC_BASE_URL || "https://pycon.ke"}/opengraph.png`,
        secureUrl: `${process.env.NEXT_PUBLIC_BASE_URL || "https://pycon.ke"}/opengraph.png`,
        alt: "PyConKE 2025",
        type: "image/png",
        width: 1200,
        height: 630,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Welcome to PyCon Kenya 2025",
    description:
      "Africa's largest Python conference, held in Nairobi, Kenya. Join us for a weekend of inspiring talks, informative workshops, and fun networking events.",
    images: [
      {
        url: `${process.env.NEXT_PUBLIC_BASE_URL || "https://pycon.ke"}/opengraph.png`,
        secureUrl: `${process.env.NEXT_PUBLIC_BASE_URL || "https://pycon.ke"}/opengraph.png`,
        alt: "PyConKE 2025",
        type: "image/png",
        width: 1200,
        height: 630,
      },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
  return (
    <html lang="en">
      <body className={`${robotoMono.className} antialiased`}>
        <div className="absolute inset-0 -z-10 h-full w-full bg-white bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px]">
          <NavBar />
          <PostHogProvider>{children}</PostHogProvider>
          <Footer />
        </div>
      </body>
    </html>
  );
}
