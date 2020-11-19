import React, {useState, useEffect} from "react";
import {Accordion, Card, Button, Collapse} from "react-bootstrap";
import Comments from './Comments';
import axios from "axios";

const Event = ({title, description, eventKey, comment_ids}) => {
   
    return (
        eventKey === 0 ? 
        <Card>
                <Accordion.Toggle as={Card.Header} eventKey="0">
                {title}
                </Accordion.Toggle>
                <Accordion.Collapse eventKey="0">
                    <Card.Body>
                        <div><b>Description:</b> {description}</div>
                        <Comments comment_ids={comment_ids}/>
                    </Card.Body>
                </Accordion.Collapse>
        </Card>
        :
        <Card>
                <Accordion.Toggle as={Card.Header} eventKey={eventKey}>
                {title}
                </Accordion.Toggle>
                <Accordion.Collapse eventKey={eventKey}>
                    <Card.Body>
                        <div><b>Description:</b> {description}</div>
                        <Comments comment_ids={comment_ids}/>
                    </Card.Body>
                </Accordion.Collapse>
        </Card>
    )

}

export default Event;