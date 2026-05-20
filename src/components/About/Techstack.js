import React from "react";
import { Col, Row } from "react-bootstrap";
import { DiPython, DiJava } from "react-icons/di";
import { SiTensorflow, SiDocker, SiMlflow, SiFastapi, SiMongodb } from "react-icons/si";
import { FaDatabase, FaBrain, FaProjectDiagram, FaRobot, FaLink } from "react-icons/fa";
import ScrollReveal from "../animations/ScrollReveal";

function Techstack() {
  return (
    <ScrollReveal stagger={true} staggerDelay={0.08}>
      <Row style={{ justifyContent: "center", paddingBottom: "50px" }}>
        <Col xs={4} md={2} className="tech-icons" data-label="Python">
          <DiPython />
        </Col>
        <Col xs={4} md={2} className="tech-icons" data-label="Java">
          <DiJava />
        </Col>
        <Col xs={4} md={2} className="tech-icons" data-label="LangChain">
          <FaLink />
        </Col>
        <Col xs={4} md={2} className="tech-icons" data-label="LangGraph">
          <FaProjectDiagram />
        </Col>
        <Col xs={4} md={2} className="tech-icons" data-label="TensorFlow">
          <SiTensorflow />
        </Col>
        <Col xs={4} md={2} className="tech-icons" data-label="FastAPI">
          <SiFastapi />
        </Col>
        <Col xs={4} md={2} className="tech-icons" data-label="Docker">
          <SiDocker />
        </Col>
        <Col xs={4} md={2} className="tech-icons" data-label="MLflow">
          <SiMlflow />
        </Col>
        <Col xs={4} md={2} className="tech-icons" data-label="RAG / Agentic AI">
          <FaRobot />
        </Col>
        <Col xs={4} md={2} className="tech-icons" data-label="System Design">
          <FaBrain />
        </Col>
        <Col xs={4} md={2} className="tech-icons" data-label="MongoDB">
          <SiMongodb />
        </Col>
        <Col xs={4} md={2} className="tech-icons" data-label="Vector DBs">
          <FaDatabase />
        </Col>
      </Row>
    </ScrollReveal>
  );
}

export default Techstack;
