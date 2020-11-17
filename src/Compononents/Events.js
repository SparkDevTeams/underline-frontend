import React, {useState, useEffect} from "react";
import {Accordion, Card} from "react-bootstrap";
import axios from "axios";

const Events = () => {

    const [state, setState] = useState({
        Events: [],
    });

      const renderEvents = async() => {
        try {
            let res = await axios.get('https://sparkdev-underline.herokuapp.com/events/find/all')
            let e = res.data.events;
            
            setState({
                Events: e.map((event, i) => 
                    i === 0 ? <Card>
                    <Accordion.Toggle as={Card.Header} eventKey="0">
                    {event.title} {i}
                    </Accordion.Toggle>
                    <Accordion.Collapse eventKey="0">
                        <Card.Body><b>Description:</b> {event.description}</Card.Body>
                    </Accordion.Collapse>
                </Card> : 

                <Card>
                <Accordion.Toggle as={Card.Header} eventKey={i}>
                {event.title}
                </Accordion.Toggle>
                <Accordion.Collapse eventKey={i}>
                    <Card.Body><b>Description:</b> {event.description}</Card.Body>
                </Accordion.Collapse>
                </Card>
                )
            });

            
           
        } catch (err) {
            console.log(err);
        }
    }

    useEffect(() => {
        renderEvents();
    });

    return (
        <div>
            <Accordion>
                {state.Events}
            </Accordion>
        </div>
    )
}

export default Events;