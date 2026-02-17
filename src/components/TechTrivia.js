import React, { useState } from "react";
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import { motion, AnimatePresence } from "framer-motion";
import { FaLightbulb } from "react-icons/fa";

const facts = [
    "The first computer bug was an actual moth found in the Harvard Mark II computer in 1947.",
    "Python was named after the comedy group Monty Python, not the snake.",
    "The first high-level programming language was Fortran, created in 1957.",
    "There are over 700 distinct programming languages.",
    "The first domain name ever registered was Symbolics.com on March 15, 1985.",
    "Linux powers 100% of the world's top 500 supercomputers.",
    "The QWERTY keyboard was designed to slow down typists to prevent jamming on mechanical typewriters.",
    "CAPTCHA stands for 'Completely Automated Public Turing test to tell Computers and Humans Apart'.",
    "The first 1GB hard drive was announced by IBM in 1980, weighed over 500 pounds, and cost $40,000.",
    "Wi-Fi doesn't stand for 'Wireless Fidelity'. It's just a marketing term!",
    "Ada Lovelace is considered the first computer programmer for her work on Charles Babbage's Analytical Engine.",
    "The Apollo 11 guidance computer had less processing power than a modern toaster.",
    "Minecraft is the best-selling video game of all time.",
    "The most expensive domain name ever sold was Voice.com for $30 million.",
    "Email existed before the World Wide Web.",
    "The first webcam was created at Cambridge University to check if the coffee pot was full.",
    "90% of the world's currency only exists on computers.",
    "The first computer mouse was made of wood.",
    "NASA's internet speed is 91 GB per second.",
    "The Firefox logo isn't a fox; it's a red panda.",
    "Apple's first computer, the Apple I, went on sale for $666.66.",
    "Approximately 70% of virus writers work under contract for organized crime syndicates.",
    "A single Google search uses the same amount of computing power as the entire Apollo program.",
    "The password for the computer controls of nuclear missiles of the US was '00000000' for eight years.",
    "The term 'robot' comes from the Czech word 'robota', meaning forced labor.",
    "YouTube was originally designed as a video-dating site called 'Tune In Hook Up'.",
    "The first tweet was 'just setting up my twttr' by Jack Dorsey in 2006.",
    "Only about 10% of the world's currency is physical money, the rest only exists on computers.",
    "Amazon was originally going to be named 'Cadabra', as in magic.",
    "The average computer user blinks 7 times a minute, less than half the normal rate of 20.",
    "SpaceX's Falcon 9 rocket uses Linux."
];

function TechTrivia() {
    const [index, setIndex] = useState(0);

    const nextFact = () => {
        setIndex((prevIndex) => (prevIndex + 1) % facts.length);
    };

    return (
        <Container fluid className="home-about-section" id="trivia">
            <Container>
                <Row className="justify-content-center">
                    <Col md={8} className="text-center">
                        <h1 style={{ fontSize: "2.5em", paddingBottom: "20px", color: "white" }}>
                            Tech <strong className="purple">Trivia</strong> Surprise 🎁
                        </h1>
                        <p className="home-about-body" style={{ textAlign: "center", fontStyle: "italic", color: "white" }}>
                            "Did you know?"
                        </p>

                        <Card className="quote-card-view" style={{
                            backgroundColor: "rgba(17, 25, 40, 0.75)",
                            backdropFilter: "blur(16px)",
                            border: "1px solid rgba(255, 255, 255, 0.125)",
                            borderRadius: "15px",
                            padding: "20px",
                            minHeight: "200px",
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center"
                        }}>
                            <Card.Body>
                                <AnimatePresence mode="wait">
                                    <motion.div
                                        key={index}
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: -20 }}
                                        transition={{ duration: 0.5 }}
                                    >
                                        <FaLightbulb style={{ fontSize: "2em", color: "#c770f0", marginBottom: "15px" }} />
                                        <h3 style={{ color: "white", fontSize: "1.2em", lineHeight: "1.5" }}>
                                            {facts[index]}
                                        </h3>
                                    </motion.div>
                                </AnimatePresence>

                                <Button
                                    variant="primary"
                                    onClick={nextFact}
                                    style={{ marginTop: "20px", background: "linear-gradient(90deg, #a24dd3 0%, #6f42c1 100%)", border: "none" }}
                                >
                                    Next Fact 🎲
                                </Button>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </Container>
        </Container>
    );
}

export default TechTrivia;
