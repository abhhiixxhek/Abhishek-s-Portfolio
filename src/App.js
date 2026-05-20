import React, { useState, useEffect, useCallback } from "react";
import { motion } from "framer-motion";
import Preloader from "../src/components/Pre";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import { BrowserRouter as Router } from "react-router-dom";
import ScrollToTop from "./components/ScrollToTop";
import AnimatedRoutes from "./components/animations/AnimatedRoutes";
import "./style.css";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  const [load, upadateLoad] = useState(true);
  const [preloaderExited, setPreloaderExited] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      upadateLoad(false);
    }, 1200);

    return () => clearTimeout(timer);
  }, []);

  const handlePreloaderExitComplete = useCallback(() => {
    setPreloaderExited(true);
  }, []);

  // Content fade-in: opacity 0→1 over 500ms with 200ms delay after preloader exits
  const contentVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { duration: 0.5, ease: "easeIn", delay: 0.2 }
    }
  };

  return (
    <Router>
      <Preloader load={load} onExitComplete={handlePreloaderExitComplete} />
      <motion.div
        className="App"
        id={load ? "no-scroll" : "scroll"}
        initial="hidden"
        animate={preloaderExited ? "visible" : "hidden"}
        variants={contentVariants}
        style={{
          pointerEvents: preloaderExited ? "auto" : "none"
        }}
      >
        <Navbar />
        <ScrollToTop />
        <AnimatedRoutes />
        <Footer />
      </motion.div>
    </Router>
  );
}

export default App;
