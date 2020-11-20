import React, {useState, useEffect} from "react";
import {Accordion, Card} from "react-bootstrap";
import StarRatings from 'react-star-ratings';
import Event from "./Event"
import axios from "axios";

const Events = () => {

    const [events, setEvents] = useState({
        Events: [],
    });

      const renderEvents = async() => {
        try {
            let res = await axios.get('https://sparkdev-underline.herokuapp.com/events/find/all')
            let e = res.data.events;

            setEvents({
                Events: e.map((event, i) => {
                    return (
                        <Event title={event.title} description={event.description} eventKey={i} comment_ids={event.comment_ids} key={i}/>
                    )
                }
                )
            });
        } catch (err) {
            console.log(err);
        }
    }

    useEffect(() => {
        renderEvents();
    }, []);

    return (
        <div>
            <Accordion>
                {events.Events}
            </Accordion>
        </div>
    )
}

export default Events;