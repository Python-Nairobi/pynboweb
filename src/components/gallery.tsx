import Image from "next/image";
import BlurFade from "@/components/ui/blur-fade";

export default function Gallery({ images }: { images: string[] }) {
  return (
    <div className="border-t py-12 lg:py-20 relative overflow-hidden">
      <div className="container mx-auto px-8">
        <div className="columns-2 gap-4 sm:columns-3">
          {images.map((imageUrl, idx) => (
            <BlurFade key={imageUrl} delay={0.25 + idx * 0.05} inView={true}>
              <Image
                className="mb-4 size-full rounded-lg object-contain"
                src={imageUrl}
                width={600}
                height={600}
                alt="Gallery"
              />
            </BlurFade>
          ))}
        </div>
      </div>
    </div>
  );
}
