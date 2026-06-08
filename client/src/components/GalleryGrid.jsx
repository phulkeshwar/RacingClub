import { useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";

const photos = [
  "/assets/gallery1.jpg",
  "/assets/gallery2.jpg",
  "/assets/gallery3.jpg",
  "/assets/gallery4.jpg",
  "/assets/gallery5.jpg",
  "/assets/gallery6.jpg"
];

function GalleryItem({ src, index, onOpen }) {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.15 });
  const [loaded, setLoaded] = useState(false);

  return (
    <div ref={ref} className="gallery-item relative overflow-hidden rounded-xl" onClick={() => onOpen(index)}>
      <img
        alt={`gallery ${index + 1}`}
        className={`h-full w-full object-cover transition-all duration-700 ease-out ${loaded ? "gallery-loaded" : ""}`}
        src={inView ? src : "/assets/gallery-placeholder.jpg"}
        loading="lazy"
        onLoad={() => setLoaded(true)}
      />
      <div className="gallery-overlay absolute inset-0 flex items-center justify-center bg-black/20 opacity-0 transition-opacity duration-300 hover:opacity-100">
        <span className="text-2xl text-white">🔍</span>
      </div>
    </div>
  );
}

export default function GalleryGrid() {
  const [openIndex, setOpenIndex] = useState(-1);

  useEffect(() => {
    const keyHandler = (event) => {
      if (openIndex < 0) return;
      if (event.key === "Escape") setOpenIndex(-1);
      if (event.key === "ArrowRight") setOpenIndex((x) => (x + 1) % photos.length);
      if (event.key === "ArrowLeft") setOpenIndex((x) => (x - 1 + photos.length) % photos.length);
    };

    window.addEventListener("keydown", keyHandler);
    return () => window.removeEventListener("keydown", keyHandler);
  }, [openIndex]);

  return (
    <section className="section gallery-section reveal-section">
      <div className="mx-auto grid w-[92vw] max-w-6xl grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {photos.map((src, index) => (
          <GalleryItem key={src} src={src} index={index} onOpen={setOpenIndex} />
        ))}
      </div>

      {openIndex >= 0 && (
        <div className="lightbox absolute inset-0 z-50 flex items-center justify-center bg-black/80 p-6">
          <button onClick={() => setOpenIndex(-1)} className="absolute top-5 right-5 z-50 rounded-full bg-white/20 p-3 text-xl text-white">✕</button>
          <button onClick={() => setOpenIndex((x) => (x - 1 + photos.length) % photos.length)} className="absolute left-5 text-4xl text-white">‹</button>
          <img src={photos[openIndex]} alt={`lightbox ${openIndex + 1}`} className="max-h-[85vh] max-w-[85vw] object-contain" />
          <button onClick={() => setOpenIndex((x) => (x + 1) % photos.length)} className="absolute right-5 text-4xl text-white">›</button>
        </div>
      )}
    </section>
  );
}
