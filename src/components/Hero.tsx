import { motion, useMotionValue, useSpring, useTransform } from "motion/react";
import { useEffect, useRef } from "react";
import { Apple, ArrowDown, Download } from "lucide-react";
import { PartnerMarquee } from "./PartnerMarquee";
import { InstallSun, SunShape } from "./InstallSun";
import logo from "@/assets/logo.png";
import collageLeft from "@/assets/collage-left.png";
import collageRight from "@/assets/collage-right.png";

const ease = [0.16, 1, 0.3, 1] as const;

function WordsUp({ text, delay = 0, className = "" }: { text: string; delay?: number; className?: string }) {
  return (
    <span className={`block overflow-hidden whitespace-nowrap ${className}`}>
      <motion.span
        className="block"
        initial={{ y: "110%", rotate: 4 }}
        animate={{ y: 0, rotate: 0 }}
        transition={{ duration: 1.05, delay, ease }}
      >
        {text}
      </motion.span>
    </span>
  );
}

export function Hero() {
  const iconRef = useRef<HTMLSpanElement>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const smoothX = useSpring(mouseX, { stiffness: 60, damping: 20 });
  const smoothY = useSpring(mouseY, { stiffness: 60, damping: 20 });
  const leftX = useTransform(smoothX, [-0.5, 0.5], [-22, 22]);
  const leftY = useTransform(smoothY, [-0.5, 0.5], [-14, 14]);
  const rightX = useTransform(smoothX, [-0.5, 0.5], [18, -18]);
  const rightY = useTransform(smoothY, [-0.5, 0.5], [12, -12]);

  useEffect(() => {
    const onMove = (event: PointerEvent) => {
      mouseX.set(event.clientX / window.innerWidth - 0.5);
      mouseY.set(event.clientY / window.innerHeight - 0.5);
    };
    window.addEventListener("pointermove", onMove);
    return () => window.removeEventListener("pointermove", onMove);
  }, [mouseX, mouseY]);

  return (
    <div className="relative flex min-h-screen flex-col overflow-hidden bg-paper">
      <motion.header
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease }}
        className="relative z-30 border-b border-ink/10"
      >
        <div className="mx-auto flex max-w-[1800px] items-center px-6 py-5">
          <a href="/" className="inline-block opacity-90 transition-opacity duration-300 hover:opacity-60">
            <img src={logo} alt="Dotis" width={1038} height={357} className="h-9 w-auto md:h-11" />
          </a>
        </div>
      </motion.header>

      <div className="relative mx-auto grid w-full max-w-[1800px] flex-1 grid-cols-1 items-center gap-8 px-3 py-8 lg:grid-cols-[minmax(300px,1fr)_minmax(560px,0.95fr)_minmax(300px,1fr)] lg:gap-0 lg:px-5">
        <motion.div
          style={{ x: leftX, y: leftY }}
          initial={{ opacity: 0, x: -90, rotate: -7 }}
          animate={{ opacity: 1, x: 0, rotate: -1.5 }}
          transition={{ duration: 1.15, delay: 0.2, ease }}
          className="relative order-2 lg:order-1 lg:-mr-12"
        >
          <img src={collageLeft} alt="Firefighter and rescued dog" width={1122} height={1402} className="mx-auto w-full max-w-[650px] object-contain mix-blend-multiply" />
        </motion.div>

        <div className="relative z-10 order-1 text-center lg:order-2">
          <motion.span
            initial={{ opacity: 0, rotate: -3 }}
            animate={{ opacity: 1, rotate: -1 }}
            transition={{ duration: 0.7, delay: 0.2, ease }}
            className="inline-block bg-tape px-7 py-2.5 font-stamp text-sm font-medium uppercase tracking-[0.3em] text-ink shadow-sm"
          >
            Together, we can
          </motion.span>

          <h1 className="mt-6 font-display text-[clamp(3.25rem,5.6vw,6.2rem)] leading-[0.9] tracking-normal text-ink">
            <WordsUp text="Let your feed," delay={0.35} />
            <WordsUp text="feed someone" delay={0.5} className="text-flare" />
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.75, ease }}
            className="mx-auto mt-7 max-w-xl text-lg leading-relaxed text-ink/80 md:text-xl"
          >
            Share your small slice of unused internet and generate donations for causes that need it most — at no cost to you.
          </motion.p>

          <motion.div initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.9, ease }} className="mt-9">
            <a href="#install" data-cursor-hover className="download-button group inline-flex items-center gap-4 overflow-hidden rounded-full bg-ink py-4 pl-9 pr-4 text-lg font-medium text-paper">
              <span className="relative z-10">Install Dotis</span>
              <span ref={iconRef} className="download-sun relative z-10 grid h-10 w-10 place-items-center text-flare">
                <SunShape className="absolute inset-0 h-full w-full" />
                <span className="relative grid h-7 w-7 place-items-center overflow-hidden rounded-full">
                  <Download className="download-icon h-5 w-5 text-paper" />
                </span>
              </span>
              <span aria-hidden className="download-shine" />
            </a>
          </motion.div>

          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.8, delay: 1.05 }} className="mt-7">
            <p className="text-base font-medium text-ink/80">Available for</p>
            <div className="mt-3 flex items-center justify-center gap-7 text-ink">
              <span title="Windows" className="platform-icon">
                <svg viewBox="0 0 24 24" className="h-7 w-7 fill-current" aria-hidden><path d="M3 5.5 10.5 4.4v7.1H3zM11.6 4.2 21 3v8.5h-9.4zM3 12.5h7.5v7.1L3 18.5zM11.6 12.5H21V21l-9.4-1.3z" /></svg>
              </span>
              <span title="Android" className="platform-icon">
                <svg viewBox="0 0 24 24" className="h-7 w-7 fill-current" aria-hidden><path d="M6 9h12v8a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2zM4 9.5a1.4 1.4 0 0 1 2.8 0v5a1.4 1.4 0 0 1-2.8 0zm13.2 0a1.4 1.4 0 0 1 2.8 0v5a1.4 1.4 0 0 1-2.8 0zM9 20h2v2.6a1.3 1.3 0 0 1-2.6 0V20zm4 0h2v2.6a1.3 1.3 0 0 1-2.6 0V20zM7.4 7.8A4.9 4.9 0 0 1 12 4.2a4.9 4.9 0 0 1 4.6 3.6zm2-4.9.9 1.4-.6.4-.9-1.4zm4.3 0 .6.4-.9 1.4-.6-.4z" /></svg>
              </span>
              <span title="macOS" className="platform-icon"><Apple className="h-7 w-7 fill-current" /></span>
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.8, delay: 1.2 }} className="mt-9 flex flex-col items-center gap-2">
            <span className="font-stamp text-[0.7rem] uppercase tracking-[0.35em] text-ink/70">Scroll to explore</span>
            <motion.span animate={{ y: [0, 8, 0] }} transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}>
              <ArrowDown className="h-5 w-5 text-ink/70" />
            </motion.span>
          </motion.div>
        </div>

        <motion.div
          style={{ x: rightX, y: rightY }}
          initial={{ opacity: 0, x: 90, rotate: 7 }}
          animate={{ opacity: 1, x: 0, rotate: 1.5 }}
          transition={{ duration: 1.15, delay: 0.3, ease }}
          className="relative order-3 lg:-ml-12"
        >
          <img src={collageRight} alt="Volunteer packing food and a koala" width={1122} height={1402} className="mx-auto w-full max-w-[650px] object-contain mix-blend-multiply" />
        </motion.div>
      </div>

      <PartnerMarquee />
      <InstallSun anchorRef={iconRef} />
    </div>
  );
}