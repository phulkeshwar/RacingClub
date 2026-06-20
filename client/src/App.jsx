import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Route, Routes, useLocation } from "react-router-dom";
import { fetchHomeContent } from "./api/content";
import AnimatedCursor from "./components/AnimatedCursor";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import ScrollProgress from "./components/ScrollProgress";
import LoadingScreen from "./components/LoadingScreen";
import useSectionReveal from "./hooks/useSectionReveal";
import AchievementsPage from "./pages/AchievementsPage";
import AlumniPage from "./pages/AlumniPage";
import ContactPage from "./pages/ContactPage";
import DepartmentsPage from "./pages/DepartmentsPage";
import HomePage from "./pages/HomePage";
import SponsorshipPage from "./pages/SponsorshipPage";

export default function App() {
  const [homeContent, setHomeContent] = useState(null);
  const location = useLocation();
  const isHome = location.pathname === "/";

  useSectionReveal();

  useEffect(() => {
    const loadFooterContent = async () => {
      try {
        const data = await fetchHomeContent();
        setHomeContent(data);
      } catch (_error) {
        setHomeContent(null);
      }
    };

    loadFooterContent();
  }, []);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [location.pathname]);

  return (
    <div className="min-h-screen">
      <LoadingScreen />
      <ScrollProgress />
      <AnimatedCursor />
      <Navbar />
      <main
        className={
          isHome
            ? "cursor-zone mx-auto w-full max-w-7xl px-4 md:px-6"
            : "cursor-zone mx-auto my-6 w-full max-w-6xl px-4 md:px-6"
        }
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={location.pathname}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25, ease: "easeInOut" }}
          >
            <Routes location={location}>
              <Route path="/" element={<HomePage />} />
              <Route path="/achievements" element={<AchievementsPage />} />
              <Route path="/departments" element={<DepartmentsPage />} />
              <Route path="/sponsorship" element={<SponsorshipPage />} />
              <Route path="/alumni" element={<AlumniPage />} />
              <Route path="/contact" element={<ContactPage homeContent={homeContent} />} />
            </Routes>
          </motion.div>
        </AnimatePresence>
      </main>
      <Footer homeContent={homeContent} />
    </div>
  );
}
