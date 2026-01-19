import React from "react";
import { Col, Row } from "react-bootstrap";
import { DiPython, DiJava, DiMysql } from "react-icons/di";
import { SiTensorflow, SiFlask, SiDocker, SiDvc, SiMlflow, SiPowerbi, SiFastapi, SiMongodb } from "react-icons/si";
import { FaDatabase } from "react-icons/fa"; // Alternatives for Pinecone

function Techstack() {
  return (
    <Row style={{ justifyContent: "center", paddingBottom: "50px" }}>
      <Col xs={4} md={2} className="tech-icons">
        <DiPython />
      </Col>
      <Col xs={4} md={2} className="tech-icons">
        <DiJava />
      </Col>
      <Col xs={4} md={2} className="tech-icons">
        <DiMysql />
      </Col>
      <Col xs={4} md={2} className="tech-icons">
        <SiTensorflow />
      </Col>
      <Col xs={4} md={2} className="tech-icons">
        <SiFlask />
      </Col>
      <Col xs={4} md={2} className="tech-icons">
        <SiDocker />
      </Col>
      <Col xs={4} md={2} className="tech-icons">
        <SiDvc />
      </Col>
      <Col xs={4} md={2} className="tech-icons">
        <SiMlflow />
      </Col>
      <Col xs={4} md={2} className="tech-icons">
        <SiFastapi /> {/* Alternative for LangChain */}
      </Col>
      <Col xs={4} md={2} className="tech-icons">
        <SiPowerbi />
      </Col>
      <Col xs={4} md={2} className="tech-icons">
        <SiMongodb /> {/* If Pinecone is used with MongoDB */}
      </Col>
      <Col xs={4} md={2} className="tech-icons">
        <FaDatabase /> {/* Alternative for Pinecone */}
      </Col>
    </Row>
  );
}

export default Techstack;
