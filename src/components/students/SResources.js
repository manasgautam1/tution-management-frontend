import React, {useState, useEffect} from 'react'
import axios from 'axios';


const SResources = () => {
    const [data, SetData] = useState([]);

    const [showSorted, SetShowSorted] = useState('');
    const [sortedData, SetSortedData] = useState('');

    useEffect(()=>{
        showResource();
    }, []);

    const showResource = ()=>{
        axios.get("http://localhost:5000/resource")
        .then((res) =>{
            console.log(res)
            const arr = res.data.data;
            SetData(arr);
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
    <div>
        <div className="container py-5">
        <h4 className='text-center'>Add a Resource</h4>
        <table className="table table-bordered mt-3">
            <thead>
                <tr className='bg-dark text-light'>
                <th style={{width: "10%"}} scope="col">S. No.</th>
                <th style={{width: "35%"}} scope="col">Title</th>
                <th style={{width: "55%"}} scope="col">Link</th>
                </tr>
            </thead>
            <tbody>
                {!showSorted && data.map((a, index)=>(<tr key={index}>
                    <th scope="row">{index+1}</th>
                    <td>{a.title}</td>
                    <td>{a.link}</td>
                </tr>)
                )}
                {showSorted && sortedData.map((a, index)=>(<tr key={index}>
                    <th scope="row">{index+1}</th>
                    <td>{a.title}</td>
                    <td>{a.link}</td>
                </tr>)
                )}
            </tbody>
            </table>
            
            <button onClick={()=>{SortResources()}} className="sort btn btn-info">Sort</button>
        </div>
    </div>
  )
}

export default SResources