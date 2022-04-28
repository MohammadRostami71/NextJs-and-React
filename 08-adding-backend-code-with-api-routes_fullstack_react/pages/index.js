 import {useRef, useState} from "react";

export default function Home() {
    const emailInputRef = useRef();
    const feedbackInputRef = useRef();
    const [feedbackItems, setFeedbackItems] = useState([]);
    const submitHandler = (event) => {
        event.preventDefault();
        const enteredEmail = emailInputRef.current.value;
        const enteredFeedback = feedbackInputRef.current.value;
        const reqBody={
            email:enteredEmail,
            feedback:enteredFeedback
        };
        fetch('/api/feedback',{
            method:'POST',
            body:JSON.stringify(reqBody),
            headers:{
              'Content-Type':'application/json'
            }
        }).then((response) => response.json())
            .then((data) => console.log(data));
    };
    const loadFeedbackHandler = () => {
        fetch('/api/feedback')
            .then((response) => response.json())
            .then((data) => {
                setFeedbackItems(data.feedback);
            });
    }
  return (
    <div>
      <h1>Home Page</h1>
      <form onSubmit={submitHandler}>
        <div>
          <label htmlFor='email'>Email</label>
          <input type='email' id='email' ref={emailInputRef}/>
        </div>
        <div>
          <label htmlFor='feedback'>Feedback</label>
          <input type='text' id='feedback' ref={feedbackInputRef}/>
        </div>
          <button>Send Feedback</button>
      </form>
        <hr/>
        <button onClick={loadFeedbackHandler}>Load Feedback</button>
        <ul>
            {feedbackItems.map((item) => (
                <li key={item.id}>{item.feedback}</li>
            ))}
        </ul>
    </div>
  )
}
