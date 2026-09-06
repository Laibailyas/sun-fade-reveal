import { AnimatePresence, motion, useMotionValueEvent, useScroll } from "motion/react";
import { useRef, useState } from "react";
import { Check, Download, Heart, MousePointerClick } from "lucide-react";

const ease = [0.16, 1, 0.3, 1] as const;

const STEPS = [
  {
    title: ["Download", "the app"],
    description: "One quick install and Dotis starts sharing your unused internet in the background — you won't even notice it.",
  },
  {
    title: ["Activate &", "keep scrolling"],
    description: "Turn it on once, then just browse like you always do. Dotis quietly turns spare bandwidth into real value.",
  },
  {
    title: ["We donate to", "verified charities"],
    description: "The value you generate goes straight to vetted charities — food aid, disaster relief, and wildlife rescue.",
  },
] as const;

function MockupBrowser({ step }: { step: number }) {
  return (
    <div className="w-full max-w-[640px] overflow-hidden rounded-xl border border-paper/15 bg-paper shadow-[0_40px_90px_-30px_rgba(0,0,0,0.6)]">
      <div className="flex items-center gap-2 border-b border-ink/10 bg-paper px-4 py-3">
        <span className="h-3 w-3 rounded-full bg-ink/25" />
        <span className="h-3 w-3 rounded-full bg-ink/25" />
        <span className="h-3 w-3 rounded-full bg-flare" />
        <span className="ml-3 h-5 flex-1 rounded-full bg-ink/8" />
      </div>
      <div className="relative aspect-[4/3] text-ink">
        <AnimatePresence mode="wait">
          {step === 0 && (
            <motion.div
              key="step-0"
              initial={{ opacity: 0, y: 26 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -26 }}
              transition={{ duration: 0.45, ease }}
              className="absolute inset-0 flex flex-col p-6"
            >
              <div className="flex items-center gap-4">
                <div className="grid h-16 w-16 place-items-center rounded-2xl bg-flare">
                  <Download className="h-8 w-8 text-paper" />
                </div>
                <div>
                  <p className="text-lg font-semibold">Dotis — Let your feed, feed someone</p>
                  <p className="mt-1 text-sm text-ink/50">dotis.app • Free</p>
                </div>
              </div>
              <div className="mt-8">
                <div className="flex items-center justify-between text-xs font-medium text-ink/60">
                  <span>Downloading…</span>
                  <span>Ready in seconds</span>
                </div>
                <div className="mt-2 h-2.5 overflow-hidden rounded-full bg-ink/10">
                  <motion.div
                    className="h-full rounded-full bg-flare"
                    initial={{ width: "6%" }}
                    animate={{ width: "100%" }}
                    transition={{ duration: 3.2, ease: "easeInOut", repeat: Infinity }}
                  />
                </div>
              </div>
              <div className="mt-auto grid grid-cols-3 gap-3">
                <div className="h-16 rounded-lg bg-ink/6" />
                <div className="h-16 rounded-lg bg-ink/6" />
                <div className="h-16 rounded-lg bg-ink/6" />
              </div>
            </motion.div>
          )}

          {step === 1 && (
            <motion.div
              key="step-1"
              initial={{ opacity: 0, y: 26 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -26 }}
              transition={{ duration: 0.45, ease }}
              className="absolute inset-0 flex flex-col p-6"
            >
              <div className="flex items-center justify-between">
                <p className="text-lg font-semibold">Your feed</p>
                <div className="flex items-center gap-2 rounded-full bg-ink px-4 py-1.5 text-xs font-medium text-paper">
                  <motion.span
                    className="h-2 w-2 rounded-full bg-flare"
                    animate={{ opacity: [1, 0.25, 1] }}
                    transition={{ duration: 1.4, repeat: Infinity }}
                  />
                  Dotis active
                </div>
              </div>
              <div className="relative mt-5 flex-1 overflow-hidden">
                <motion.div
                  className="absolute left-0 right-0 top-0 flex flex-col gap-3"
                  animate={{ y: [0, -180] }}
                  transition={{ duration: 5, ease: "linear", repeat: Infinity }}
                >
                  {[0, 1, 2, 3, 4, 5].map((i) => (
                    <div key={i} className="flex items-center gap-3 rounded-lg bg-ink/5 p-3">
                      <div className="h-9 w-9 shrink-0 rounded-full bg-flare/30" />
                      <div className="flex-1 space-y-1.5">
                        <div className="h-2 w-2/3 rounded-full bg-ink/15" />
                        <div className="h-2 w-1/2 rounded-full bg-ink/10" />
                      </div>
                    </div>
                  ))}
                </motion.div>
                <div className="pointer-events-none absolute inset-x-0 top-0 h-8 bg-gradient-to-b from-paper to-transparent" />
                <div className="pointer-events-none absolute inset-x-0 bottom-0 h-8 bg-gradient-to-t from-paper to-transparent" />
              </div>
              <div className="mt-4 flex items-center justify-center gap-2 text-xs font-medium text-ink/50">
                <MousePointerClick className="h-3.5 w-3.5 text-flare" />
                Keep scrolling — you're donating right now
              </div>
            </motion.div>
          )}

          {step === 2 && (
            <motion.div
              key="step-2"
              initial={{ opacity: 0, y: 26 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -26 }}
              transition={{ duration: 0.45, ease }}
              className="absolute inset-0 flex flex-col p-6"
            >
              <div className="flex items-center gap-3">
                <motion.div
                  className="grid h-14 w-14 place-items-center rounded-full bg-flare"
                  animate={{ scale: [1, 1.12, 1] }}
                  transition={{ duration: 1.4, repeat: Infinity, ease: "easeInOut" }}
                >
                  <Heart className="h-7 w-7 fill-paper text-paper" />
                </motion.div>
                <div>
                  <p className="text-lg font-semibold">This month's donations</p>
                  <p className="text-sm text-ink/50">Sent automatically, verified publicly</p>
                </div>
              </div>
              <div className="mt-6 flex flex-col gap-3">
                {["Food relief program", "Wildlife rescue fund", "Disaster response"].map((name, i) => (
                  <motion.div
                    key={name}
                    initial={{ opacity: 0, x: -18 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.25 + i * 0.18, duration: 0.4, ease }}
                    className="flex items-center justify-between rounded-lg bg-ink/5 px-4 py-3"
                  >
                    <div className="flex items-center gap-3">
                      <span className="grid h-6 w-6 place-items-center rounded-full bg-flare">
                        <Check className="h-3.5 w-3.5 text-paper" strokeWidth={3} />
                      </span>
                      <span className="text-sm font-medium">{name}</span>
                    </div>
                    <span className="font-stamp text-xs uppercase tracking-widest text-ink/40">Verified</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

function StepTitle({ lines, k }: { lines: readonly string[]; k: number }) {
  return (
    <AnimatePresence mode="wait">
      <motion.h3
        key={k}
        className="font-display text-[clamp(2.6rem,5.4vw,5.4rem)] leading-[0.95] text-paper"
        initial="hidden"
        animate="show"
        exit="exit"
      >
        {lines.map((line, li) => (
          <span key={line} className="block overflow-hidden pb-1">
            <motion.span
              className="block"
              variants={{
                hidden: { y: "110%", rotate: 3 },
                show: { y: 0, rotate: 0, transition: { duration: 0.7, delay: li * 0.08, ease } },
                exit: { y: "-110%", rotate: -2, transition: { duration: 0.35, delay: li * 0.05, ease } },
              }}
            >
              {line}
            </motion.span>
          </span>
        ))}
      </motion.h3>
    </AnimatePresence>
  );
}

export function HowItWorks() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });
  const [step, setStep] = useState(0);

  useMotionValueEvent(scrollYProgress, "change", (p) => {
    const next = Math.min(STEPS.length - 1, Math.max(0, Math.floor(p * STEPS.length)));
    setStep(next);
  });

  const current = STEPS[step] ?? STEPS[0];

  return (
    <section ref={ref} className="relative bg-ink" style={{ height: `${STEPS.length * 110}vh` }}>
      <div className="sticky top-0 flex h-screen items-center overflow-hidden">
        <div className="mx-auto grid w-full max-w-[1800px] grid-cols-1 items-center gap-12 px-6 lg:grid-cols-2 lg:gap-20 lg:px-16">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, ease }}
            className="flex justify-center lg:justify-start"
          >
            <MockupBrowser step={step} />
          </motion.div>

          <div className="relative text-center lg:text-left">
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, ease }}
              className="font-sans text-lg font-medium text-flare md:text-xl"
            >
              How it works
            </motion.p>

            <div className="mt-6">
              <StepTitle lines={current.title} k={step} />
            </div>

            <AnimatePresence mode="wait">
              <motion.p
                key={step}
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -14 }}
                transition={{ duration: 0.4, ease }}
                className="mx-auto mt-6 max-w-md text-lg leading-relaxed text-paper/70 lg:mx-0"
              >
                {current.description}
              </motion.p>
            </AnimatePresence>
          </div>
        </div>

        <div className="absolute right-6 top-1/2 flex -translate-y-1/2 flex-col gap-4 md:right-12">
          {STEPS.map((_, i) => (
            <span
              key={i}
              className={`h-3 w-3 rounded-full border-2 transition-all duration-500 ${
                i <= step ? "scale-110 border-flare bg-flare" : "border-flare/50 bg-transparent"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
