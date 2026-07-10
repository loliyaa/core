import Marquee from "react-fast-marquee";

const WORDS = [
  "POUR UN MONDE PLUS JUSTE",
  "URGENCE & DÉVELOPPEMENT",
  "DIGNITÉ",
  "TRANSPARENCE",
];

export const MarqueeBand = () => {
  return (
    <section
      data-testid="marquee-section"
      className="bg-[#FDFDFD] py-14 md:py-20 border-y border-zinc-200 overflow-hidden"
    >
      <Marquee speed={40} gradient={false} autoFill>
        {WORDS.map((w, i) => (
          <div key={i} className="flex items-center">
            <span className="font-heading font-black text-6xl md:text-8xl tracking-tighter text-stroke px-8">
              {w}
            </span>
            <span className="h-4 w-4 rounded-full bg-[#D62828] mx-2" />
          </div>
        ))}
      </Marquee>
    </section>
  );
};
