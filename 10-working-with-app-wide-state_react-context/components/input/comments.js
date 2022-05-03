import {useContext, useEffect, useState} from 'react';

import CommentList from './comment-list';
import NewComment from './new-comment';
import classes from './comments.module.css';
import NotificationContext from "../../store/notification-context";

function Comments(props) {
    const {eventId} = props;
    const notificationCtx = useContext(NotificationContext);
    const [comments, setComments] = useState([]);
    const [showComments, setShowComments] = useState(false);
    const [isFetchingComment,setIsFetchingComment] = useState(false);

    useEffect(() => {
        if (showComments) {
            setIsFetchingComment(true)
            fetch('/api/comments/' + eventId).then((response) => response.json())
                .then(data => {
                    setComments(data.comments)
                    setIsFetchingComment(false);
                })
        }
    }, [showComments])

    function toggleCommentsHandler() {
        setShowComments((prevStatus) => !prevStatus);
    }

    function addCommentHandler(commentData) {
        // send data to API
        notificationCtx.showNotification({
            title: 'sending comment ...',
            message: 'sending comment for event',
            status: 'pending'
        });
        fetch('/api/comments/' + eventId, {
            method: 'POST',
            body: JSON.stringify(commentData),
            headers: {
                'Content-Type': 'application/json'
            }
        }).then((response) => response.json())
            .then((data) => {
                notificationCtx.showNotification({
                    title: 'success comment ...',
                    message: 'success comment for event',
                    status: 'success'
                });
            }).catch(error => {
            notificationCtx.showNotification({
                title: 'error',
                message: error.message,
                status: 'error'
            });
        });
    }

    return (
        <section className={classes.comments}>
            <button onClick={toggleCommentsHandler}>
                {showComments ? 'Hide' : 'Show'} Comments
            </button>
            {showComments && <NewComment onAddComment={addCommentHandler}/>}
            {showComments && !isFetchingComment &&<CommentList items={comments}/>}
            {showComments && isFetchingComment && <p>Loading ...</p>}
        </section>
    );
}

export default Comments;
