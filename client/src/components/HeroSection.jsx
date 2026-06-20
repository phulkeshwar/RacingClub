import { useEffect, useMemo, useRef } from "react";
import { motion } from "framer-motion";

const HERO_TEXT = "NIAMT Racing";

export default function HeroSection() {
  const btnRef = useRef(null);

  useEffect(() => {
    const el = btnRef.current;
    if (!el || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const moveBtn = (e) => {
      const rect = el.getBoundingClientRect();
      const x = e.clientX - (rect.left + rect.width / 2);
      const y = e.clientY - (rect.top + rect.height / 2);
      const range = 8;
      const tx = (x / rect.width) * range;
      const ty = (y / rect.height) * range;
      el.style.transform = `translate3d(${tx}px, ${ty}px, 0)`;
    };
    const resetBtn = () => { el.style.transform = "translate3d(0,0,0)"; };

    window.addEventListener("mousemove", moveBtn);
    el.addEventListener("mouseleave", resetBtn);

    return () => {
      window.removeEventListener("mousemove", moveBtn);
      el.removeEventListener("mouseleave", resetBtn);
      resetBtn();
    };
  }, []);

  const charSpans = useMemo(() => {
    const words = HERO_TEXT.split(" ");
    let globalIdx = 0;
    return words.map((word, wordIdx) => {
      const wordSpans = [...word].map((char) => {
        const idx = globalIdx++;
        return (
          <motion.span
            key={`${char}-${idx}`}
            className="hero__title-char inline-block"
            initial={{ clipPath: "inset(0 50% 0 50%)", opacity: 0 }}
            animate={{ clipPath: "inset(0 0% 0 0%)", opacity: 1 }}
            transition={{ duration: 0.85, delay: 0.2 + idx * 0.03, ease: "easeOut" }}
          >
            {char}
          </motion.span>
        );
      });
      return (
        <span key={wordIdx} className="inline-block whitespace-nowrap">
          {wordSpans}
          {wordIdx < words.length - 1 && "\u00A0"}
        </span>
      );
    });
  }, []);

  return (
    <section className="relative flex min-h-[calc(100vh-5rem)] items-center justify-center overflow-hidden hero-section cursor-target" id="home-hero">
      <video
        className="absolute inset-0 h-full w-full object-cover"
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        poster="/assets/race1.jpg"
      >
        <source src="/assets/intro.mp4" type="video/mp4" />
      </video>
      <div className="absolute inset-0 bg-black/45" />

      <div className="hero__particles" aria-hidden="true" />
      <div className="hero__exhaust" aria-hidden="true" />

      <div className="relative z-20 mx-auto flex min-h-[calc(100vh-5rem)] w-full max-w-6xl flex-col items-center justify-center px-4 text-center text-white">
        <h1 className="hero__title mb-4 text-4xl font-bold tracking-tight sm:text-6xl md:text-7xl">{charSpans}</h1>
        <motion.p
          className="hero__subtitle mb-8 text-lg text-[#ffc955] sm:text-2xl"
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.5, ease: "easeOut" }}
        >
          Powering SUPRA SAE India with raw engineering speed.
        </motion.p>
        <motion.button
          ref={btnRef}
          className="btn hero__cta rounded-full border-2 border-[#e8192c] px-8 py-3 text-base font-semibold uppercase tracking-wide text-white shadow-[0_0_22px_rgba(232,25,44,0.36)] transition-all duration-300"
          whileHover={{ scale: 1.045 }}
          whileTap={{ scale: 0.98 }}
          animate={{ boxShadow: ["0 0 6px rgba(232,25,44,0.12)", "0 0 18px rgba(232,25,44,0.8)", "0 0 6px rgba(232,25,44,0.12)"] }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
        >
          Join the Crew
        </motion.button>
      </div>
      <div className="hero__speed-line" aria-hidden="true" />
    </section>
  );
}
