import React from "react";
import { Col, Row } from "react-bootstrap";
import {
  SiVisualstudiocode,
  SiPostman,
  SiDocker,
  SiGithub,
  SiPowerbi,
} from "react-icons/si";
import { FaLinux, FaAws } from "react-icons/fa";
import ScrollReveal from "../animations/ScrollReveal";

function Toolstack() {
  return (
    <ScrollReveal stagger={true} staggerDelay={0.08}>
      <Row style={{ justifyContent: "center", paddingBottom: "50px" }}>
        <Col xs={4} md={2} className="tech-icons">
          <FaLinux />
        </Col>
        <Col xs={4} md={2} className="tech-icons">
          <SiVisualstudiocode />
        </Col>
        <Col xs={4} md={2} className="tech-icons">
          <SiPostman />
        </Col>
        <Col xs={4} md={2} className="tech-icons">
          <SiDocker />
        </Col>
        <Col xs={4} md={2} className="tech-icons">
          <SiGithub />
        </Col>
        <Col xs={4} md={2} className="tech-icons">
          <SiPowerbi />
        </Col>
        <Col xs={4} md={2} className="tech-icons">
          <FaAws />
        </Col>
      </Row>
    </ScrollReveal>
  );
}

export default Toolstack;
