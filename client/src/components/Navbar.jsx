import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { iconMap } from "./icons";

const { FaBars } = iconMap;

const links = [
  { to: "/", label: "Home" },
  { to: "/achievements", label: "Achievements" },
  { to: "/departments", label: "Departments" },
  { to: "/sponsorship", label: "Sponsorship" },
  { to: "/alumni", label: "Alumni" },
  { to: "/contact", label: "ContactUs" }
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [shrink, setShrink] = useState(false);

  useEffect(() => {
    const onScroll = () => setShrink(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className={`sticky top-0 z-30 transition-all duration-300 ${shrink ? "bg-[#060e1f]/80 backdrop-blur-xl border-b border-[#e8192c33] py-1" : "bg-[#030a12d1] py-3"}`}>
      <div className="mx-auto flex w-full max-w-6xl items-center justify-between gap-4 px-4 md:px-6">
        <div className="flex items-center gap-3">
        <a href="/"><img src="/assets/logoniamtrACING (1).png" alt="Team Thrusters logo" className="h-12 w-12 object-contain" /></a>
        <div>
          <h1 className="font-display text-base tracking-wide">Team Thrusters</h1>
          <p className="text-sm text-slate-300">NIAMT Student Racing Club</p>
        </div>
      </div>

      <button
        className="inline-flex h-9 w-9 items-center justify-center rounded-lg bg-[#0c2038] md:hidden"
        onClick={() => setOpen((prev) => !prev)}
        aria-label="Toggle menu"
      >
        <FaBars />
      </button>

      <nav
        className={`absolute right-4 top-[4.5rem] flex min-w-[11.5rem] flex-col overflow-hidden rounded-xl bg-[#0c2038] shadow-2xl md:static md:min-w-0 md:flex-row md:bg-transparent md:shadow-none ${
          open ? "flex" : "hidden md:flex"
        }`}
      >
        {links.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            className={({ isActive }) =>
              `relative px-4 py-3 font-semibold tracking-wide text-white transition-all duration-250 md:rounded-lg md:px-3 md:py-2 ${
                isActive
                  ? "text-[#ffc955] active"
                  : "text-slate-100 hover:text-[#ff6b35]"
              }`
            }
            onClick={() => setOpen(false)}
          >
            <span className="nav-link-text">{item.label}</span>
            <span className={`absolute left-0 bottom-1 h-[2px] w-0 bg-[#e8192c] transition-all duration-300 ${shrink ? "md:bottom-0" : ""}`} />
          </NavLink>
        ))}
      </nav>
    </div>
  </header>
  );
}
