import React from "react";
import { Col, Row } from "react-bootstrap";
import {
  SiVisualstudiocode,
  SiPostman,
  SiDocker,
  SiGithub,
  SiNginx,
  SiStreamlit,
} from "react-icons/si";
import { FaLinux, FaAws } from "react-icons/fa";
import { VscDebugConsole } from "react-icons/vsc";
import ScrollReveal from "../animations/ScrollReveal";

function Toolstack() {
  return (
    <ScrollReveal stagger={true} staggerDelay={0.08}>
      <Row style={{ justifyContent: "center", paddingBottom: "50px" }}>
        <Col xs={4} md={2} className="tech-icons" data-label="Linux">
          <FaLinux />
        </Col>
        <Col xs={4} md={2} className="tech-icons" data-label="VS Code">
          <SiVisualstudiocode />
        </Col>
        <Col xs={4} md={2} className="tech-icons" data-label="Postman">
          <SiPostman />
        </Col>
        <Col xs={4} md={2} className="tech-icons" data-label="Docker">
          <SiDocker />
        </Col>
        <Col xs={4} md={2} className="tech-icons" data-label="GitHub">
          <SiGithub />
        </Col>
        <Col xs={4} md={2} className="tech-icons" data-label="AWS">
          <FaAws />
        </Col>
        <Col xs={4} md={2} className="tech-icons" data-label="Nginx">
          <SiNginx />
        </Col>
        <Col xs={4} md={2} className="tech-icons" data-label="Streamlit">
          <SiStreamlit />
        </Col>
        <Col xs={4} md={2} className="tech-icons" data-label="LangSmith">
          <VscDebugConsole />
        </Col>
      </Row>
    </ScrollReveal>
  );
}

export default Toolstack;
