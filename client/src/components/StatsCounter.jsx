import { useEffect, useRef, useState } from "react";
import { useInView } from "react-intersection-observer";

const stats = [
  { label: "Competitions", value: 3 },
  { label: "Team Members", value: 24 },
  { label: "Podium Finishes", value: 2 }
];

function CountUp({ target, play }) {
  const [value, setValue] = useState(0);
  const startRef = useRef(null);

  useEffect(() => {
    if (!play) return;

    const duration = 1100;
    const tick = (ts) => {
      if (!startRef.current) startRef.current = ts;
      const progress = Math.min((ts - startRef.current) / duration, 1);
      setValue(Math.floor(target * progress));
      if (progress < 1) requestAnimationFrame(tick);
    };

    const id = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(id);
  }, [target, play]);

  return <span>{value}</span>;
}

export default function StatsCounter() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.25 });

  return (
    <section ref={ref} className="section stats-section reveal-section">
      <div className="mx-auto grid w-full grid-cols-1 gap-6 rounded-2xl border border-[#2a2a2a] bg-[#111111bf] p-6 shadow-xl md:grid-cols-3">
        {stats.map((item) => (
          <article key={item.label} className="stat-card">
            <p className="stat-count text-4xl font-accent tracking-wide text-[#e8192c]">
              <CountUp target={item.value} play={inView} />
            </p>
            <p className="mt-1 text-white/85">{item.label}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
