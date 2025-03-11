import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import myImg from "../../Assets/avatar.svg";
import Tilt from "react-parallax-tilt";
import {
  AiFillGithub,
  AiOutlineTwitter,
  AiFillInstagram,
} from "react-icons/ai";
import { FaLinkedinIn } from "react-icons/fa";

function Home2() {
  return (
    <Container fluid className="home-about-section" id="about">
      <Container>
        <Row>
          <Col md={8} className="home-about-description">
            <h1 style={{ fontSize: "2.5em", fontWeight: "600" }}>
              About <span className="purple">Me</span>
            </h1>
            <p className="home-about-body">
              I'm <b className="purple">Abhishek Kumar</b>, an AI/ML enthusiast passionate about building intelligent systems and solving real-world problems with data.  
              <br />
              <br />
              With experience in <b className="purple">Machine Learning, NLP, and MLOps</b>, I work on designing scalable models, fine-tuning <b className="purple">Large Language Models</b>, and optimizing data-driven applications.
              <br />
              <br />
              My tech stack includes:
              <i>
                <b className="purple"> Python, SQL, C++, and Java</b>
              </i>.  
              I focus on ML/AI research, deep learning architectures, and making systems more efficient.  
              <br />
              <br />
              Beyond work, I find inspiration in:
              <ul>
                <li><b className="purple">Sports & Strategy</b> — A big fan of football and basketball. Competitive, on and off the field! 🏀⚽</li>
                <li><b className="purple">Exploring Cafés</b> — Because great ideas start with good coffee. ☕🍽️</li>
                <li><b className="purple">Travel & Adventure</b> — Exploring new places, cultures, and perspectives. 🌍</li>
              </ul>
            </p>
          </Col>
          <Col md={4} className="text-center">
            <Tilt>
              <img src={myImg} className="img-fluid" alt="avatar" />
            </Tilt>
          </Col>
        </Row>

        <Row>
          <Col md={12} className="home-about-social text-center">
            <h1>Let's Connect</h1>
            <p>Feel free to <span className="purple">reach out</span> and connect with me.</p>
            <ul className="home-about-social-links d-flex justify-content-center">
              <li className="social-icons">
                <a
                  href="https://github.com/abhhiixxhek"
                  target="_blank"
                  rel="noreferrer"
                  className="icon-colour home-social-icons"
                >
                  <AiFillGithub />
                </a>
              </li>
              <li className="social-icons">
                <a
                  href="https://x.com/awwyster"
                  target="_blank"
                  rel="noreferrer"
                  className="icon-colour home-social-icons"
                >
                  <AiOutlineTwitter />
                </a>
              </li>
              <li className="social-icons">
                <a
                  href="https://www.linkedin.com/in/abhhiixxhek"
                  target="_blank"
                  rel="noreferrer"
                  className="icon-colour home-social-icons"
                >
                  <FaLinkedinIn />
                </a>
              </li>
              <li className="social-icons">
                <a
                  href="https://www.instagram.com/abhhiixxhek"
                  target="_blank"
                  rel="noreferrer"
                  className="icon-colour home-social-icons"
                >
                  <AiFillInstagram />
                </a>
              </li>
            </ul>
          </Col>
        </Row>
      </Container>
    </Container>
  );
}

export default Home2;
