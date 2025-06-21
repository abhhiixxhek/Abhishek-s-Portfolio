import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import ProjectCard from "./ProjectCards";
import Particle from "../Particle";
import leaf from "../../Assets/Projects/deepquery.png";
import emotion from "../../Assets/Projects/paperpal.png";
import editor from "../../Assets/Projects/ocular.png";
import chatify from "../../Assets/Projects/stockpredictor.png";
import flight from "../../Assets/Projects/flight.png";
import bitsOfCode from "../../Assets/Projects/disha.png";

function Projects() {
  return (
    <Container fluid className="project-section">
      <Particle />
      <Container>
        <h1 className="project-heading">
          My Recent <strong className="purple">Works </strong>
        </h1>
        <p style={{ color: "white" }}>
          Here are a few projects I've worked on recently.
        </p>
        <Row style={{ justifyContent: "center", paddingBottom: "10px" }}>
          <Col md={4} className="project-card">
            <ProjectCard
              imgPath={chatify}
              isBlog={false}
              title="Stock Predictior Pro"
              description="A hybrid LSTM-ARIMA forecasting model achieved 70% accuracy in stock market analysis, utilizing key technical indicators like EMA, SMA, RSI, and MACD. These indicators captured momentum and mean-reversion signals, improving responsiveness and forecast stability. An LLM feedback loop automated parameter fine-tuning, boosting stakeholder confidence."
              ghLink="https://stockpredictionn.streamlit.app/"
              
            />
          </Col>

          <Col md={4} className="project-card">
            <ProjectCard
              imgPath={bitsOfCode}
              isBlog={false}
              title="DISHA"
              description="Created a smart multilingual chatbot for IIITN using fine-tuned LLMs and RAG, ensuring real-time, accurate responses. Engineered a scalable retrieval system to enhance user experience and streamline query resolution!  "
              ghLink="https://github.com/abhhiixxhek/DISHA-"
              
            />
          </Col>

          <Col md={4} className="project-card">
            <ProjectCard
              imgPath={editor}
              isBlog={false}
              title="Ocular Disease Classifier"
              description="Built a powerful CNN-based eye disease classifier with 96% accuracy, leveraging VGG16, DenseNet, and ensemble learning to enhance predictions. Cutting-edge deep learning meets real-world healthcare impact! "
              ghLinkLink="https://github.com/abhhiixxhek/Eye-Disease-Classification"
                           
            />
          </Col>

          <Col md={4} className="project-card">
            <ProjectCard
              imgPath={flight}
              isBlog={false}
              title="Airlytics: Flight Booking Analytics"
              description="Developed a smart Streamlit app for flight booking data analysis using Gemini LLM agents—automating data cleaning, enabling natural language insights, and simplifying CSV uploads/downloads. Where AI meets real-time data intelligence! "
              ghLinkLink="https://airlyticss.streamlit.app/"
                           
            />
          </Col>

          <Col md={4} className="project-card">
            <ProjectCard
              imgPath={leaf}
              isBlog={false}
              title="DeepQuery"
              description="Dive into the world of AI, ML, and Data Science with an interactive Socratic assistant. Instead of just answers, get thought-provoking questions to enhance your understanding!"
              ghLink="https://deepquerybyabhi.streamlit.app/"
              // demoLink="https://deepquery.onrender.com/"
            />
          </Col>

          

          <Col md={4} className="project-card">
            <ProjectCard
              imgPath={emotion}
              isBlog={false}
              title="PaperPal"
              description="ChatWithPDF is an AI-powered conversational assistant that allows users to interact with PDFs by extracting insights from text, tables, and figures."
              ghLink="https://paperpalbyabhi.streamlit.app/"
               
            />
          </Col>
        </Row>
      </Container>
    </Container>
  );
}

export default Projects;
