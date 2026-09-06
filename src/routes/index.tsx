import { createFileRoute } from "@tanstack/react-router";
import { CustomCursor } from "@/components/CustomCursor";
import { Hero } from "@/components/Hero";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Dotis — Let your feed, feed someone" },
      { name: "description", content: "Share unused internet and generate donations for causes that need it most — at no cost to you." },
      { property: "og:title", content: "Dotis — Let your feed, feed someone" },
      { property: "og:description", content: "Turn unused bandwidth into donations for wildlife, disaster relief, and food aid." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <main>
      <CustomCursor />
      <Hero />
      <section className="flex min-h-screen items-center justify-center bg-ink px-6 text-paper">
        <h2 className="max-w-3xl text-center font-display text-[clamp(2.5rem,6vw,5.5rem)] leading-[0.95]">Dummy dark section — scroll to watch the sun settle in.</h2>
      </section>
      <section id="install" className="flex min-h-screen items-center justify-center bg-background px-6 text-ink">
        <h2 className="max-w-3xl text-center font-display text-[clamp(2.5rem,6vw,5.5rem)] leading-[0.95]">Dummy light section — the Install Dotis sun stays bottom right.</h2>
      </section>
    </main>
  );
}
