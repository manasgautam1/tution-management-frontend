import React from 'react'

const Todo = () => {
  const todos = [
    {task: 'Maths homework', time: 'today'},
    {task: 'Chemistry homework', time: 'today'},
    {task: 'Physics homework', time: 'tomorrow'},
  ] 
  return (
    <div>
        <div className="container py-3">
            <h3 className="text-center">Todo List</h3>
            <table className="table table-bordered">
            <thead>
                <tr className='bg-dark text-light'>
                    <th style={{width: "10%"}} scope="col">S. No.</th>
                    <th style={{width: "70%"}} scope="col">Task</th>
                    <th style={{width: "20%"}} scope="col">Done by</th>
                </tr>
            </thead>
            <tbody>
                {todos.map((a, index)=>(<tr key={index}>
                    <th scope="row">{index+1}</th>
                    <td>{a.task}</td>
                    <td>{a.time}</td>
                </tr>)
                )}
            </tbody>
            </table>
        </div>
    </div>
  )
}

export default Todo