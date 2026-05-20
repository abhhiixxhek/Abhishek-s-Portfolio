import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import {
  AiFillGithub,
  AiOutlineTwitter,
  AiFillInstagram,
} from "react-icons/ai";
import { FaLinkedinIn } from "react-icons/fa";
import { SiMedium } from "react-icons/si";
import ScrollReveal from "./animations/ScrollReveal";

function Footer() {
  return (
    <Container fluid className="footer">
      <Row>
        <Col md="4" className="footer-copywright">
          <h3>Designed and Developed by Abhishek Kumar</h3>
        </Col>
        <Col md="4" className="footer-copywright">
          <h3>Built with 💻, ☕, and a little bit of ✨</h3>
        </Col>

        <Col md="4" className="footer-body">
          <ScrollReveal stagger={true} staggerDelay={0.1} duration={0.3}>
            <ul className="footer-icons">
              <li className="social-icons footer-social-icon">
                <a
                  href="https://github.com/abhhiixxhek"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <AiFillGithub />
                </a>
              </li>
              <li className="social-icons footer-social-icon">
                <a
                  href="https://x.com/awwyster"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <AiOutlineTwitter />
                </a>
              </li>
              <li className="social-icons footer-social-icon">
                <a
                  href="https://www.linkedin.com/in/abhhiixxhek"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <FaLinkedinIn />
                </a>
              </li>
              <li className="social-icons footer-social-icon">
                <a
                  href="https://www.instagram.com/abhiishek.ai"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <AiFillInstagram />
                </a>
              </li>
              <li className="social-icons footer-social-icon">
                <a
                  href="https://medium.com/@abhiishekwrites"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <SiMedium />
                </a>
              </li>
            </ul>
          </ScrollReveal>
        </Col>
      </Row>
    </Container>
  );
}

export default Footer;
