import React, { useEffect, useState, useCallback } from "react";
import { ArrowUp } from "lucide-react";

export const ScrollToTop = () => {
  const [visible, setVisible] = useState(false);

  const prefersReducedMotion =
    typeof window !== "undefined" &&
    window.matchMedia &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  const checkScroll = useCallback(() => {
    const y = window.scrollY || window.pageYOffset;
    setVisible(y > 300); // show button after 300px scroll
  }, []);

  useEffect(() => {
    let ticking = false;
    function onScroll() {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          checkScroll();
          ticking = false;
        });
        ticking = true;
      }
    }

    checkScroll(); // initial check
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", checkScroll);

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", checkScroll);
    };
  }, [checkScroll]);

  const handleClick = () => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: prefersReducedMotion ? "auto" : "smooth",
    });
  };

  if (!visible) return null;

  return (
    <button
      aria-label="Scroll to top"
      onClick={handleClick}
      className="
        fixed bottom-6 right-6 z-50 flex items-center justify-center
        w-12 h-12 rounded-full shadow-lg
      bg-green-800
        backdrop:blur-xl
        hover:cursor-pointer hover:scale-120 text-white
        active:scale-95 transform
        transition-transform duration-150
        focus:outline-none
      "
      title="Scroll to top"
    >
      <ArrowUp size={20} />
    </button>
  );
};

export default ScrollToTop;
