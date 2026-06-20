import { useState } from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";

export default function TrackVideo({ videoUrl }) {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.15 });
  
  const primaryUrl = videoUrl || "/assets/track.0139.mp4";
  const [src, setSrc] = useState(primaryUrl);
  const [loadError, setLoadError] = useState(false);

  const handleVideoError = () => {
    // If the database URL failed, try the local video fallback
    if (src !== "/assets/track.0139.mp4") {
      setSrc("/assets/track.0139.mp4");
    } else {
      setLoadError(true);
    }
  };

  return (
    <section
      ref={ref}
      className={`section track-video-section reveal-section scroll-mt-20 my-12 ${inView ? "revealed" : ""}`}
      id="track-action"
    >
      <div className="mx-auto w-full">
        <div className="mb-8 text-center">
          <motion.span
            className="inline-block rounded-full bg-[#e8192c]/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-[#e8192c] border border-[#e8192c]/20"
            initial={{ opacity: 0, y: -10 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
          >
            Adrenaline on Track
          </motion.span>
          <h2 className="mt-3 font-display text-3xl font-bold tracking-tight text-white sm:text-4xl">
            NIAMT Racing in Action
          </h2>
          <p className="mx-auto mt-3 max-w-2xl text-slate-400">
            Watch our custom-built Formula Student single-seater prototype conquer the tarmac, demonstrating speed, control, and precision engineering.
          </p>
        </div>

        <motion.div
          className="relative mx-auto max-w-4xl overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-b from-[#152e4d]/30 to-[#0b1b2f]/40 p-2 shadow-[0_0_50px_rgba(232,25,44,0.15)] backdrop-blur-md"
          initial={{ opacity: 0, scale: 0.96 }}
          animate={inView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.65, delay: 0.3 }}
        >
          {loadError ? (
            <div className="relative aspect-video w-full rounded-xl overflow-hidden shadow-2xl">
              <img
                src="/assets/raceB.jpg"
                alt="NIAMT Racing on Track"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-black/40 flex items-center justify-center p-4">
                <p className="text-white font-semibold text-center">Video player is offline. Showing track run gallery.</p>
              </div>
            </div>
          ) : (
            <video
              className="w-full rounded-xl shadow-2xl aspect-video object-cover"
              controls
              playsInline
              preload="metadata"
              src={src}
              onError={handleVideoError}
              poster="/assets/raceB.jpg"
            >
              Your browser does not support the video tag.
            </video>
          )}
        </motion.div>
      </div>
    </section>
  );
}
