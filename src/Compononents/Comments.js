import React, {useState, useEffect} from "react";
import Event from "./Event";
import {Accordion, Card, Button, Collapse} from "react-bootstrap";
import axios from "axios";

const Comments = ({comment_ids}) => {

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
    console.log()
    return (
        <div>
            <Button
                onClick={() => setOpen(!open)}
                aria-controls="commentsCollapseText"
                aria-expanded={open} id="commentsCollapseButton"
                >Show comments</Button>

                <Collapse in={open}>
                    <div id="commentsCollapseText">
                        {comments.length === 0 ? 
                            <Card.Text>
                                <div><b>No Comments</b></div>
                            </Card.Text> : 
                        comments.map((comment) => 
                            <Card.Text>
                                <div><b>Guest:</b></div> {comment}
                            </Card.Text>)}
                    </div>
                </Collapse>
        </div>
    )
}

export default Comments;