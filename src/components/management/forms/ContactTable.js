import React from 'react'

const ContactTable = ({data, deleteContact}) => {
  return (
    <div className="py-3">
      <table className="table table-bordered mt-2">
      <thead>
          <tr className='bg-dark text-light'>
          <th style={{width: "7.5%"}} scope="col">S. No.</th>
          <th style={{width: "15%"}} scope="col">Name</th>
          <th style={{width: "20%"}} scope="col">Email</th>
          <th style={{width: "50%"}} scope="col">Query</th>
          <th style={{width: "7.5%"}} scope='col'></th>
          </tr>
      </thead>
      <tbody>
          {data.map((a, index)=>(<tr key={index}>
              <th scope="row">{index+1}</th>
              <td>{a.name}</td>
              <td>{a.email}</td>
              <td>{a.query}</td>
              <td className='text-danger text-center' onClick={()=>deleteContact(a._id)}><i className="fa-solid fa-trash"></i></td>
          </tr>)
          )}
      </tbody>
      </table>
    </div>
  )
}

export default ContactTable