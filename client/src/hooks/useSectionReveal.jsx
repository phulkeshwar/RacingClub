import { useEffect } from "react";
import { useLocation } from "react-router-dom";

export default function useSectionReveal() {
  const location = useLocation();

  useEffect(() => {
    if (window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("revealed");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15 }
    );

    const observeExisting = () => {
      document.querySelectorAll(".reveal-section:not(.revealed)").forEach((section) => {
        observer.observe(section);
      });
    };

    observeExisting();

    const mutationObserver = new MutationObserver(() => {
      observeExisting();
    });

    mutationObserver.observe(document.body, {
      childList: true,
      subtree: true
    });

    return () => {
      observer.disconnect();
      mutationObserver.disconnect();
    };
  }, [location.pathname]);
}
