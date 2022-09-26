import React, { useEffect, useState } from 'react'

const STimetable = ({timetable=''}) => {
  const [data, SetData] = useState();
  useEffect(()=>{
        SetData(timetable[0]);
  }, [timetable]);
  return (
    <div className='py-4'>
        {timetable?.length == <h2 className='text-center'>No time table assigned</h2>}
        {
            timetable?.length != 0 && <div>
            <h2 className='text-center'>Time table</h2>
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
            {/* {<h3>{data?.table?.monday?.first}</h3>} */}
            <tbody>
                <tr>
                    <th scope="row">10:00 - 11:00</th>
                    <td> 
                        {data?.table?.monday?.first}
                    </td>
                    <td> 
                        {data?.table?.tuesday?.first}
                    </td>
                    <td> 
                        {data?.table?.wednesday?.first} 
                    </td>
                    <td> 
                        {data?.table?.thursday?.first} 
                    </td>
                    <td> 
                        {data?.table?.friday?.first}
                    </td>
                    <td> 
                        {data?.table?.saturday?.first}
                    </td>
                </tr>
                <tr>
                    <th scope="row">11:00 - 12:00</th>
                    <td> 
                        {data?.table?.monday?.second}
                    </td>
                    <td> 
                        {data?.table?.tuesday?.second}
                    </td>
                    <td> 
                        {data?.table?.wednesday?.second} 
                    </td>
                    <td> 
                        {data?.table?.thursday?.second} 
                    </td>
                    <td> 
                        {data?.table?.friday?.second}
                    </td>
                    <td> 
                        {data?.table?.saturday?.second}
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
                        {data?.table?.monday?.third}
                    </td>
                    <td> 
                        {data?.table?.tuesday?.third}
                    </td>
                    <td> 
                        {data?.table?.wednesday?.third} 
                    </td>
                    <td> 
                        {data?.table?.thursday?.third} 
                    </td>
                    <td> 
                        {data?.table?.friday?.third}
                    </td>
                    <td> 
                        {data?.table?.saturday?.third}
                    </td>
                </tr>
                <tr>
                    <th scope="row">14:30 - 15:30</th>
                    <td> 
                        {data?.table?.monday?.fourth}
                    </td>
                    <td> 
                        {data?.table?.tuesday?.fourth}
                    </td>
                    <td> 
                        {data?.table?.wednesday?.fourth} 
                    </td>
                    <td> 
                        {data?.table?.thursday?.fourth} 
                    </td>
                    <td> 
                        {data?.table?.friday?.fourth}
                    </td>
                    <td> 
                        {data?.table?.saturday?.fourth}
                    </td>
                </tr>
            </tbody>
            </table>
        </div>
        }
    </div>
  )
}

export default STimetable