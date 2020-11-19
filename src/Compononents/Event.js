import React, {useState, useEffect} from "react";
import {Accordion, Card, Button, Collapse} from "react-bootstrap";
import StarRatings from 'react-star-ratings';
import axios from "axios";

const Event = ({title, description, eventKey, comment_ids}) => {

    const [open, setOpen] = useState(false);
    const [comments, setComments] = useState([]);
    let commentsArr = [];

    useEffect(() => {
        const renderComments = async() => {
                let promiseArray = comment_ids.map(async(comment_id, i) => {
                    try {
                        let res = await axios.get(`https://sparkdev-underline.herokuapp.com/feedback/${comment_id}`)
                        
                        let comment = res.data.comment;
                        commentsArr.push(comment);

                        return res;
                    } catch(err) {
                        console.log(err)
                    }
    
                })
                await Promise.all(promiseArray)
                setComments(commentsArr)
        }
        
        renderComments();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []); 

    comments.forEach(comment => console.log(comment))
   

    return (
        eventKey === 0 ? 
        <Card>
                <Accordion.Toggle as={Card.Header} eventKey="0">
                {title}
                </Accordion.Toggle>
                <Accordion.Collapse eventKey="0">
                    <Card.Body>
                        <div><b>Description:</b> {description}</div>
                        <Button
                            onClick={() => setOpen(!open)}
                            aria-controls="commentsCollapseText"
                            aria-expanded={open} id="commentsCollapseButton"
                        >Show comments</Button>

                        <Collapse in={open}>
                            <div id="commentsCollapseText">
                            {comments.map((comment) => 
                                <Card.Text>
                                    <div><b>Guest:</b></div> {comment}
                                </Card.Text>)}
                            </div>
                        </Collapse>
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
                        <b>Comment IDs:</b> {comments}
                    </Card.Body>
                </Accordion.Collapse>
        </Card>
    )

}

export default Event;