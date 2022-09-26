import React, {useState, useEffect} from 'react';
import axios from 'axios';

const ManageAssignments = () => {
    const [question, SetQuestion] = useState('');
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
        if(question===''){
            handleAlert('Enter all the fields', 'alert alert-danger ');
        }
        else {
            axios({
                method: 'post', 
                data: {
                    question: question,
                },
                withCredentials: true,
                url: 'http://localhost:5000/assignment'
                }).then(res=>{
                if(res.status===200){
                    handleAlert(res.data.msg, 'alert alert-success ', 6000);
                    showAssignment();
                }
                else if(res.status===400){
                    handleAlert(res.data.msg, 'alert alert-danger ');
                }
                });
        }
      SetQuestion('');
    }
    const [data, SetData] = useState([]);

    useEffect(()=>{
        showAssignment();
    }, []);

    const showAssignment = ()=>{
        axios.get("http://localhost:5000/assignment")
        .then((res) =>{
            console.log(res)
            const arr = res.data.data;
            SetData(arr);
        })
    }
    const deleteAssignment = (id) => {
        axios.delete(`http://localhost:5000/assignment/${id}`).then((res) =>{
            // console.log(res)
            showAssignment();
        })
    }


  return  (
    <div className='manage-resources'>
      <div className={showAlert==true ? alertMsgClass+"show" : alertMsgClass}>
          <strong>{alertMsg}</strong>
      </div>
      <div className="card">
      <div className="card-body">
          <h4 className='text-center'>Add Assignment</h4>
          <hr />
          <form onSubmit={(e)=>{
              handleSubmit(e);
          }}>
              <div className="form-group mb-3">
                  <label htmlFor="question">Question</label>
                  <textarea row='4' className="form-control mt-2" id="question" placeholder="Enter question"
                  value={question} onChange={(e)=>{
                      SetQuestion(e.target.value);
                  }} > </textarea>
              </div>
              <button type="submit" className="btn btn-primary">Add assignment</button>
          </form>
      </div>
      </div>
      <div className="container py-4">
      <h2 className="text-center">
        Assignments
      </h2>
      <table className="table table-bordered">
      <thead>
          <tr className='bg-dark text-light text-center'>
          <th style={{width: "7.5%"}} scope="col">S. No.</th>
          <th style={{width: "35%"}} scope="col">Question</th>
          <th style={{width: "50%"}} scope="col">Done By</th>
          <th style={{width: "7.5%"}} scope='col'></th>
          </tr>
      </thead>
      <tbody>
          {data.map((a, index)=>(<tr key={index}>
              <th scope="row">{index+1}</th>
              <td>{a.question}</td>
              <td>{a.doneBy.length === 0 ? 'None' : a.doneBy.map((x,index) => <span key={index}>{x.name + ", "}</span>) }</td>
              <td className='text-danger text-center' onClick={()=>deleteAssignment(a._id)}><i className="fa-solid fa-trash"></i></td>
          </tr>)
          )}
      </tbody>
      </table>
    </div>
  </div>
)}

export default ManageAssignments