import React, {useState, useEffect} from "react";
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
                Events: e.map((event, i) => <li key={i} className="list-event">{event.title}</li>)
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
            <ul>
                {state.Events}
            </ul>
        </div>
    )
}

export default Events;