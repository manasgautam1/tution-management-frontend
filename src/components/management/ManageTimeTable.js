import React, { useState, useEffect } from 'react'
import axios from 'axios';
import { Link } from 'react-router-dom';

const ManageTimeTable = () => {
  const [data, SetData] = useState([]);

  useEffect(()=>{
    showStudents();
  }, []);

  const showStudents = ()=>{
    axios.get("http://localhost:5000/user")
    .then((res) =>{
        // console.log(res)
        const arr = res.data.data.slice(1,);
        SetData(arr);
    })
  }

  return (
    <div>
      <div className="container py-4">
        <h2 className="text-center">
          Timetable
        </h2>
        <table className="table table-bordered">
        <thead>
            <tr className='bg-dark text-light text-center'>
            <th style={{width: "10%"}} scope="col">S. No.</th>
            <th style={{width: "75%"}} scope="col">Name</th>
            <th style={{width: "15%"}} scope="col"></th>
            </tr>
        </thead>
        <tbody>
            {data.map((a, index)=>(
              <tr key={index}>
                <th scope="row">{index+1}</th>
                <td>{a.name}</td>
                <Link to={`/timetable/${a._id}`} className='btn btn-success bg-success' style={{cursor: 'pointer', width: '100%'}}>Show Timetable</Link>
              </tr>
              )
            )}
        </tbody>
        </table>
        
      </div>
    </div>
  )
}

export default ManageTimeTable