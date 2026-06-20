import { useEffect, useState } from "react";
import { fetchSponsorship } from "../api/content";
import { iconMap } from "../components/icons";
import { ErrorState, LoadingState } from "../components/PageState";
import Seo from "../components/Seo";
import { buildCloudinarySrcSet, getCloudinaryImageUrl } from "../utils/cloudinary";

const panelClass =
  "animate-fadeInUp rounded-2xl border border-white/10 bg-gradient-to-br from-[#112945e6] to-[#09182ad1] p-4";

export default function SponsorshipPage() {
  const [state, setState] = useState({
    loading: true,
    error: "",
    data: { whySponsor: [], reach: [], logos: [] }
  });

  useEffect(() => {
    const load = async () => {
      try {
        const data = await fetchSponsorship();
        setState({ loading: false, error: "", data });
      } catch (_error) {
        setState({
          loading: false,
          error: "Failed to load sponsorship content.",
          data: { whySponsor: [], reach: [], logos: [] }
        });
      }
    };

    load();
  }, []);

  if (state.loading) return <LoadingState />;
  if (state.error) return <ErrorState message={state.error} />;

  return (
    <div className="cursor-target grid gap-4">
      <Seo
        title="Sponsorship"
        description="Partner with NIAMT Racing to support student innovation and motorsport excellence."
        path="/sponsorship"
      />

      <section className="animate-fadeInUp rounded-2xl border border-white/10 bg-gradient-to-br from-[#112945e6] to-[#09182ad1] p-6 shadow-2xl grid gap-8 md:grid-cols-[1.2fr_0.8fr] items-center">
        <div className="text-left">
          <span className="text-xs font-semibold uppercase tracking-wider text-[#ffc955]">
            Sponsorship & Support
          </span>
          <h2 className="mt-2 font-display text-3xl font-bold tracking-tight text-white sm:text-4xl uppercase">
            Partner with Speed
          </h2>
          <p className="mt-4 text-base leading-relaxed text-slate-300">
            Support student innovation, hands-on engineering, and motorsport excellence by sponsoring NIAMT Racing. Your partnership drives our team forward on the national stage.
          </p>
        </div>
        <div className="overflow-hidden rounded-xl border border-white/10 bg-[#020a14a0] p-1.5 shadow-lg">
          <video
            className="w-full aspect-video rounded-lg object-contain"
            autoPlay
            muted
            loop
            playsInline
            preload="auto"
            poster="/assets/raceB.jpg"
            src="/assets/track.0139.mp4"
          />
        </div>
      </section>

      <section className={panelClass}>
        <h3 className="mb-3 font-display text-xl">Why Sponsor Us?</h3>
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {state.data.whySponsor.map((item) => {
            const Icon = iconMap[item.icon] || iconMap.faHandshake;
            return (
              <article key={item._id} className="rounded-xl border-l-4 border-[#ffc95599] bg-[#020a14a0] p-4">
                <Icon className="text-2xl text-[#ffc955]" />
                <h4 className="mt-2 text-lg font-semibold">{item.title}</h4>
                <p className="mt-2 text-slate-300">{item.description}</p>
              </article>
            );
          })}
        </div>
      </section>

      <section className={panelClass}>
        <h3 className="mb-3 font-display text-xl">Our Reach</h3>
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {state.data.reach.map((item) => {
            const Icon = iconMap[item.icon] || iconMap.faBullhorn;
            return (
              <article key={item._id} className="rounded-xl border-l-4 border-[#ffc95599] bg-[#020a14a0] p-4">
                <Icon className="text-2xl text-[#ffc955]" />
                <h4 className="mt-2 text-lg font-semibold">{item.title}</h4>
                <p className="mt-2 text-slate-300">{item.description}</p>
              </article>
            );
          })}
        </div>
      </section>

      <section className={panelClass}>
        <h3 className="mb-3 font-display text-xl">Our Previous Sponsors</h3>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
          {state.data.logos.map((item) => (
            <img
              src={getCloudinaryImageUrl(item.image, { width: 480 })}
              srcSet={buildCloudinarySrcSet(item.image, [240, 360, 480, 720])}
              sizes="(max-width: 640px) 45vw, (max-width: 1024px) 30vw, 20vw"
              alt={item.name}
              key={item._id}
              className="h-24 w-full rounded-lg bg-white/10 p-2 object-contain"
              loading="lazy"
            />
          ))}
        </div>
      </section>
    </div>
  );
}
