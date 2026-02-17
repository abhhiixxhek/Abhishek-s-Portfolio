import React from "react";
import Card from "react-bootstrap/Card";
import { BsArrowRight } from "react-icons/bs";

function BlogCard({ imgPath, title, description, link, date }) {
    return (
        <Card className="blog-card-view">
            <div className="blog-img-wrapper">
                <Card.Img variant="top" src={imgPath} alt="blog-img" className="blog-img" />
                <div className="blog-date">{date}</div>
            </div>
            <Card.Body className="blog-body">
                <Card.Title className="blog-title">{title}</Card.Title>
                <Card.Text className="blog-description">
                    {description}
                </Card.Text>
                <a href={link} target="_blank" rel="noopener noreferrer" className="blog-btn">
                    Read Article <BsArrowRight />
                </a>
            </Card.Body>
        </Card>
    );
}

export default BlogCard;
