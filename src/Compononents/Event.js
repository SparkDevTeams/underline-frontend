import React, {useState, useEffect} from "react";
import {Accordion, Card} from "react-bootstrap";
import StarRatings from 'react-star-ratings';
import axios from "axios";

const Event = ({title, description, eventKey}) => {

    const [rating, setRating] = useState(5);

    const changeRating = (newRating, name) => {
        setRating(newRating);
        console.log(newRating);
    }

    return (
        eventKey === 0 ? 
        <Card>
                <Accordion.Toggle as={Card.Header} eventKey="0">
                {title}

                <StarRatings
                    rating={rating}
                    starRatedColor="#3EB44A"
                    starHoverColor="#3EB44A"
                    changeRating={changeRating}
                    starDimension="30px"
                    numberOfStars={5}
                    name="rating"
                />
                </Accordion.Toggle>
                <Accordion.Collapse eventKey="0">
                    <Card.Body><b>Description:</b> {description}</Card.Body>
                </Accordion.Collapse>
        </Card>
        :
        <Card>
                <Accordion.Toggle as={Card.Header} eventKey={eventKey}>
                {title}

                <StarRatings
                    rating={rating}
                    starRatedColor="#3EB44A"
                    starHoverColor="#3EB44A"
                    changeRating={changeRating}
                    starDimension="30px"
                    numberOfStars={5}
                    name='rating'
                />
                </Accordion.Toggle>
                <Accordion.Collapse eventKey={eventKey}>
                    <Card.Body><b>Description:</b> {description}</Card.Body>
                </Accordion.Collapse>
        </Card>
    )

}

export default Event;