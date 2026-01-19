import React from "react";
import Card from "react-bootstrap/Card";
import { ImPointRight } from "react-icons/im";

function AboutCard() {
  return (
    <Card className="quote-card-view">
      <Card.Body>
        <blockquote className="blockquote mb-0">
          <p style={{ textAlign: "justify" }}>
            Hey there! I'm <span className="purple">Abhishek Kumar</span> from <span className="purple">Mumbai, India.</span>
            <br />
            A passionate <b className="purple">AI/ML enthusiast</b> currently working full-time as an AI/ML Engineer at Oneture Technologies, where I train models and build intelligent systems.
            <br />
            I graduated in 2025 with a <b className="purple">Bachelor of Technology in Computer Science and Engineering</b> from Indian Institute of Information Technology, Nagpur.
            <br />
            <br />
            When I'm not busy making machines smarter, I'm busy making life more fun! Here's what I love to do:
          </p>
          <ul>
            <li className="about-activity">
              <ImPointRight /> <b className="purple">Playing sports</b>  usually football or basketball, always up for a good match.
            </li>
            <li className="about-activity">
              <ImPointRight /> <b className="purple">Exploring local cafés</b>  good food and better conversations.
            </li>
            <li className="about-activity">
              <ImPointRight /> <b className="purple">Experimenting in the kitchen</b>  trying out new recipes just for fun.
            </li>
            <li className="about-activity">
              <ImPointRight /> <b className="purple">Spontaneous travel</b> – I enjoy going places without a strict itinerary.
            </li>

          </ul>
        </blockquote>
      </Card.Body>
    </Card>

  );
}

export default AboutCard;
