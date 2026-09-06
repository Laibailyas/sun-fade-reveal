import { motion } from "motion/react";

const partners = [
  "WildAid",
  "Feeding America",
  "IFAW",
  "The Nature Conservancy",
  "CARE",
  "OXFAM",
  "Mercy Corps",
  "Direct Relief",
];

export function PartnerMarquee() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 1.25, ease: [0.16, 1, 0.3, 1] }}
      className="border-t border-ink/10 bg-ink/[0.035]"
    >
      <div className="mx-auto flex max-w-[1800px] flex-col items-center gap-4 px-6 py-6 md:flex-row md:gap-10">
        <p className="shrink-0 text-sm leading-tight text-ink/70 md:max-w-[9rem]">
          Trusted by partners<br className="hidden md:block" /> who care
        </p>
        <div className="marquee-mask relative w-full overflow-hidden">
          <div className="animate-marquee flex w-max items-center gap-14 pr-14">
            {[...partners, ...partners].map((name, index) => (
              <span
                key={`${name}-${index}`}
                className="whitespace-nowrap font-display text-xl uppercase text-ink/75 transition-colors duration-300 hover:text-flare"
              >
                {name}
              </span>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
}