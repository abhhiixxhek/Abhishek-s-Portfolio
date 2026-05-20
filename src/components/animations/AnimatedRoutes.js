import React from "react";
import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import PageTransition from "./PageTransition";
import Home from "../Home/Home";
import About from "../About/About";
import Projects from "../Projects/Projects";
import Resume from "../Resume/ResumeNew";
import Blogs from "../Blogs/Blogs";
import Contact from "../Contact/Contact";

/**
 * AnimatedRoutes wraps the application Routes with AnimatePresence and
 * PageTransition to provide smooth enter/exit animations during navigation.
 *
 * Uses useLocation to get the current pathname as a key for AnimatePresence,
 * ensuring exit animations complete before enter animations begin.
 * The location prop is passed to Routes for proper exit animation coordination.
 *
 * Requirements: 1.4, 1.5
 */
function AnimatedRoutes() {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <PageTransition key={location.pathname}>
        <Routes location={location}>
          <Route path="/" element={<Home />} />
          <Route path="/project" element={<Projects />} />
          <Route path="/about" element={<About />} />
          <Route path="/resume" element={<Resume />} />
          <Route path="/blogs" element={<Blogs />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </PageTransition>
    </AnimatePresence>
  );
}

export default AnimatedRoutes;
