const logos = [
  "/assets/club sponsors (1).png",
  "/assets/club sponsors (2).png",
  "/assets/club sponsors (3).png",
  "/assets/club sponsors (4).png",
  "/assets/club sponsors (5).png",
  "/assets/club sponsors (6).png",
  "/assets/club sponsors (7).png",
  "/assets/club sponsors (8).png",
  "/assets/club sponsors.png"
];

export default function SponsorsMarquee() {
  return (
    <section className="section sponsors-section reveal-section">
      <h2 className="mb-4 text-center text-2xl font-bold">Partners and Sponsors</h2>
      <div className="marquee overflow-hidden">
        <div className="marquee-track">
          {[...logos, ...logos].map((src, index) => (
            <div key={`${src}-${index}`} className="marquee-item transition-all duration-300 ease-out hover:scale-[1.1] hover:filter-none">
              <img src={src} alt={`sponsor ${index}`} className="h-20 w-auto object-contain filter grayscale transition-all duration-300" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
