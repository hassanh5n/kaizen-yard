"use client";

import Link from "next/link";
import { useRef, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { photoSrcSet, photoUrl, type Photo } from "@/lib/cars";

// Native scroll-snap carousel: the browser does the swipe physics (momentum, rubber-banding),
// we only track which slide is showing and drive the arrows/dots/thumbs.
export function Carousel({
  photos,
  href,
  sizes = "(min-width: 1100px) 360px, (min-width: 700px) 50vw, 100vw",
  priority = false,
  thumbs = false,
  label,
}: {
  photos: Photo[];
  href?: string;
  sizes?: string;
  priority?: boolean;
  thumbs?: boolean;
  label: string;
}) {
  const track = useRef<HTMLDivElement>(null);
  const [index, setIndex] = useState(0);
  const many = photos.length > 1;

  const go = (i: number) => {
    const el = track.current;
    if (!el) return;
    const n = (i + photos.length) % photos.length;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    el.scrollTo({ left: n * el.clientWidth, behavior: reduce ? "auto" : "smooth" });
  };

  const onScroll = () => {
    const el = track.current;
    if (el) setIndex(Math.round(el.scrollLeft / el.clientWidth));
  };

  return (
    <div className={`carousel${thumbs ? " carousel--gallery" : ""}`} role="region" aria-roledescription="carousel" aria-label={label}>
      <div className="carousel__track" ref={track} onScroll={onScroll} tabIndex={many ? 0 : -1} onKeyDown={(e) => {
        if (e.key === "ArrowRight") { e.preventDefault(); go(index + 1); }
        if (e.key === "ArrowLeft") { e.preventDefault(); go(index - 1); }
      }}>
        {photos.map((p, i) => {
          const img = (
            <img
              src={photoUrl(p.path, 960)}
              srcSet={photoSrcSet(p.path)}
              sizes={sizes}
              alt={p.alt}
              width={960}
              height={640}
              loading={priority && i === 0 ? "eager" : "lazy"}
              fetchPriority={priority && i === 0 ? "high" : undefined}
              decoding="async"
              draggable={false}
            />
          );
          return (
            <div className="carousel__slide" key={p.path} role="group" aria-roledescription="slide" aria-label={`${i + 1} of ${photos.length}`}>
              {href ? <Link href={href} tabIndex={-1}>{img}</Link> : img}
            </div>
          );
        })}
      </div>

      {many && (
        <>
          <button className="carousel__arrow carousel__arrow--prev" aria-label="Previous photo" onClick={() => go(index - 1)}>
            <ChevronLeft size={20} aria-hidden="true" />
          </button>
          <button className="carousel__arrow carousel__arrow--next" aria-label="Next photo" onClick={() => go(index + 1)}>
            <ChevronRight size={20} aria-hidden="true" />
          </button>
          {!thumbs && (
            <div className="carousel__dots" aria-hidden="true">
              {photos.map((p, i) => (
                <span key={p.path} className={i === index ? "is-on" : undefined} />
              ))}
            </div>
          )}
          <span className="carousel__count" aria-live="polite">
            {index + 1} / {photos.length}
          </span>
        </>
      )}

      {thumbs && many && (
        <div className="thumbs">
          {photos.map((p, i) => (
            <button key={p.path} aria-label={`Show photo ${i + 1}`} aria-current={i === index ? "true" : undefined} onClick={() => go(i)}>
              <img src={photoUrl(p.path, 500)} alt="" width={120} height={80} loading="lazy" />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
