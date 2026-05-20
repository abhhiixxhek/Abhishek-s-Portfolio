import React from "react";
import Particles from "react-tsparticles";
import useMobileOptimization from "../hooks/useMobileOptimization";

function Particle() {
  const { particleDensity } = useMobileOptimization(160);

  return (
    <Particles
      id="tsparticles"
      params={{
        particles: {
          number: {
            value: particleDensity,
            density: {
              enable: true,
              value_area: 1500,
            },
          },
          line_linked: {
            enable: false,
            opacity: 0.03,
          },
          move: {
            direction: "right",
            speed: 0.05,
          },
          size: {
            value: 1,
          },
          opacity: {
            anim: {
              enable: true,
              speed: 1,
              opacity_min: 0.05,
            },
          },
        },
        interactivity: {
          events: {
            onclick: {
              enable: true,
              mode: "push",
            },
          },
          modes: {
            push: {
              particles_nb: 1,
            },
          },
        },
        retina_detect: true,
      }}
    />
  );
}

export default Particle;
