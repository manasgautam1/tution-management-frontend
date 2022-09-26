import React, { useState, useEffect } from 'react'
import axios from 'axios';

const ManageStudents = () => {
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
  const deleteStudent = (id) => {
    axios.delete(`http://localhost:5000/user/${id}`).then((res) =>{
        // console.log(res)
        showStudents();
    })
  }
  return (
    <div>
      <div className="container py-4">
        <h2 className="text-center">
          Students
        </h2>
        <table className="table table-bordered">
        <thead>
            <tr className='bg-dark text-light text-center'>
            <th style={{width: "7.5%"}} scope="col">S. No.</th>
            <th style={{width: "40%"}} scope="col">Name</th>
            <th style={{width: "45%"}} scope="col">Email</th>
            <th style={{width: "7.5%"}} scope='col'></th>
            </tr>
        </thead>
        <tbody>
            {data.map((a, index)=>(<tr key={index}>
                <th scope="row">{index+1}</th>
                <td>{a.name}</td>
                <td>{a.email}</td>
                <td className='text-danger text-center' onClick={()=>deleteStudent(a._id)}><i className="fa-solid fa-trash"></i></td>
            </tr>)
            )}
        </tbody>
        </table>
      </div>
    </div>
  )
}

export default ManageStudents