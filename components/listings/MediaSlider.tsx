"use client";

import { useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";

export type MediaItem = { type: "image" | "video"; url: string };

export default function MediaSlider({
  items,
  title,
}: {
  items: MediaItem[];
  title: string;
}) {
  const [[index, direction], setPage] = useState<[number, number]>([0, 0]);

  if (!items.length) {
    return <div className="aspect-16/10 rounded-2xl bg-neutral-100" />;
  }

  const paginate = (d: number) =>
    setPage(([i]) => [(i + d + items.length) % items.length, d]);

  const current = items[index];

  return (
    <div className="relative aspect-16/10 overflow-hidden rounded-2xl bg-black">
      <AnimatePresence initial={false} custom={direction} mode="popLayout">
        <motion.div
          key={index}
          custom={direction}
          variants={{
            enter: (d: number) => ({ x: d > 0 ? -80 : 80, opacity: 0 }),
            center: { x: 0, opacity: 1 },
            exit: (d: number) => ({ x: d > 0 ? 80 : -80, opacity: 0 }),
          }}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{ duration: 0.3 }}
          className="absolute inset-0"
        >
          {current.type === "image" ? (
            <Image
              src={current.url}
              alt={`${title} - ${index + 1}`}
              fill
              sizes="(min-width: 1024px) 60vw, 100vw"
              className="object-cover"
              priority={index === 0}
            />
          ) : (
            <video
              src={current.url}
              controls
              playsInline
              preload="metadata"
              className="h-full w-full object-contain"
            />
          )}
        </motion.div>
      </AnimatePresence>

      {items.length > 1 && (
        <>
          {/* RTL: السابق يمين، التالي شمال */}
          <button
            onClick={() => paginate(-1)}
            aria-label="السابق"
            className="absolute top-1/2 right-3 z-10 -translate-y-1/2 rounded-full bg-white/80 px-3 py-1 text-xl shadow hover:bg-white"
          >
            ›
          </button>
          <button
            onClick={() => paginate(1)}
            aria-label="التالي"
            className="absolute top-1/2 left-3 z-10 -translate-y-1/2 rounded-full bg-white/80 px-3 py-1 text-xl shadow hover:bg-white"
          >
            ‹
          </button>

          <div className="absolute bottom-3 left-1/2 z-10 flex -translate-x-1/2 gap-2">
            {items.map((item, i) => (
              <button
                key={i}
                onClick={() => setPage([i, i > index ? 1 : -1])}
                aria-label={`الانتقال إلى ${i + 1}`}
                className={`h-2.5 rounded-full transition-all ${
                  i === index ? "w-6 bg-white" : "w-2.5 bg-white/50"
                } ${item.type === "video" ? "ring-1 ring-brand-burgundy" : ""}`}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
}