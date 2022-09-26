import React, {useState, useEffect} from 'react';
import axios from 'axios';

const ManageResources = () => {
    const [title, SetTitle] = useState('');
    const [link, SetLink] = useState('');
    const [showAlert, SetShowAlert] = useState(false);
    const [alertMsg, SetAlertMsg] = useState('');
    const [alertMsgClass, SetAlertMsgClass] = useState('');

    const [showSorted, SetShowSorted] = useState('');
    const [sortedData, SetSortedData] = useState('');

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
        if(link==='' || title===''){
            handleAlert('Enter all the fields', 'alert alert-danger ');
        }
        else {
            axios({
                method: 'post', 
                data: {
                    link: link,
                    title: title,
                },
                withCredentials: true,
                url: 'http://localhost:5000/resource'
                }).then(res=>{
                if(res.status===200){
                    handleAlert(res.data.msg, 'alert alert-success ', 6000);
                    showResource();
                }
                else if(res.status===400){
                    handleAlert(res.data.msg, 'alert alert-danger ');
                }
            });
        }

        SetTitle('');
        SetLink('');
    }
    const [data, SetData] = useState([]);

    useEffect(()=>{
        showResource();
    }, []);

    const showResource = ()=>{
        axios.get("http://localhost:5000/resource")
        .then((res) =>{
            // console.log(res)
            const arr = res.data.data;
            SetData(arr);
        })
    }
    const deleteResource = (id) => {
        axios.delete(`http://localhost:5000/resource/${id}`).then((res) =>{
            console.log(res)
            showResource();
        })
    }
    function compare( a, b ) {
        // console.log(a, b);
        if ( a.title < b.title ){
            return -1;
        }
        if ( a.title > b.title ){
            return 1;
        }
        return 0;
    }
        
    const SortResources = () => {
        let arr = data;
        arr.sort(compare);
        SetShowSorted(true);
        SetSortedData(arr);
    }

  return (
    <div className='manage-resources'>
        <div className={showAlert==true ? alertMsgClass+"show" : alertMsgClass}>
            <strong>{alertMsg}</strong>
        </div>
        <div className="card">
        <div className="card-body">
            <h4 className='text-center'>Add a Resource</h4>
            <hr />
            <form onSubmit={(e)=>{
                handleSubmit(e);
            }}>
                <div className="form-group mb-3">
                    <label htmlFor="title">Title</label>
                    <input type="text" className="form-control mt-2" id="title" placeholder="Enter title"
                    value={title} onChange={(e)=>{
                        SetTitle(e.target.value);
                    }} />
                </div>
                <div className="form-group mb-3">
                    <label htmlFor="link">Link</label>
                    <input type="text" className="form-control mt-2" id="link" placeholder="Enter link"
                    value={link} onChange={(e)=>{
                        SetLink(e.target.value);
                    }} />
                </div>
                <button type="submit" className="btn btn-primary">Add Resource</button>
            </form>
        </div>
        </div>
        <div className="container py-4">
        <h2 className="text-center">
          Resources
        </h2>
        <table className="table table-bordered">
        <thead>
            <tr className='bg-dark text-light text-center'>
            <th style={{width: "7.5%"}} scope="col">S. No.</th>
            <th style={{width: "35%"}} scope="col">Title</th>
            <th style={{width: "50%"}} scope="col">Link</th>
            <th style={{width: "7.5%"}} scope='col'></th>
            </tr>
        </thead>
        <tbody>
            {!showSorted && data.map((a, index)=>(<tr key={index}>
                <th scope="row">{index+1}</th>
                <td>{a.title}</td>
                <td>{a.link}</td>
                <td className='text-danger text-center' onClick={()=>deleteResource(a._id)}><i className="fa-solid fa-trash"></i></td>
            </tr>)
            )}
            {showSorted && sortedData.map((a, index)=>(<tr key={index}>
                <th scope="row">{index+1}</th>
                <td>{a.title}</td>
                <td>{a.link}</td>
                <td className='text-danger text-center' onClick={()=>deleteResource(a._id)}><i className="fa-solid fa-trash"></i></td>
            </tr>)
            )}
        </tbody>
        </table>
        <button onClick={()=>{SortResources()}} className="sort btn btn-info">Sort</button>
      </div>
    </div>
  )
}

export default ManageResources