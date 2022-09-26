import React, {useState} from 'react'
import axios from 'axios';

const FeedbackForm = () => {
    const [name, SetName] = useState('');
    const [email, SetEmail] = useState('');
    const [feedback, SetdFeedback] = useState('');
    const [showAlert, SetShowAlert] = useState(false);
    const [alertMsg, SetAlertMsg] = useState('');
    const [alertMsgClass, SetAlertMsgClass] = useState('');

    const handleAlert = (msg, myclass, time=5000) => {
        SetAlertMsg(msg);
        SetShowAlert(true);
        SetAlertMsgClass(myclass);
        setTimeout(() => {
            SetShowAlert(false)
        }, time);
      }
    
    const handleSubmit = (e)=>{
    e.preventDefault();
    if(email==='' || name==='' ||feedback===''){
        handleAlert('Enter all the fields', 'alert alert-danger ');
    }
    else {
        axios({
            method: 'post', 
            data: {
                email: email,
                name: name,
                feedback: feedback
            },
            withCredentials: true,
            url: 'http://localhost:5000/feedback'
            }).then(res=>{
            if(res.status===200){
                handleAlert(res.data.msg, 'alert alert-success ', 6000);
            }
            else if(res.status===400){
                handleAlert(res.data.msg, 'alert alert-danger ');
            }
            });
    }
    
    SetName('');
    SetEmail('');
    SetdFeedback('');
    }
    
  return (
    <div className='admissions'>
        <div className={showAlert==true ? alertMsgClass+"show" : alertMsgClass}>
            <strong>{alertMsg}</strong>
        </div>
        <div className='container py-5'>
        <div className="card">
        <div className="card-body">
            <h3 className='text-center'>Feedback Form</h3>
            <hr />
            <form onSubmit={(e)=>{
                handleSubmit(e);
            }}>
                <div className="form-group mb-3">
                    <label htmlFor="name">Name</label>
                    <input type="name" className="form-control mt-2" id="name" placeholder="Enter name"
                    value={name} onChange={(e)=>{
                        SetName(e.target.value);
                    }} />
                </div>
                <div className="form-group mb-3">
                    <label htmlFor="email">Email</label>
                    <input type="email" className="form-control mt-2" id="email" placeholder="Enter email address"
                    value={email} onChange={(e)=>{
                        SetEmail(e.target.value);
                    }} />
                </div>
                <div className="form-group mb-3">
                    <label htmlFor="feedback">What would you like to know?</label>
                    <textarea className="form-control mt-2" id="feedback" rows="5" placeholder='Enter your feedback' value={feedback} onChange={(e)=>{
                        SetdFeedback(e.target.value);
                    }}></textarea>
                </div>
                <button type="submit" className="btn btn-primary">Submit</button>
            </form>
        </div>
        </div>
        </div>
    </div>
  )
}

export default FeedbackForm