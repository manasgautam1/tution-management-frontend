import React, {useState, useEffect} from 'react'
import axios from 'axios';

const Students = () => {
    const [data, SetData] = useState([]);
    const [show, SetShow] = useState(0);

    const alumini = [
        { name : 'John Doe', email : 'john@email.com' },
        { name : 'Jane Doe', email : 'jane@email.com' },
        { name : 'Jake Williams', email : 'jake@email.com' },
    ]

    useEffect(()=>{
        showStudents();
    }, []);

    const showStudents = ()=>{
        axios.get("http://localhost:5000/user")
        .then((res) =>{
            console.log(res)
            const arr = res.data.data.slice(1,);
            SetData(arr);
        })
    }
  return (
    <div>
        <div className="bg-dark py-2">
            <div className="container text-center">
                <h2 className="text-light">Students</h2>
            </div>
        </div>
        <div className="container py-5">
        <div className="row mx-0">
            <div style={{cursor: 'pointer'}} className={show===0 ? 'bg-dark py-2 text-light text-center col-6' : 'bg-secondary py-2 text-light text-center col-6'} onClick={()=>{SetShow(0)}} >
                Current Students
            </div>
            <div style={{cursor: 'pointer'}} className={show===1 ? 'bg-dark py-2 text-light text-center col-6' : 'bg-secondary py-2 text-light text-center col-6'} onClick= {()=>{SetShow(1)}}>
                Alumini
            </div>
        </div>
        <div>
            {
                show===0 && <div>
                <table className="table table-bordered mt-3">
                <thead>
                    <tr className='bg-dark text-light'>
                        <th style={{width: "10%"}} scope="col">S. No.</th>
                        <th style={{width: "40%"}} scope="col">Name</th>
                        <th style={{width: "50%"}} scope="col">Email</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map((a, index)=>(<tr key={index}>
                        <th scope="row">{index+1}</th>
                        <td>{a.name}</td>
                        <td>{a.email}</td>
                    </tr>)
                    )}
                </tbody>
                </table>
                </div>
            }
            {
                show===1 && <div>
                <table className="table table-bordered mt-3">
                <thead>
                    <tr className='bg-dark text-light'>
                        <th style={{width: "10%"}} scope="col">S. No.</th>
                        <th style={{width: "40%"}} scope="col">Name</th>
                        <th style={{width: "50%"}} scope="col">Email</th>
                    </tr>
                </thead>
                <tbody>
                    {alumini.map((a, index)=>(<tr key={index}>
                        <th scope="row">{index+1}</th>
                        <td>{a.name}</td>
                        <td>{a.email}</td>
                    </tr>)
                    )}
                </tbody>
                </table>
                </div>
            }
        </div>
        </div>
    </div>
  )
}

export default Students