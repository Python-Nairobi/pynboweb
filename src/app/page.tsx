import AboutSection from "@/components/about-section";
import Gallery from "@/components/gallery";
import HeroSection from "@/components/hero-section";
import Sponsors from "@/components/sponsors";

const images = [
  "/gallery/IMG_0026.jpg",
  "/gallery/IMG_0057.jpg",
  "/gallery/IMG_0077.jpg",
  "/gallery/IMG_0076.jpg",
  "/gallery/IMG_0101.jpg",
  "/gallery/IMG_0120.jpg",
  "/gallery/DSC_0004-4.jpg",
  "/gallery/DSC_0033-3.jpg",
  "/gallery/DSC_0086-5.jpg",
  "/gallery/DSC_0100.jpg",
  "/gallery/DSC_0142-3.jpg",
  "/gallery/DSC_0221-3.jpg",
  "/gallery/DSC02580.jpg",
  "/gallery/IMG_0131.jpg",
  "/gallery/IMG_0236.jpg",
  "/gallery/IMG_0342.jpg",
  "/gallery/IMG_0451.jpg",
  "/gallery/IMG_0473.jpg",
  "/gallery/IMG_0481.jpg",
  "/gallery/DSC_0339-3.jpg",
  "/gallery/DSC_0354-3.jpg",
  "/gallery/DSC_0427-3.jpg",
  "/gallery/DSC_0508-2.jpg",
  "/gallery/DSC_0572-2.jpg",
  "/gallery/DSC_0618-3.jpg",
  "/gallery/DSC_0623-4.jpg",
  "/gallery/DSC_0666-4.jpg",
  "/gallery/DSC_0692-4.jpg",
  "/gallery/DSC_0817-3.jpg",
  "/gallery/DSC_0965-3.jpg",
  "/gallery/DSC_0987-3.jpg",
];

export default function Home() {
  return (
    <>
      <HeroSection />
      <AboutSection />
      <Gallery images={images} />
      <Sponsors />
    </>
  );
}
