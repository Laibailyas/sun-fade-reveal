import { motion, useMotionValue, useMotionValueEvent, useScroll, useSpring, useTransform } from "motion/react";
import { useEffect, type RefObject } from "react";
import { Download } from "lucide-react";

const POINTS = 48;
const sunPath = (() => {
  const pts: string[] = [];
  for (let i = 0; i < POINTS * 2; i++) {
    const r = i % 2 === 0 ? 50 : 43;
    const a = (Math.PI * i) / POINTS - Math.PI / 2;
    pts.push(`${(50 + r * Math.cos(a)).toFixed(2)},${(50 + r * Math.sin(a)).toFixed(2)}`);
  }
  return pts.join(" ");
})();

export function SunShape({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 100 100" className={className} aria-hidden>
      <polygon points={sunPath} fill="currentColor" />
    </svg>
  );
}

const START_SIZE = 40;
const END_SIZE = 260;
const RANGE = 700;
const easeInOut = (t: number) => (t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2);
const clamp01 = (v: number) => Math.min(1, Math.max(0, v));
const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

export function InstallSun({ anchorRef }: { anchorRef: RefObject<HTMLElement | null> }) {
  const { scrollY } = useScroll();
  const x = useMotionValue(-999);
  const y = useMotionValue(-999);
  const size = useMotionValue(START_SIZE);
  const badgeOpacity = useMotionValue(0);
  const textTarget = useMotionValue(0);
  const iconTarget = useMotionValue(1);
  // Springs keep the icon fade-out and the label fade-in soft instead of snapping.
  const textOpacity = useSpring(textTarget, { stiffness: 90, damping: 26 });
  const iconOpacity = useSpring(iconTarget, { stiffness: 80, damping: 24 });
  const fontSize = useTransform(size, (s) => s * 0.095);

  const update = (sy: number) => {
    const el = anchorRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const p = easeInOut(clamp01(sy / RANGE));
    const s = lerp(START_SIZE, END_SIZE, p);
    const startX = rect.left + rect.width / 2 - s / 2;
    const startY = rect.top + sy + rect.height / 2 - s / 2;
    const endX = window.innerWidth - s * 0.72;
    const endY = window.innerHeight - s * 0.72;
    x.set(lerp(startX, endX, p));
    y.set(lerp(startY, endY, p));
    size.set(s);
    badgeOpacity.set(sy > 2 ? 1 : 0);
    // Icon stays a while after the sun leaves the button, then fades away.
    iconTarget.set(1 - clamp01((p - 0.35) / 0.35));
    // Label only appears once the sun has settled into the bottom-right corner.
    textTarget.set(clamp01((p - 0.9) / 0.09));
  };

  useMotionValueEvent(scrollY, "change", update);
  useEffect(() => {
    const run = () => update(window.scrollY);
    run();
    const t = setTimeout(run, 1600);
    window.addEventListener("resize", run);
    return () => {
      clearTimeout(t);
      window.removeEventListener("resize", run);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <motion.a
      href="#install"
      data-cursor-hover
      aria-label="Install Dotis"
      className="install-sun fixed left-0 top-0 z-40 block text-flare"
      style={{ x, y, width: size, height: size, opacity: badgeOpacity }}
    >
      <SunShape className="h-full w-full drop-shadow-[0_18px_40px_rgba(0,0,0,0.25)]" />
      <motion.span style={{ opacity: iconOpacity }} className="absolute inset-0 grid place-items-center">
        <Download className="h-1/2 w-1/2 text-paper" />
      </motion.span>
      <motion.span
        style={{ opacity: textOpacity, fontSize }}
        className="install-sun-text absolute inset-0 grid place-items-center text-center font-sans font-normal leading-[1.3] text-paper"
      >
        <span>
          Install
          <br />
          Dotis
        </span>
      </motion.span>
    </motion.a>
  );
}

