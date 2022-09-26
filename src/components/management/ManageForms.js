import React, {useState, useEffect} from 'react'
import axios from 'axios';
import ContactTable from './forms/ContactTable';
import FeedbackTable from './forms/FeedbackTable';

const ManageForms = () => {
  const [contactArray, SetContactArray] = useState([]);
  const [feedbackArray, SetFeedbackArray] = useState([]);
  const [show, SetShow] = useState(0);
  useEffect(()=>{
    showContact();
  }, []);
  
  const showContact = ()=>{
    axios.get("http://localhost:5000/contact-us")
    .then((res) =>{
        console.log(res)
        SetContactArray(res.data.data);
        SetShow(0);
    })
  }
  const showFeedback = ()=>{
    axios.get("http://localhost:5000/feedback")
    .then((res) =>{
        console.log(res)
        SetFeedbackArray(res.data.data);
        SetShow(1);
    })
  }
  const deleteContact = (id) => {
    axios.delete(`http://localhost:5000/contact-us/${id}`).then((res) =>{
        console.log(res)
        showContact();
    })
  }
  const deleteFeedback = (id) => {
    axios.delete(`http://localhost:5000/feedback/${id}`).then((res) =>{
        console.log(res)
        showFeedback();
    })
  }
  const showDonations=()=>{

  }
  return (
    <div className='manage-forms'>
        <div className="container">
        <h2 className='text-center'>Manage Forms</h2>

        <div className='row mx-0'>
            <div style={{cursor: 'pointer'}} className={show===0 ? 'bg-dark py-2 text-light text-center col-4' : 'bg-secondary py-2 text-light text-center col-4'} onClick={showContact} >
                Contact Us Form
            </div>
            <div style={{cursor: 'pointer'}} className={show===1 ? 'bg-dark py-2 text-light text-center col-4' : 'bg-secondary py-2 text-light text-center col-4'} onClick= {showFeedback}>
                Feedback Form
            </div>
            <div style={{cursor: 'pointer'}} className={show===2 ? 'bg-dark py-2 text-light text-center col-4' : 'bg-secondary py-2 text-light text-center col-4'} onClick = {showDonations}>
                Donations Form
            </div>
        </div>

        <div>
            {show===0 && <ContactTable data={contactArray} deleteContact={deleteContact} />}            
            {show===1 && <FeedbackTable  data={feedbackArray} deleteFeedback={deleteFeedback} /> }            
        </div>
        </div>
    </div>
  )
}

export default ManageForms