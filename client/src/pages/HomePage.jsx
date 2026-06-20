import { iconMap } from "../components/icons";
import Seo from "../components/Seo";
import HeroSection from "../components/HeroSection";
import TeamGrid from "../components/TeamGrid";
import SponsorsMarquee from "../components/SponsorsMarquee";

const focusAreas = [
  {
    title: "Design Excellence",
    subtitle: "Aero & Chassis",
    description:
      "We create aerodynamic, lightweight race machines with precision engineering and student-driven innovation.",
    icon: iconMap.faDraftingCompass,
    accent: "orange"
  },
  {
    title: "Power & Control",
    subtitle: "Powertrain",
    description:
      "Our team develops efficient power systems for high performance, reliability, and track-ready handling.",
    icon: iconMap.faBolt,
    accent: "red"
  },
  {
    title: "Team Culture",
    subtitle: "Collaboration",
    description:
      "We invest in mentorship, hands-on learning, and a culture that makes every team member feel empowered.",
    icon: iconMap.faUsersGear,
    accent: "blue"
  }
];

const accentClassMap = {
  orange: "border-l-orange-500 hover:border-l-orange-400",
  red: "border-l-red-500 hover:border-l-red-400",
  blue: "border-l-blue-500 hover:border-l-blue-400"
};

export default function HomePage() {
  return (
    <div className="cursor-target w-full">
      <Seo
        title="Official Team"
        description="Team Thrusters is NIAMT Racing Club. Discover our mission, engineering spirit, and how we build next-generation race cars."
        path="/"
      />

      <HeroSection />

      <main className="mx-auto w-full max-w-6xl px-4 md:px-6 space-y-16 py-12">
        <section className="mx-auto max-w-3xl text-center">
          <span className="text-xs font-semibold uppercase tracking-wider text-[#ffc955]">
            Welcome to Team Thrusters
          </span>
          <h2 className="mt-4 font-display text-3xl font-bold text-white sm:text-4xl">
            College motorsport, engineered for the next generation.
          </h2>
          <p className="mt-6 text-base leading-8 text-slate-300 sm:text-lg">
            We are a student-run racing club at NIAMT Ranchi. Every season, we design, build, and compete with purpose-built race cars in national and international formula events.
          </p>
        </section>

        <section className="grid gap-6 md:grid-cols-3">
          {focusAreas.map((item) => {
            const Icon = item.icon;
            return (
              <article
                key={item.title}
                className={`rounded-3xl border-l-4 ${accentClassMap[item.accent]} bg-[#081628] p-6 shadow-xl transition-transform duration-300 hover:-translate-y-1 hover:bg-[#0f213f]`}
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/10 text-[#ffc955]">
                  <Icon className="text-2xl" />
                </div>
                <h3 className="mt-5 text-xl font-semibold text-white">{item.title}</h3>
                <p className="mt-3 text-slate-300">{item.description}</p>
                <span className="mt-4 inline-block text-sm uppercase tracking-widest text-[#ffc955]/80">
                  {item.subtitle}
                </span>
              </article>
            );
          })}
        </section>

        <section className="rounded-[2rem] border border-white/10 bg-[#091224] p-8 text-center shadow-2xl backdrop-blur-md">
          <p className="text-sm uppercase tracking-[0.3em] text-[#ffc955]">Ready to join the race?</p>
          <h3 className="mt-4 text-3xl font-bold text-white sm:text-4xl">
            Build with us, compete with us, represent NIAMT.
          </h3>
          <p className="mx-auto mt-4 max-w-2xl text-base leading-8 text-slate-300">
            From design and fabrication to testing and competition, we welcome driven students who want real engineering experience.
          </p>
          <a
            href="/contact"
            className="mt-8 inline-flex items-center justify-center rounded-full border border-[#ff7d59] bg-[#ff7d59]/10 px-8 py-3 text-sm font-semibold uppercase tracking-[0.2em] text-[#ffb77f] transition hover:bg-[#ff7d59]/20"
          >
            Contact the Team
          </a>
        </section>

        <section>
          <div className="mb-10 text-center">
            <span className="text-xs font-semibold uppercase tracking-wider text-[#ffc955]">The Crew</span>
            <h2 className="mt-3 font-display text-3xl font-bold text-white sm:text-4xl">Meet the Team</h2>
          </div>
          <TeamGrid />
        </section>

        <section>
          <div className="mb-10 text-center">
            <span className="text-xs font-semibold uppercase tracking-wider text-[#ffc955]">Our Partners</span>
            <h2 className="mt-3 font-display text-3xl font-bold text-white sm:text-4xl">Sponsored by Industry Leaders</h2>
          </div>
          <SponsorsMarquee />
        </section>
      </main>
    </div>
  );
}
