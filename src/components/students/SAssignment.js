import React, {useState, useEffect} from 'react'
import axios from 'axios';

const SAssignment = () => {
    const [data, SetData] = useState([]);
    const [userId, SetUserId] = useState();
    const [userName, SetUserName] = useState();

    useEffect(()=>{
        let user = localStorage.getItem('user');
        user = JSON.parse(user);
        SetUserId(user?._id);
        SetUserName(user?.name);
        showAssignment(user?._id);
    }, []);

    const showAssignment = (UId)=>{
        axios.get("http://localhost:5000/assignment")
        .then((res) =>{
            const arr = res.data.data.filter(x => {
                const y = x.doneBy.map(z=>{
                    return z.id
                });
                let bool = false;
                y.forEach(e => {
                    if(e===UId){
                        bool = true;
                    }
                });
                return !bool;
            })
            SetData(arr);
        })
    }
    const updateAssignment = (id)=>{
        axios({
            method: 'put',
            url: `http://localhost:5000/assignment/${id}`,
            data: {
                id: userId,
                name: userName
            }
        }).then((res) =>{
            showAssignment(userId);
            console.log(res);
        })
    }
  return (
    <div>
      <div className="container py-4">
        <h3 className="text-center">
          Assignments
        </h3>
        <table className="table table-bordered">
        <thead>
            <tr className='bg-dark text-light text-center'>
            <th style={{width: "12.5%"}} scope="col">S. No.</th>
            <th style={{width: "75%"}} scope="col">Assignment</th>
            <th style={{width: "12.5%"}} scope='col'>Submit</th>
            </tr>
        </thead>
        <tbody>
            {data.map((a, index)=>(<tr key={index}>
                <th scope="row">{index+1}</th>
                <td>{a.question}</td>
                <td style={{cursor: 'pointer'}} className='bg-success text-light text-center' onClick={()=>updateAssignment(a._id)}>Submit</td>
            </tr>)
            )}
        </tbody>
        </table>
      </div>
    </div>
  )
}

export default SAssignment