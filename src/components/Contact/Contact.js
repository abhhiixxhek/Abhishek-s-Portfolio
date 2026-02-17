import React, { useState } from "react";
import { Container, Row, Col, Button, Form } from "react-bootstrap";
import Particle from "../Particle";
import { motion, AnimatePresence } from "framer-motion";
import { FaPaperPlane, FaCheckCircle } from "react-icons/fa";
import emailjs from "emailjs-com";

function Contact() {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        message: ""
    });
    const [isSending, setIsSending] = useState(false);
    const [isSent, setIsSent] = useState(false);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setIsSending(true);

        emailjs.send(
            'service_dx5iu2q', // User's Service ID
            'template_s5q6297', // User's Template ID
            formData,
            'c1WWigqIFhP720Z5W' // User's Public Key
        ).then((response) => {
            console.log('SUCCESS!', response.status, response.text);
            setIsSending(false);
            setIsSent(true);
            setFormData({ name: "", email: "", message: "" });
            setTimeout(() => setIsSent(false), 3000);
        }).catch((err) => {
            console.error('FAILED...', err);
            setIsSending(false);
            let errorMessage = "Failed to send message.";
            if (err.text) {
                errorMessage += " Error: " + err.text;
            } else if (err.message) {
                errorMessage += " Error: " + err.message;
            }
            alert(errorMessage + " Please check your EmailJS configuration or try again later.");
        });
    };

    return (
        <Container fluid className="project-section">
            <Particle />
            <Container>
                <Row className="justify-content-center">
                    <Col md={8} style={{ paddingTop: "20px" }}>
                        <h1 style={{ fontSize: "2.3em", paddingBottom: "20px", color: "white" }}>
                            Contact <strong className="purple">Me</strong>
                        </h1>

                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.5 }}
                            className="contact-card"
                            style={{
                                backgroundColor: "rgba(17, 25, 40, 0.75)",
                                backdropFilter: "blur(16px)",
                                border: "1px solid rgba(255, 255, 255, 0.125)",
                                borderRadius: "15px",
                                padding: "40px",
                                boxShadow: "0 4px 30px rgba(0, 0, 0, 0.1)"
                            }}
                        >
                            <Form onSubmit={handleSubmit}>
                                <Form.Group className="mb-3" controlId="formName">
                                    <Form.Label style={{ color: "white" }}>Name</Form.Label>
                                    <Form.Control
                                        type="text"
                                        name="name"
                                        value={formData.name}
                                        onChange={handleChange}
                                        placeholder="Your Name"
                                        required
                                        style={{ backgroundColor: "rgba(255,255,255,0.1)", border: "none", color: "white" }}
                                    />
                                </Form.Group>

                                <Form.Group className="mb-3" controlId="formEmail">
                                    <Form.Label style={{ color: "white" }}>Email</Form.Label>
                                    <Form.Control
                                        type="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        placeholder="Your Email"
                                        required
                                        style={{ backgroundColor: "rgba(255,255,255,0.1)", border: "none", color: "white" }}
                                    />
                                </Form.Group>

                                <Form.Group className="mb-3" controlId="formMessage">
                                    <Form.Label style={{ color: "white" }}>Message</Form.Label>
                                    <Form.Control
                                        as="textarea"
                                        name="message"
                                        value={formData.message}
                                        onChange={handleChange}
                                        rows={4}
                                        placeholder="Write your message..."
                                        required
                                        style={{ backgroundColor: "rgba(255,255,255,0.1)", border: "none", color: "white" }}
                                    />
                                </Form.Group>

                                <div style={{ position: 'relative', width: 'fit-content' }}>
                                    <Button
                                        variant="primary"
                                        type="submit"
                                        disabled={isSending || isSent}
                                        style={{
                                            display: "flex",
                                            alignItems: "center",
                                            gap: "10px",
                                            background: isSent ? "#28a745" : "linear-gradient(90deg, #a24dd3 0%, #6f42c1 100%)",
                                            border: "none",
                                            padding: "10px 25px",
                                            fontSize: "1.1em"
                                        }}
                                    >
                                        <AnimatePresence mode="wait">
                                            {isSent ? (
                                                <motion.div
                                                    key="sent"
                                                    initial={{ opacity: 0, scale: 0.5 }}
                                                    animate={{ opacity: 1, scale: 1 }}
                                                    exit={{ opacity: 0, scale: 0.5 }}
                                                >
                                                    Sent! <FaCheckCircle />
                                                </motion.div>
                                            ) : isSending ? (
                                                <motion.div
                                                    key="sending"
                                                    initial={{ opacity: 0 }}
                                                    animate={{ opacity: 1 }}
                                                    exit={{ opacity: 0 }}
                                                >
                                                    Sending...
                                                </motion.div>
                                            ) : (
                                                <motion.div
                                                    key="send"
                                                    style={{ display: "flex", alignItems: "center", gap: "10px" }}
                                                >
                                                    Send Message
                                                    <motion.div
                                                        animate={isSending ? { x: 100, opacity: 0 } : { x: 0, opacity: 1 }}
                                                        transition={{ duration: 0.5 }}
                                                    >
                                                        <FaPaperPlane />
                                                    </motion.div>
                                                </motion.div>
                                            )}
                                        </AnimatePresence>
                                    </Button>

                                    {/* Flying Plane Animation */}
                                    {isSending && (
                                        <motion.div
                                            initial={{ top: 0, left: '100%', opacity: 1, scale: 1 }}
                                            animate={{ top: -100, left: '300%', opacity: 0, scale: 0.5 }}
                                            transition={{ duration: 1.5, ease: "easeInOut" }}
                                            style={{ position: "absolute", color: "#c770f0", fontSize: "1.5em", pointerEvents: 'none' }}
                                        >
                                            <FaPaperPlane />
                                        </motion.div>
                                    )}
                                </div>
                            </Form>
                        </motion.div>
                    </Col>
                </Row>
            </Container>
        </Container>
    );
}

export default Contact;
