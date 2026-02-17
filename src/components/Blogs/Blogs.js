import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import BlogCard from "./BlogCard";
import Particle from "../Particle";
import leaf from "../../Assets/Projects/deepquery.png";
import emotion from "../../Assets/Projects/paperpal.png";
import editor from "../../Assets/Projects/ocular.png";
import chatify from "../../Assets/Projects/stockpredictor.png";
import flight from "../../Assets/Projects/flight.png";
import { motion } from "framer-motion";

function Blogs() {
    return (
        <Container fluid className="project-section">
            <Particle />
            <Container>
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                >
                    <h1 className="project-heading">
                        My Recent <strong className="purple">Blogs </strong>
                    </h1>
                    <p style={{ color: "white" }}>
                        I write about technology, AI, and my experiences. Check out my latest articles on Medium.
                    </p>
                    <Row style={{ justifyContent: "center", paddingBottom: "10px" }}>

                        <Col md={4} className="blog-card">
                            <BlogCard
                                imgPath={chatify}
                                title="From Template Beggar to Vibe Coder"
                                description="The New Way to Own Valentine's Day (and Every Other Occasion). Discover how to move beyond templates and code with your own unique vibe."
                                link="https://medium.com/@abhiishekwrites/from-template-beggar-to-vibe-coder-the-new-way-to-own-valentines-day-and-every-other-occasion-53bac07391a1"
                                date="14 Feb 2026"
                            />
                        </Col>

                        <Col md={4} className="blog-card">
                            <BlogCard
                                imgPath={leaf}
                                title="My RAG System Was Lying to Me"
                                description="Here's the Agentic Architecture I Built to Fix It. A deep dive into the pitfalls of basic RAG systems and how to build a robust agentic solution."
                                link="https://medium.com/@abhiishekwrites/my-rag-system-was-lying-to-me-heres-the-agentic-architecture-i-built-to-fix-it-bc2c37576994"
                                date="12 Feb 2026"
                            />
                        </Col>

                        <Col md={4} className="blog-card">
                            <BlogCard
                                imgPath={editor}
                                title="The Death of 'Lost in the Middle'"
                                description="Why Page-Index RAG Is the Upgrade Your LLM Needs. addressing the context window limitations and improving retrieval accuracy."
                                link="https://medium.com/@abhiishekwrites/the-death-of-lost-in-the-middle-why-page-index-rag-is-the-upgrade-your-llm-needs-43f16648105e"
                                date="10 Feb 2026"
                            />
                        </Col>

                        <Col md={4} className="blog-card">
                            <BlogCard
                                imgPath={flight}
                                title="The Complete Guide to Vibe Coding"
                                description="Mastering the art of coding with vibe and efficiency. Learn how to code in a way that feels natural and productive."
                                link="https://medium.com/@abhiishekwrites/the-complete-guide-to-vibe-coding-62940af4a8df"
                                date="08 Feb 2026"
                            />
                        </Col>

                        <Col md={4} className="blog-card">
                            <BlogCard
                                imgPath={emotion}
                                title="Stop Building Chatbots, Build Data Agents Instead"
                                description="Why simple chatbots fail and data agents are the future. A look at the shift towards more capable and autonomous data agents."
                                link="https://medium.com/@abhiishekwrites/stop-building-chatbots-build-data-agents-instead-173d46d885a9"
                                date="05 Feb 2026"
                            />
                        </Col>

                    </Row>
                </motion.div>
            </Container>
        </Container>
    );
}

export default Blogs;
