"use client";
import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";
import Image from "next/image";
import { type RefObject, useEffect, useId, useRef, useState } from "react";
import { useOutsideClick } from "@/hooks/use-outside-click";

const team = [
  {
    description: "Kelvin Ndemo",
    id: "kelvin",
    title: "Organizer",
    src: "/team/kelvin.jpg",
    ctaText: "Visit",
    ctaLink: "#",
    content: () => {
      return (
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat.
          <br /> <br /> Duis aute irure dolor in reprehenderit in voluptate
          velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint
          occaecat cupidatat non proident, sunt in culpa qui officia deserunt
          mollit anim id est laborum.
        </p>
      );
    },
  },
  {
    description: "Monica Oyugi",
    id: "monica",
    title: "Organizer",
    src: "/team/monica.jpg",
    ctaText: "Visit",
    ctaLink: "https://www.linkedin.com/in/monicaoyugi",
    content: () => {
      return (
        <p>
          I am a Quality Assurance Engineer with over six years of experience in
          the tech ecosystem. My background includes roles in software
          engineering, product management, digital marketing, and event
          organization within the tech community. I actively contribute to the
          tech landscape as a member of the Code of Conduct (CoC) for the Python
          Software Foundation and as the volunteer co-chair for DjangoConUs.
          Additionally, I serve on the CoC for Droidcon Kenya and the API
          Festival and for Women Techmakers by Google.
          <br /> <br />
          My mission is to enhance technology by helping and connecting
          engineers and fostering a collaborative environment where innovation
          can thrive.
        </p>
      );
    },
  },

  {
    description: "Stephany Owino",
    id: "stephany",
    title: "Event Manager",
    src: "/team/stephany.jpg",
    ctaText: "Visit",
    ctaLink: "#",
    content: () => {
      return (
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat.
          <br /> <br /> Duis aute irure dolor in reprehenderit in voluptate
          velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint
          occaecat cupidatat non proident, sunt in culpa qui officia deserunt
          mollit anim id est laborum.
        </p>
      );
    },
  },
  {
    description: "Prisca Akinyi",
    id: "prisca",
    title: "Event Manager",
    src: "/team/prisca.jpg",
    ctaText: "Visit",
    ctaLink: "#",
    content: () => {
      return (
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat.
          <br /> <br /> Duis aute irure dolor in reprehenderit in voluptate
          velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint
          occaecat cupidatat non proident, sunt in culpa qui officia deserunt
          mollit anim id est laborum.
        </p>
      );
    },
  },
  {
    description: "Rodney Osodo",
    id: "rodney",
    title: "Program Director",
    src: "/team/rodney.jpg",
    ctaText: "Visit",
    ctaLink: "http://www.rodneyosodo.com",
    content: () => {
      return (
        <p>
          After spending 5 years learning how to build robots in Mechatronics
          Engineering, I decided the most rebellious career move was to...sit at
          a desk and write software all day.
          <br /> <br />
          In my spare time, I convince mechanical engineers that Python isn't a
          snake and convince software developers that robots won't take their
          jobs... yet.
        </p>
      );
    },
  },
];

export function OrganisingTeam() {
  const [active, setActive] = useState<(typeof team)[number] | boolean | null>(
    null,
  );
  const id = useId();
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setActive(false);
      }
    }

    if (active && typeof active === "object") {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [active]);

  useOutsideClick(ref as RefObject<HTMLDivElement>, () => setActive(null));

  return (
    <div className="border-t py-12 lg:py-20 relative overflow-hidden">
      <AnimatePresence>
        {active && typeof active === "object" && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/20 h-full w-full z-10"
          />
        )}
      </AnimatePresence>
      <AnimatePresence>
        {active && typeof active === "object" ? (
          <div className="fixed inset-0  grid place-items-center z-100">
            <motion.button
              key={`button-${active.id}-${id}`}
              layout={true}
              initial={{
                opacity: 0,
              }}
              animate={{
                opacity: 1,
              }}
              exit={{
                opacity: 0,
                transition: {
                  duration: 0.05,
                },
              }}
              className="flex absolute top-2 right-2 lg:hidden items-center justify-center bg-white rounded-full h-6 w-6"
              onClick={() => setActive(null)}
            >
              <X />
            </motion.button>
            <motion.div
              layoutId={`card-${active.id}-${id}`}
              ref={ref}
              className="w-full max-w-[500px]  h-full md:h-fit md:max-h-[90%]  flex flex-col bg-white dark:bg-neutral-900 sm:rounded-3xl overflow-hidden"
            >
              <motion.div layoutId={`image-${active.id}-${id}`}>
                <Image
                  priority={true}
                  width={1000}
                  height={1000}
                  src={active.src}
                  alt={active.title}
                  className="w-full h-80 lg:h-80 sm:rounded-tr-lg sm:rounded-tl-lg object-cover object-top"
                />
              </motion.div>

              <div>
                <div className="flex justify-between items-start p-4">
                  <div className="">
                    <motion.h3
                      layoutId={`title-${active.id}-${id}`}
                      className="font-medium text-neutral-700 dark:text-neutral-200 text-base"
                    >
                      {active.title}
                    </motion.h3>
                    <motion.p
                      layoutId={`description-${active.description}-${id}`}
                      className="text-neutral-600 dark:text-neutral-400 text-base"
                    >
                      {active.description}
                    </motion.p>
                  </div>

                  <motion.a
                    layout={true}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    href={active.ctaLink}
                    target="_blank"
                    rel="noreferrer"
                    className="px-4 py-3 text-sm rounded-full font-bold bg-green-500 text-white"
                  >
                    {active.ctaText}
                  </motion.a>
                </div>
                <div className="pt-4 relative px-4">
                  <motion.div
                    layout={true}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="text-neutral-600 text-xs md:text-sm lg:text-base h-40 md:h-fit pb-10 flex flex-col items-start gap-4 overflow-auto dark:text-neutral-400 [mask:linear-gradient(to_bottom,white,white,transparent)] [scrollbar-width:none] [-ms-overflow-style:none] [-webkit-overflow-scrolling:touch]"
                  >
                    {typeof active.content === "function"
                      ? active.content()
                      : active.content}
                  </motion.div>
                </div>
              </div>
            </motion.div>
          </div>
        ) : null}
      </AnimatePresence>
      <div className="max-w-2xl mx-auto w-full">
        <h2 className="text-3xl font-bold lg:text-4xl pb-10">Team</h2>
        <p className="mt-3 text-muted-foreground">
          The PyCon KE team is made up of a diverse group of individuals with a
          wide range of experiences and skills. We are committed to providing a
          supportive and inclusive environment for all attendees, speakers,
          sponsors, and volunteers.
        </p>
      </div>
      <div className="my-10 relative max-w-7xl mx-auto">
        <img src="/team/team.jpg" className="rounded-xl" alt="PyConKE 2022" />
      </div>
      <ul className="max-w-2xl mx-auto w-full grid grid-cols-1 md:grid-cols-2 items-start gap-4">
        {team.map((card) => (
          <motion.div
            layoutId={`card-${card.id}-${id}`}
            key={card.id}
            onClick={() => setActive(card)}
            className="p-4 flex flex-col  hover:bg-neutral-50 dark:hover:bg-neutral-800 rounded-xl cursor-pointer"
          >
            <div className="flex gap-4 flex-col  w-full">
              <motion.div layoutId={`image-${card.id}-${id}`}>
                <Image
                  width={1000}
                  height={1000}
                  src={card.src}
                  alt={card.title}
                  className="h-60 w-full  rounded-lg object-cover object-top"
                />
              </motion.div>
              <div className="flex justify-center items-center flex-col">
                <motion.h3
                  layoutId={`title-${card.id}-${id}`}
                  className="font-medium text-neutral-800 dark:text-neutral-200 text-center md:text-left text-base"
                >
                  {card.title}
                </motion.h3>
                <motion.p
                  layoutId={`description-${card.description}-${id}`}
                  className="text-neutral-600 dark:text-neutral-400 text-center md:text-left text-base"
                >
                  {card.description}
                </motion.p>
              </div>
            </div>
          </motion.div>
        ))}
      </ul>
    </div>
  );
}
