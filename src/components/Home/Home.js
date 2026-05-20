import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import { motion } from "framer-motion";
import homeLogo from "../../Assets/home-main.svg";
import Particle from "../Particle";
import Home2 from "./Home2";
import Type from "./Type";
import AnimatedText from "../animations/AnimatedText";
import ScrollReveal from "../animations/ScrollReveal";
import useReducedMotion from "../../hooks/useReducedMotion";

function Home() {
  const prefersReducedMotion = useReducedMotion();

  return (
    <section>
      <Container fluid className="home-section" id="home">
        <Particle />
        <Container className="home-content">
          <Row>
            <Col md={7} className="home-header">
              <h1 style={{ paddingBottom: 15 }} className="heading">
                <AnimatedText text="Hi There!" totalDuration={0.8} />{" "}
                <span className="wave" role="img" aria-labelledby="wave">
                  👋🏻
                </span>
              </h1>

              <h1 className="heading-name">
                I'M
                <strong
                  className="main-name"
                  style={{
                    background: "linear-gradient(90deg, #c770f0, #e8a0ff)",
                    WebkitBackgroundClip: "text",
                    backgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                  }}
                >
                  {" "}ABHISHEK KUMAR
                </strong>
              </h1>

              <div style={{ padding: 50, textAlign: "left" }}>
                <Type />
              </div>
            </Col>

            <Col md={5} style={{ paddingBottom: 20 }}>
              {prefersReducedMotion ? (
                <img
                  src={homeLogo}
                  alt="home pic"
                  className="img-fluid"
                  style={{ maxHeight: "450px" }}
                />
              ) : (
                <motion.img
                  src={homeLogo}
                  alt="home pic"
                  className="img-fluid"
                  style={{ maxHeight: "450px" }}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{
                    opacity: 1,
                    scale: 1,
                    y: [0, -10, 0],
                  }}
                  transition={{
                    opacity: { duration: 0.6, delay: 0.3, ease: "easeOut" },
                    scale: { duration: 0.6, delay: 0.3, ease: "easeOut" },
                    y: {
                      duration: 3,
                      ease: "easeInOut",
                      repeat: Infinity,
                      delay: 0.9,
                    },
                  }}
                />
              )}
            </Col>
          </Row>
        </Container>
      </Container>
      <ScrollReveal>
        <Home2 />
      </ScrollReveal>
    </section>
  );
}

export default Home;
