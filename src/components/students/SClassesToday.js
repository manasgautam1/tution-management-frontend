import React, { useEffect, useState } from 'react'

const SClassesToday = ({timetable=''}) => {
  const [data, SetData] = useState();
  useEffect(()=>{
    let today = new Date();
    switch(today.getDay()){
        case 1: SetData(timetable[0]?.table.monday)
        case 2: SetData(timetable[0]?.table.tuesday)
        case 3: SetData(timetable[0]?.table.wednesday)
        case 4: SetData(timetable[0]?.table.thursday)
        case 5: SetData(timetable[0]?.table.friday)
        case 6: SetData(timetable[0]?.table.saturday)
    }
  }, [timetable]);
  return (
    <div className='py-4'>
        <table className="table table-bordered mt-2 text-center">
            <thead>
                <tr className='bg-dark text-light'>
                    <th style={{width: '30%'}}>Time</th>
                    <th style={{width: '70'}}>Class</th>
                </tr>
            </thead>
            <tbody>
                {data?.first && <tr>
                    <td> 
                        10:00 - 11:00
                    </td>
                    <td>{data?.first}</td>
                </tr>}
                {data?.second && <tr>
                    <td> 
                        11:00 - 12:00
                    </td>
                    <td>{data?.second}</td>
                </tr>}
                {data?.third && <tr>
                    <td> 
                        13:30 - 14:30
                    </td>
                    <td>{data?.third}</td>
                </tr>}
                {data?.fourth && <tr>
                    <td> 
                        14:30 - 15:30
                    </td>
                    <td>{data?.fourth}</td>
                </tr>}
                
            </tbody>
        </table>
    </div>
  )
}

export default SClassesToday