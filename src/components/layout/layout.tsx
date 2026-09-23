import { motion } from "framer-motion";
import { Outlet, useLocation } from "react-router-dom";

import { pageTransition } from "@/lib/animations";

import { Atmosphere } from "./atmosphere";
import { Footer } from "./footer";
import { Navbar } from "./navbar";

export function Layout() {
  const location = useLocation();

  return (
    <div className="relative flex min-h-svh flex-col">
      <Atmosphere />
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:rounded-md focus:bg-primary focus:px-4 focus:py-2 focus:text-primary-foreground"
      >
        Skip to content
      </a>
      <Navbar />
      <motion.main
        id="main-content"
        key={location.pathname}
        initial="hidden"
        animate="visible"
        exit="exit"
        variants={pageTransition}
        className="flex-1"
      >
        <Outlet />
      </motion.main>
      <Footer />
    </div>
  );
}
