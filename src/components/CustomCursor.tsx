import { motion, useMotionValue, useSpring } from "motion/react";
import { useEffect, useState } from "react";
import cursorUrl from "@/assets/cursor.svg";

export function CustomCursor() {
  const x = useMotionValue(-200);
  const y = useMotionValue(-200);
  const sx = useSpring(x, { stiffness: 900, damping: 45, mass: 0.4 });
  const sy = useSpring(y, { stiffness: 900, damping: 45, mass: 0.4 });
  const [active, setActive] = useState(false);
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    if (!window.matchMedia("(pointer: fine)").matches) return;
    setEnabled(true);
    document.documentElement.classList.add("cursor-none-deep");

    const move = (event: PointerEvent) => {
      x.set(event.clientX);
      y.set(event.clientY);
      const target = event.target as HTMLElement | null;
      setActive(Boolean(target?.closest("a,button,[data-cursor-hover]")));
    };

    window.addEventListener("pointermove", move);
    return () => {
      window.removeEventListener("pointermove", move);
      document.documentElement.classList.remove("cursor-none-deep");
    };
  }, [x, y]);

  if (!enabled) return null;

  return (
    <motion.div
      aria-hidden
      className="pointer-events-none fixed left-0 top-0 z-[100] hidden md:block"
      style={{ x: sx, y: sy }}
    >
      <motion.img
        src={cursorUrl}
        alt=""
        width={60}
        height={93}
        className="block w-[60px] origin-top-left"
        animate={{ scale: active ? 1.12 : 1, rotate: active ? -5 : 0 }}
        transition={{ duration: 0.2, ease: "easeOut" }}
      />
    </motion.div>
  );
}