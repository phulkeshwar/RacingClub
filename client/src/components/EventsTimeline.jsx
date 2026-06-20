import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";

const events = [
  { date: "2024-01", title: "SUPRA Round 1", desc: "Engineered 0-100 < 4.1s, top 140km/h" },
  { date: "2024-04", title: "SUPRA Round 2", desc: "3rd place in endurance, 2nd in design review" },
  { date: "2024-07", title: "SUPRA Finals", desc: "Podium finish with 1st in presentation" }
];

export default function EventsTimeline() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.2 });

  return (
    <section ref={ref} className="section timeline-section reveal-section" id="timeline">
      <div className="mx-auto w-full">
        <div className="mb-10 text-center">
          <span className="text-xs font-semibold uppercase tracking-wider text-[#e8192c]">Milestones</span>
          <h2 className="mt-2 font-display text-3xl font-bold text-white sm:text-4xl">Team Events Timeline</h2>
        </div>
        
        <div className="relative">  
          <span className={`timeline-line ${inView ? "active" : ""}`} />
          <div className="space-y-6">
            {events.map((event, idx) => (
              <motion.article
                key={event.date}
                className={`timeline-card relative md:w-[calc(50%-24px)] ${
                  idx % 2 === 0
                    ? "md:mr-auto md:text-right from-left"
                    : "md:ml-auto md:text-left from-right"
                }`}
                initial={{ opacity: 0, x: idx % 2 === 0 ? -120 : 120 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.68, delay: idx * 0.16, ease: "easeOut" }}
              >
                <p className="text-sm font-semibold text-[#ffc955]">{event.date}</p>
                <h3 className="text-xl font-bold text-white mt-1">{event.title}</h3>
                <p className="mt-2 text-slate-300">{event.desc}</p>
              </motion.article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
