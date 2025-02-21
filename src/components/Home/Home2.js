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
            <h1 style={{ fontSize: "2.6em" }}>
              WHO AM <span className="purple"> I? 🤖🔥</span>
            </h1>
            <p className="home-about-body">
              From the moment I stepped into <b className="purple">AI & Machine Learning</b>, there was no turning back—just an endless loop of innovation! 🚀
              <br />
              <br />I craft <b className="purple">intelligent systems</b> using
              <i>
                <b className="purple"> Python, SQL, C++, and Java</b>
              </i>,
              turning raw data into magic. ✨
              <br />
              <br />
              Obsessed with <b className="purple">cutting-edge AI</b>, I fine-tune <b className="purple">Large Language Models</b>, build <b className="purple">scalable MLOps pipelines</b>, and push the boundaries of <b className="purple">Data Science, NLP, and Deep Learning</b>.
              <br />
              <br />
              When I'm not busy making machines smarter, you'll find me:
              <ul>
                <li><b className="purple">Dominating the football field & sinking shots on the basketball court 🏀⚽</b></li>
                <li><b className="purple">Discovering the best cafés & trying new food ☕🍽️</b></li>
                <li><b className="purple">Mapping out my next travel adventure! 🌍🔥</b></li>
              </ul>
            </p>
          </Col>
          <Col md={4} className="">
            <Tilt>
              <img src={myImg} className="img-fluid" alt="avatar" />
            </Tilt>
          </Col>
        </Row>
        
        <Row>
          <Col md={12} className="home-about-social">
            <h1>FIND ME ON</h1>
            <p>
              Feel free to <span className="purple">connect </span>with me
            </p>
            <ul className="home-about-social-links">
              <li className="social-icons">
                <a
                  href="https://github.com/abhhiixxhek"
                  target="_blank"
                  rel="noreferrer"
                  className="icon-colour  home-social-icons"
                >
                  <AiFillGithub />
                </a>
              </li>
              <li className="social-icons">
                <a
                  href="https://x.com/awwyster"
                  target="_blank"
                  rel="noreferrer"
                  className="icon-colour  home-social-icons"
                >
                  <AiOutlineTwitter />
                </a>
              </li>
              <li className="social-icons">
                <a
                  href="https://www.linkedin.com/in/abhhiixxhek"
                  target="_blank"
                  rel="noreferrer"
                  className="icon-colour  home-social-icons"
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
