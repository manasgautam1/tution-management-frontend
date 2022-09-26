import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';

import ManageStudents from './management/ManageStudents';
import ManageAssignments from './management/ManageAssignments';
import ManageTimeTable from './management/ManageTimeTable';
import ManageResources from './management/ManageResources';
import ManageForms from './management/ManageForms';

const AdminDashboard = () => {
  const [show, SetShow] = useState(0);

  let navigate = useNavigate();
  useEffect(()=>{
    let user = localStorage.getItem('user');
    user = JSON.parse(user);
    if(user!=null){
        if(user?.isAdmin==='true'){
            navigate('/admin-dashboard');
        }
        else {
            navigate('/student-dashboard');
        }
    }
    else {
        navigate('/login');
    }
  }, []);

  const handleLogout = () =>{
    localStorage.setItem('user', null);
    navigate('/');
  }

  return (
    <div>
        <nav className="navbar navbar-dark bg-dark">
            <div className="container">
                <span className="navbar-brand mb-0 h1">Hello, Admin</span>
                
                <button className='btn btn-danger' onClick={handleLogout}>Logout</button>
            </div>
        </nav>
        <div className="container py-4">
            <div className="d-flex flex-wrap justify-content-between align-items-center">
                <button className={show===0 ? "btn btn-dark" : "btn btn-secondary"} onClick={()=>SetShow(0)}>
                    Manage students
                </button>
                <button className={show===1 ? "btn btn-dark" : "btn btn-secondary"}onClick={()=>SetShow(1)}>
                    Manage assignment
                </button>
                <button className={show===2 ? "btn btn-dark" : "btn btn-secondary"}onClick={()=>SetShow(2)}>
                    Manage timetables
                </button>
                <button className={show===3 ? "btn btn-dark" : "btn btn-secondary"}onClick={()=>SetShow(3)}>
                    Manage resources
                </button>
                <button className={show===4 ? "btn btn-dark" : "btn btn-secondary"}onClick={()=>SetShow(4)}>
                    Manage forms
                </button>
            </div>
        </div>
        <div className="">
            {show===0 && <ManageStudents /> }
            {show===1 && <ManageAssignments /> }
            {show===2 && <ManageTimeTable /> }
            {show===3 && <ManageResources /> }
            {show===4 && <ManageForms /> }
        </div>
    </div>
  )
}

export default AdminDashboard