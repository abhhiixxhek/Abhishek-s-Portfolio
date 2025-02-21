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
            A passionate <b className="purple">AI/ML enthusiast</b> currently interning at Mastersoft ERP Solutions Pvt. Ltd., where I train models and build intelligent systems.
            <br />
            Currently pursuing my <b className="purple">B.Tech in Computer Science</b> from IIIT Nagpur, diving deep into AI, ML, and everything data-driven! 🚀
            <br />
            <br />
            When I'm not busy making machines smarter, I'm busy making life more fun! Here's what I love to do:
          </p>
          <ul>
            <li className="about-activity">
              <ImPointRight /> <b className="purple">Owning the court & field</b>—whether it's football or basketball, I'm always up for a game! 🏀⚽
            </li>
            <li className="about-activity">
              <ImPointRight /> <b className="purple">Exploring cafés & trying new food</b>—because great ideas start over coffee! ☕🍔
            </li>
            
            <li className="about-activity">
              <ImPointRight /> <b className="purple">Cooking up experiments</b>—sometimes delicious, sometimes just science in the kitchen! 🍳😂
            </li>
            <li className="about-activity">
              <ImPointRight /> <b className="purple">Traveling with no fixed plan</b>—because the best journeys are unplanned! 🌍🔥
            </li>
          </ul>
        </blockquote>
      </Card.Body>
    </Card>

  );
}

export default AboutCard;
