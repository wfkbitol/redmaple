"use client";

import { useEffect, useState } from "react";
import type { TranslationStrings } from "@/lib/i18n";
import { MapleLeaf } from "@/components/icons";

function createRng(seed: number) {
  let s = seed;
  return () => {
    s = Math.imul(s ^ (s >>> 15), s | 1);
    s ^= s + Math.imul(s ^ (s >>> 7), s | 61);
    return ((s ^ (s >>> 14)) >>> 0) / 4294967296;
  };
}

const particles = Array.from({ length: 24 }, (_, i) => {
  const rng = createRng(i * 7919 + 1);
  return {
    id: i,
    left: `${rng() * 100}%`,
    top: `${rng() * 100}%`,
    size: rng() * 4 + 3,
    duration: `${rng() * 3 + 2.5}s`,
    delay: `${rng() * 3}s`,
    color: i % 2 === 0 ? "var(--color-accent)" : "var(--color-amber)",
  };
});

export function GalleryScene({ translation }: { translation: TranslationStrings["galleryScene"] }) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect -- client mount detection for animation gating
    setMounted(true);
  }, []);

  return (
    <div
      className="relative h-[500px] overflow-hidden rounded-[24px] cursor-default select-none"
      style={{
        background: "var(--color-bg-base)",
        border: "1px solid var(--color-border-subtle)",
      }}
    >
      {/* Flat decorative shapes */}
      <div
        className="absolute rounded-full pointer-events-none"
        style={{
          width: "120px",
          height: "120px",
          left: "15%",
          top: "15%",
          background: "var(--color-accent-muted)",
        }}
      />
      <div
        className="absolute rounded-full pointer-events-none"
        style={{
          width: "80px",
          height: "80px",
          right: "12%",
          bottom: "20%",
          background: "var(--color-amber-soft)",
        }}
      />

      {/* Grid pattern overlay */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: `linear-gradient(var(--color-border-subtle) 1px, transparent 1px), linear-gradient(90deg, var(--color-border-subtle) 1px, transparent 1px)`,
          backgroundSize: "40px 40px",
          opacity: 0.5,
        }}
      />

      {/* Particles — flat dots */}
      {particles.map((p) => (
        <span
          key={p.id}
          className="absolute rounded-full pointer-events-none"
          style={{
            left: p.left,
            top: p.top,
            width: p.size,
            height: p.size,
            background: p.color,
            animation: mounted ? `twinkle ${p.duration} ease-in-out ${p.delay} infinite` : "none",
          }}
        />
      ))}

      {/* Center maple leaf — flat, no blur */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div
          style={{
            color: "var(--color-accent)",
            opacity: 0.12,
          }}
        >
          <MapleLeaf size={140} />
        </div>
      </div>

      {/* Bottom info card — flat */}
      <div className="absolute inset-x-6 bottom-6">
        <div
          className="rounded-2xl p-5"
          style={{
            background: "var(--color-bg-raised)",
            border: "1px solid var(--color-border-subtle)",
          }}
        >
          <p
            className="text-xs font-medium tracking-[0.12em] uppercase mb-2"
            style={{ color: "var(--color-accent)" }}
          >
            {translation.label}
          </p>
          <h2 className="text-xl font-semibold mb-2" style={{ color: "var(--color-fg-primary)" }}>
            {translation.title}
          </h2>
          <p className="text-sm leading-relaxed max-w-xl" style={{ color: "var(--color-fg-secondary)" }}>
            {translation.description}
          </p>
        </div>
      </div>
    </div>
  );
}
