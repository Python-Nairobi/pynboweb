import Image from "next/image";
import { sponsors } from "@/lib/constants";

export default function Sponsors() {
  const years = [...new Set(sponsors.flatMap((sponsor) => sponsor.year))]
    .map(Number)
    .sort((a, b) => b - a);

  return (
    <div className="py-12 lg:py-20 relative overflow-hidden">
      <div className="max-w-2xl mx-auto pb-20">
        <div className="grid gap-12">
          <div>
            <h1 className="text-3xl font-bold lg:text-4xl text-center">
              Previous Sponsors
            </h1>
          </div>
        </div>
      </div>

      {years.map((year) => (
        <div key={year} className="max-w-6xl mx-auto mb-16 border-b-2 pb-8">
          <h2 className="text-2xl font-bold mb-8 text-center">{year}</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 items-center gap-12">
            {sponsors
              .filter((sponsor) => sponsor.year.includes(year.toString()))
              .map((sponsor) => (
                <div key={`${sponsor.title}-${year}`} className="text-center">
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
                    <h3 className="text-lg font-semibold">
                      <a href={sponsor.url} target="_blank" rel="noreferrer">
                        {sponsor.title}
                      </a>
                    </h3>
                  </div>
                </div>
              ))}
          </div>
        </div>
      ))}
    </div>
  );
}
