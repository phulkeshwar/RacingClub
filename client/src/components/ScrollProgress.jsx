import { useEffect, useState } from "react";

export default function ScrollProgress() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const update = () => {
      const total = document.body.scrollHeight - window.innerHeight;
      const percent = total > 0 ? Math.min(100, (window.scrollY / total) * 100) : 0;
      setProgress(percent);
    };

    window.addEventListener("scroll", update, { passive: true });
    update();
    return () => window.removeEventListener("scroll", update);
  }, []);

  return <div className="scroll-progress" style={{ width: `${progress}%` }} />;
}
