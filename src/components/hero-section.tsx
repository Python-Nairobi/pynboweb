import {
  RainbowButton,
  RainbowGreyButton,
} from "@/components/ui/rainbow-button";

export default function HeroSection() {
  return (
    <div className="relative overflow-hidden py-24 lg:py-32">
      <div className="container mx-auto max-w-7xl px-8">
        <div className="max-w-2xl text-center mx-auto">
          <div className="flex justify-center gap-4 mb-10">
            <RainbowButton>
              <a
                href="https://paystack.com/buy/pyconke-2026-early-bird"
                target="_blank"
                rel="noreferrer"
              >
                Get Your Ticket
              </a>
            </RainbowButton>
            <RainbowGreyButton>
              <a
                href="https://cfp.pycon.ke/pycon-kenya-2026/cfp"
                target="_blank"
                rel="noreferrer"
              >
                Call For Speakers
              </a>
            </RainbowGreyButton>
          </div>
          <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
            Welcome to PyCon Kenya 2026
          </h1>
          <h3 className="pt-6 text-2xl">2nd - 3rd October, 2026</h3>
          <h4 className="pt-6 text-1xl">TBC</h4>
          <h4 className="pt-6 text-1xl">
            <a
              href="https://discord.gg/SSXfTkJ3"
              target="_blank"
              rel="noreferrer"
              className="underline"
            >
              Join Our Discord Server
            </a>
          </h4>
          <p className="my-6 text-xl text-muted-foreground">
            Africa's largest Python conference, held in Nairobi, Kenya. Join us
            for a weekend of inspiring talks, informative workshops, and fun
            networking events.
          </p>
        </div>
        <div className="mt-10 relative max-w-7xl mx-auto">
          <img
            src="/gallery/landing-page.jpg"
            className="rounded-xl"
            alt="PyConKE 2022"
          />
          <div className="absolute bottom-12 -start-20 -z-1 w-48 h-48 bg-linear-to-b from-primary-foreground via-primary-foreground to-background p-px rounded-lg">
            <div className="w-48 h-48 rounded-lg bg-background/10" />
          </div>
          <div className="absolute -top-12 -end-20 -z-1 w-48 h-48 bg-linear-to-t from-primary-foreground via-primary-foreground to-background p-px rounded-full">
            <div className="w-48 h-48 rounded-full bg-background/10" />
          </div>
        </div>
      </div>
    </div>
  );
}
