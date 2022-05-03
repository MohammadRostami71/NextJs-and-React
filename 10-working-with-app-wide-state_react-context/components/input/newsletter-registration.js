import classes from './newsletter-registration.module.css';
import {useRef, useContext} from "react";
import NotificationContext from "../../store/notification-context";

function NewsletterRegistration() {
    const emailInputRef = useRef();
    const notificationCtx = useContext(NotificationContext);
    const registrationHandler = (event) => {
        event.preventDefault();
        const enteredEmailInput = emailInputRef.current.value;
        // fetch user input (state or refs)
        // optional: validate input
        // send valid data to API
        notificationCtx.showNotification({
            title: 'Singing up ...',
            message: 'Registering news Letter',
            status: 'pending'
        });
        fetch('/api/newsLetter', {
            method: 'POST',
            body: JSON.stringify({email: enteredEmailInput}),
            headers: {
                'Content-Type': 'application/json'
            }
        }).then((response) => {
            if (response.ok){
                return response.json();
            }
            return response.json().then(data => {
                throw new Error(data.message)
            })
        }).then((data) => {
                notificationCtx.showNotification({
                    title: 'success',
                    message: 'success registered for news Letter',
                    status: 'success'
                });
            }).catch(error => {
            notificationCtx.showNotification({
                title: 'error',
                message: error.message,
                status: 'error'
            });
        })
    }

    return (
        <section className={classes.newsletter}>
            <h2>Sign up to stay updated!</h2>
            <form onSubmit={registrationHandler}>
                <div className={classes.control}>
                    <input
                        type='email'
                        id='email'
                        placeholder='Your email'
                        aria-label='Your email'
                        ref={emailInputRef}
                    />
                    <button>Register</button>
                </div>
            </form>
        </section>
    );
}

export default NewsletterRegistration;
