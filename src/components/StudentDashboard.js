import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import FeedbackForm from './students/FeedbackForm';
import SAssignment from './students/SAssignment';
import SClassesToday from './students/SClassesToday';
import SResources from './students/SResources';
import STimetable from './students/STimetable';
import Todo from './students/Todo';


const StudentDashboard = () => {
    const [show, SetShow] = useState(0);
    const [user, SetUser] = useState();
    const [timeTable, SetTimeTable] = useState();

    let navigate = useNavigate();
    useEffect(()=>{
        let user = localStorage.getItem('user');
        user = JSON.parse(user);
        if(user!=null){
            SetUser(user);
            if(user?.isAdmin==='true'){
                navigate('/admin-dashboard');
            }
            else {
                navigate('/student-dashboard');
            }
            showTimetable(user?._id);
        }
        else {
            navigate('/login');
        }
    }, []);

    const showTimetable = (id)=>{
        axios.get("http://localhost:5000/timetable")
        .then((res) =>{
            // console.log(res)
            const arr = res?.data?.data?.filter(x => {
                if(x.student.id === id){
                  return true;
                }
                return false;
            });
            
            SetTimeTable(arr);
            console.log(arr);
        })
      }

    const handleLogout = () =>{
        localStorage.setItem('user', null);
        navigate('/');
    }
  return (
    <div>
    <nav className="navbar navbar-dark bg-dark">
            <div className="container">
                <span className="navbar-brand mb-0 h1">Hello, {user?.name}</span>
                
                <button className='btn btn-danger' onClick={handleLogout}>Logout</button>
            </div>
        </nav>
        <div className="container py-4">
            <div className="d-flex flex-wrap justify-content-between align-items-center">
                <button className={show===0 ? "btn btn-dark" : "btn btn-secondary"} onClick={()=>SetShow(0)}>
                    Classes Today
                </button>
                <button className={show===1 ? "btn btn-dark" : "btn btn-secondary"} onClick={()=>SetShow(1)}>
                    Assignments
                </button>
                <button className={show===2 ? "btn btn-dark" : "btn btn-secondary"} onClick={()=>SetShow(2)}>
                    Todo List
                </button>
                <button className={show===3 ? "btn btn-dark" : "btn btn-secondary"} onClick={()=>SetShow(3)}>
                    Feedback Form
                </button>
                <button className={show===4 ? "btn btn-dark" : "btn btn-secondary"} onClick={()=>{
                    showTimetable(user?._id);
                    SetShow(4);
                }}>
                   Time table
                </button>
                <button className={show===5 ? "btn btn-dark" : "btn btn-secondary"}onClick={()=>SetShow(5)}>
                   Resources
                </button>
            </div>
            <div className='py-3'>
                {show===0 && <SClassesToday timetable={timeTable} /> }
                {show===1 && <SAssignment /> }
                {show===2 && <Todo /> }
                {show===3 && <FeedbackForm />}
                {show===5 && <SResources />}
                {show===4 && <STimetable timetable={timeTable} /> }

            </div>
        </div>
    </div>
  )
}

export default StudentDashboard