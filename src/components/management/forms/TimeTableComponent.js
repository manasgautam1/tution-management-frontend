import axios from 'axios';
import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom';

const TimeTableComponent = () => {
  const params = useParams();
  const [id, SetId] = useState(params.id);
  const [name, SetName] = useState(params.name);

  const [disabled, SetDisabled] = useState(true);
  const [data, SetData] = useState([]);

  const [monday1, SetMonday1] = useState('');
  const [monday2, SetMonday2] = useState('');
  const [monday3, SetMonday3] = useState('');
  const [monday4, SetMonday4] = useState('');

  const [tuesday1, SetTuesday1] = useState('');
  const [tuesday2, SetTuesday2] = useState('');
  const [tuesday3, SetTuesday3] = useState('');
  const [tuesday4, SetTuesday4] = useState('');

  const [wednesday1, SetWednesday1] = useState('');
  const [wednesday2, SetWednesday2] = useState('');
  const [wednesday3, SetWednesday3] = useState('');
  const [wednesday4, SetWednesday4] = useState('');

  const [thursday1, SetThursday1] = useState('');
  const [thursday2, SetThursday2] = useState('');
  const [thursday3, SetThursday3] = useState('');
  const [thursday4, SetThursday4] = useState('');

  const [friday1, SetFriday1] = useState('');
  const [friday2, SetFriday2] = useState('');
  const [friday3, SetFriday3] = useState('');
  const [friday4, SetFriday4] = useState('');

  const [saturday1, SetSaturday1] = useState('');
  const [saturday2, SetSaturday2] = useState('');
  const [saturday3, SetSaturday3] = useState('');
  const [saturday4, SetSaturday4] = useState('');

    useEffect(()=>{
        SetId(params.id);
        axios.get("http://localhost:5000/user")
        .then((res) =>{
            // console.log(res)
            const arr = res.data.data.slice(1,);
            console.log(arr);
            arr.forEach(x => {
                if(x._id==params.id){
                    SetName(x.name);
                }
            });
        })
        getTimetable(id);        
    }, [id]);

    const getTimetable = ()=>{
        axios.get("http://localhost:5000/timetable")
        .then((res) =>{
            // console.log(res)
            const arr = res?.data?.data?.filter(x => {
                if(x.student.id === id){
                    return true;
                }
                return false;
            });
            console.log(arr);
            if(arr.length > 0){
                SetData(arr[0]);
                console.log(arr[0]?.student);
            }
            SetMonday1(arr[0]?.table?.monday?.first);
            SetMonday2(arr[0]?.table?.monday?.second);
            SetMonday3(arr[0]?.table?.monday?.third);
            SetMonday4(arr[0]?.table?.monday?.fourth);

            SetTuesday1(arr[0]?.table?.tuesday?.first);
            SetTuesday2(arr[0]?.table?.tuesday?.second);
            SetTuesday3(arr[0]?.table?.tuesday?.third);
            SetTuesday4(arr[0]?.table?.tuesday?.fourth);

            SetWednesday1(arr[0]?.table?.wednesday?.first);
            SetWednesday2(arr[0]?.table?.wednesday?.second);
            SetWednesday3(arr[0]?.table?.wednesday?.third);
            SetWednesday4(arr[0]?.table?.wednesday?.fourth);

            SetThursday1(arr[0]?.table?.thursday?.first);
            SetThursday2(arr[0]?.table?.thursday?.second);
            SetThursday3(arr[0]?.table?.thursday?.third);
            SetThursday4(arr[0]?.table?.thursday?.fourth);

            SetFriday1(arr[0]?.table?.friday?.first);
            SetFriday2(arr[0]?.table?.friday?.second);
            SetFriday3(arr[0]?.table?.friday?.third);
            SetFriday4(arr[0]?.table?.friday?.fourth);

            SetSaturday1(arr[0]?.table?.saturday?.first);
            SetSaturday2(arr[0]?.table?.saturday?.second);
            SetSaturday3(arr[0]?.table?.saturday?.third);
            SetSaturday4(arr[0]?.table?.saturday?.fourth);

        })
    }

  const handleChanges=(id) =>{
    axios({
        method: 'put', 
        data: {
            monday: {
                first: monday1,
                second: monday2,
                third: monday3,
                fourth: monday4
            },
            tuesday: {
                first: tuesday1,
                second: tuesday2,
                third: tuesday3,
                fourth: tuesday4
            },
            wednesday: {
                first: wednesday1,
                second: wednesday2,
                third: wednesday3,
                fourth: wednesday4
            },
            thursday: {
                first: thursday1,
                second: thursday2,
                third: thursday3,
                fourth: thursday4
            },
            friday: {
                first: friday1,
                second: friday2,
                third: friday3,
                fourth: friday4
            },
            saturday: {
                first: saturday1,
                second: saturday2,
                third: saturday3,
                fourth: saturday4
            },
        },
        withCredentials: true,
        url: `http://localhost:5000/timetable/${id}`
        }).then(res=>{
        if(res.status===200){
            console.log(res);
            setNull();
            getTimetable(id);
        }
        else if(res.status===400){
            console.log(res);
        }
    });
  }

  const handleCreateTable = (id)=>{
    axios({
        method: 'post', 
        data: {
            id: id,
            name: name,
            monday: {
                first: monday1,
                second: monday2,
                third: monday3,
                fourth: monday4
            },
            tuesday: {
                first: tuesday1,
                second: tuesday2,
                third: tuesday3,
                fourth: tuesday4
            },
            wednesday: {
                first: wednesday1,
                second: wednesday2,
                third: wednesday3,
                fourth: wednesday4
            },
            thursday: {
                first: thursday1,
                second: thursday2,
                third: thursday3,
                fourth: thursday4
            },
            friday: {
                first: friday1,
                second: friday2,
                third: friday3,
                fourth: friday4
            },
            saturday: {
                first: saturday1,
                second: saturday2,
                third: saturday3,
                fourth: saturday4
            },
        },
        withCredentials: true,
        url: 'http://localhost:5000/timetable'
        }).then(res=>{
        if(res.status===200){
            console.log(res);
            setNull();
            getTimetable(id);
        }
        else if(res.status===400){
            console.log(res);
        }
    });
  }

 const setNull = ()=>{
    SetMonday1("");
    SetMonday2("");
    SetMonday3("");
    SetMonday4("");

    SetTuesday1("");
    SetTuesday2("");
    SetTuesday3("");
    SetTuesday4("");

    SetWednesday1("");
    SetWednesday2("");
    SetWednesday3("");
    SetWednesday4("");

    SetThursday1("");
    SetThursday2("");
    SetThursday3("");
    SetThursday4("");

    SetFriday1("");
    SetFriday2("");
    SetFriday3("");
    SetFriday4("");

    SetSaturday1("");
    SetSaturday2("");
    SetSaturday3("");
    SetSaturday4("");
 }

  return (
    <div className="py-5 container">
      {
        data?.length == 0 && <div> 
            <h3  className="text-center mb-3">Create Timetable for {name}</h3>
            <table className="table table-bordered mt-2 text-center">
      <thead>
          <tr className='bg-dark text-light'>
          <th scope="col">Time</th>
          <th scope="col">Monday</th>
          <th scope="col">Tuesday</th>
          <th scope="col">Wednesday</th>
          <th scope="col">Thursday</th>
          <th scope="col">Friday</th>
          <th scope="col">Saturday</th>
          </tr>
      </thead>
      <tbody>
          <tr>
              <th scope="row">10:00 - 11:00</th>
                <td> 
                    <input type='text' value={monday1} onChange={(e)=>{SetMonday1(e.target.value)}} /> 
                </td>
                <td> 
                    <input type='text' value={tuesday1} onChange={(e)=>{SetTuesday1(e.target.value)}} /> 
                </td>
                <td> 
                    <input type='text' value={wednesday1} onChange={(e)=>{SetWednesday1(e.target.value)}} /> 
                </td>
                <td> 
                    <input type='text' value={thursday1} onChange={(e)=>{SetThursday1(e.target.value)}} /> 
                </td>
                <td> 
                    <input type='text' value={friday1} onChange={(e)=>{SetFriday1(e.target.value)}} /> 
                </td>
                <td> 
                    <input type='text' value={saturday1} onChange={(e)=>{SetSaturday1(e.target.value)}} /> 
                </td>
          </tr>
          <tr>
              <th scope="row">11:00 - 12:00</th>
                <td> 
                    <input type='text' value={monday2} onChange={(e)=>{SetMonday2(e.target.value)}} /> 
                </td>
                <td> 
                    <input type='text' value={tuesday2} onChange={(e)=>{SetTuesday2(e.target.value)}} /> 
                </td>
                <td> 
                    <input type='text' value={wednesday2} onChange={(e)=>{SetWednesday2(e.target.value)}} /> 
                </td>
                <td> 
                    <input type='text' value={thursday2} onChange={(e)=>{SetThursday2(e.target.value)}} /> 
                </td>
                <td> 
                    <input type='text' value={friday2} onChange={(e)=>{SetFriday2(e.target.value)}} /> 
                </td>
                <td> 
                    <input type='text' value={saturday2} onChange={(e)=>{SetSaturday2(e.target.value)}} /> 
                </td>
          </tr>
          <tr>
              <th scope="row">12:30 - 13:30</th>
              <td>Break</td>
              <td>Break</td>
              <td>Break</td>
              <td>Break</td>
              <td>Break</td>
              <td>Break</td>
          </tr>
          <tr>
              <th scope="row">13:30 - 14:30</th>
                <td> 
                    <input type='text' value={monday3} onChange={(e)=>{SetMonday3(e.target.value)}} /> 
                </td>
                <td> 
                    <input type='text' value={tuesday3} onChange={(e)=>{SetTuesday3(e.target.value)}} /> 
                </td>
                <td> 
                    <input type='text' value={wednesday3} onChange={(e)=>{SetWednesday3(e.target.value)}} /> 
                </td>
                <td> 
                    <input type='text' value={thursday3} onChange={(e)=>{SetThursday3(e.target.value)}} /> 
                </td>
                <td> 
                    <input type='text' value={friday3} onChange={(e)=>{SetFriday3(e.target.value)}} /> 
                </td>
                <td> 
                    <input type='text' value={saturday3} onChange={(e)=>{SetSaturday3(e.target.value)}} /> 
                </td>
          </tr>
          <tr>
              <th scope="row">14:30 - 15:30</th>
                <td> 
                    <input type='text' value={monday4} onChange={(e)=>{SetMonday4(e.target.value)}} /> 
                </td>
                <td> 
                    <input type='text' value={tuesday4} onChange={(e)=>{SetTuesday4(e.target.value)}} /> 
                </td>
                <td> 
                    <input type='text' value={wednesday4} onChange={(e)=>{SetWednesday4(e.target.value)}} /> 
                </td>
                <td> 
                    <input type='text' value={thursday4} onChange={(e)=>{SetThursday4(e.target.value)}} /> 
                </td>
                <td> 
                    <input type='text' value={friday4} onChange={(e)=>{SetFriday4(e.target.value)}} /> 
                </td>
                <td> 
                    <input type='text' value={saturday4} onChange={(e)=>{SetSaturday4(e.target.value)}} /> 
                </td>
          </tr>
      </tbody>
      </table>
      <div className="d-flex py-4">
            <button onClick={()=>{
                SetDisabled(true);
                handleCreateTable(id);
            }} className="btn btn-success px-4 me-3">Create Table</button>
      </div>
      </div>
      }
      {
        data?.length != 0 && <div>
            
            <h3 className="text-center mb-3">TimeTable of {name}</h3>
            <table className="table table-bordered mt-2 text-center">
            <thead>
                <tr className='bg-dark text-light'>
                <th scope="col">Time</th>
                <th scope="col">Monday</th>
                <th scope="col">Tuesday</th>
                <th scope="col">Wednesday</th>
                <th scope="col">Thursday</th>
                <th scope="col">Friday</th>
                <th scope="col">Saturday</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <th scope="row">10:00 - 11:00</th>
                        <td> 
                            <input type='text' disabled={disabled} value={monday1} onChange={(e)=>{SetMonday1(e.target.value)}} /> 
                        </td>
                        <td> 
                            <input type='text' disabled={disabled} value={tuesday1} onChange={(e)=>{SetTuesday1(e.target.value)}} /> 
                        </td>
                        <td> 
                            <input type='text' disabled={disabled} value={wednesday1} onChange={(e)=>{SetWednesday1(e.target.value)}} /> 
                        </td>
                        <td> 
                            <input type='text' disabled={disabled} value={thursday1} onChange={(e)=>{SetThursday1(e.target.value)}} /> 
                        </td>
                        <td> 
                            <input type='text' disabled={disabled} value={friday1} onChange={(e)=>{SetFriday1(e.target.value)}} /> 
                        </td>
                        <td> 
                            <input type='text' disabled={disabled} value={saturday1} onChange={(e)=>{SetSaturday1(e.target.value)}} /> 
                        </td>
                </tr>
                <tr>
                    <th scope="row">11:00 - 12:00</th>
                        <td> 
                            <input type='text' disabled={disabled} value={monday2} onChange={(e)=>{SetMonday2(e.target.value)}} /> 
                        </td>
                        <td> 
                            <input type='text' disabled={disabled} value={tuesday2} onChange={(e)=>{SetTuesday2(e.target.value)}} /> 
                        </td>
                        <td> 
                            <input type='text' disabled={disabled} value={wednesday2} onChange={(e)=>{SetWednesday2(e.target.value)}} /> 
                        </td>
                        <td> 
                            <input type='text' disabled={disabled} value={thursday2} onChange={(e)=>{SetThursday2(e.target.value)}} /> 
                        </td>
                        <td> 
                            <input type='text' disabled={disabled} value={friday2} onChange={(e)=>{SetFriday2(e.target.value)}} /> 
                        </td>
                        <td> 
                            <input type='text' disabled={disabled} value={saturday2} onChange={(e)=>{SetSaturday2(e.target.value)}} /> 
                        </td>
                </tr>
                <tr>
                    <th scope="row">12:30 - 13:30</th>
                    <td>Break</td>
                    <td>Break</td>
                    <td>Break</td>
                    <td>Break</td>
                    <td>Break</td>
                    <td>Break</td>
                </tr>
                <tr>
                    <th scope="row">13:30 - 14:30</th>
                        <td> 
                            <input type='text' disabled={disabled} value={monday3} onChange={(e)=>{SetMonday3(e.target.value)}} /> 
                        </td>
                        <td> 
                            <input type='text' disabled={disabled} value={tuesday3} onChange={(e)=>{SetTuesday3(e.target.value)}} /> 
                        </td>
                        <td> 
                            <input type='text' disabled={disabled} value={wednesday3} onChange={(e)=>{SetWednesday3(e.target.value)}} /> 
                        </td>
                        <td> 
                            <input type='text' disabled={disabled} value={thursday3} onChange={(e)=>{SetThursday3(e.target.value)}} /> 
                        </td>
                        <td> 
                            <input type='text' disabled={disabled} value={friday3} onChange={(e)=>{SetFriday3(e.target.value)}} /> 
                        </td>
                        <td> 
                            <input type='text' disabled={disabled} value={saturday3} onChange={(e)=>{SetSaturday3(e.target.value)}} /> 
                        </td>
                </tr>
                <tr>
                    <th scope="row">14:30 - 15:30</th>
                        <td> 
                            <input type='text' disabled={disabled} value={monday4} onChange={(e)=>{SetMonday4(e.target.value)}} /> 
                        </td>
                        <td> 
                            <input type='text' disabled={disabled} value={tuesday4} onChange={(e)=>{SetTuesday4(e.target.value)}} /> 
                        </td>
                        <td> 
                            <input type='text' disabled={disabled} value={wednesday4} onChange={(e)=>{SetWednesday4(e.target.value)}} /> 
                        </td>
                        <td> 
                            <input type='text' disabled={disabled} value={thursday4} onChange={(e)=>{SetThursday4(e.target.value)}} /> 
                        </td>
                        <td> 
                            <input type='text' disabled={disabled} value={friday4} onChange={(e)=>{SetFriday4(e.target.value)}} /> 
                        </td>
                        <td> 
                            <input type='text' disabled={disabled} value={saturday4} onChange={(e)=>{SetSaturday4(e.target.value)}} /> 
                        </td>
                </tr>
            </tbody>
            </table>
            <div className="d-flex py-4">
                    <button onClick={()=>{
                        SetDisabled(true);
                        handleChanges(data?._id);
                    }} className="btn btn-success px-4 me-3">Save</button>
                    <button onClick={()=>{
                        SetDisabled(false);
                    }} className="btn btn-warning px-4">Edit</button>
            </div>
        </div>
      }
    </div>
  )
}

export default TimeTableComponent