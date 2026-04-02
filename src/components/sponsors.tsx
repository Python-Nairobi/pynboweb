import Image from "next/image";
import { sponsors } from "@/lib/constants";

export default function Sponsors() {
  const mostRecentYear = Math.max(
    ...sponsors.flatMap((sponsor) => sponsor.year.map(Number)),
  ).toString();
  const latestSponsors = sponsors.filter((sponsor) =>
    sponsor.year.includes(mostRecentYear),
  );

  return (
    <div className="border-t py-12 lg:py-20 relative overflow-hidden">
      <div className="max-w-2xl mx-auto pb-20">
        <div className="grid gap-12">
          <div>
            <h2 className="text-3xl font-bold lg:text-4xl text-center">
              Previous Sponsors
            </h2>
          </div>
        </div>
      </div>
      <div className="max-w-6xl mx-auto grid sm:grid-cols-2 lg:grid-cols-4 items-center gap-12">
        {latestSponsors.map((sponsor) => (
          <div key={sponsor.title} className="text-center">
            <div className="flex justify-center items-center w-24 h-24 mx-auto">
              <a href={sponsor.url} target="_blank" rel="noreferrer">
                <Image
                  src={sponsor.image}
                  alt={sponsor.title}
                  width={120}
                  height={120}
                  className="w-24 h-24 object-contain"
                />
              </a>
            </div>
            <div className="mt-3">
              <h3 className="text-lg font-semibold ">
                <a href={sponsor.url} target="_blank" rel="noreferrer">
                  {sponsor.title}
                </a>
              </h3>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
