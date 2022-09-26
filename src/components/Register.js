import React, {useState, useEffect} from 'react'
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const Register = () => {

    const navigate = useNavigate();

    const [name, SetName] = useState('');
    const [email, SetEmail] = useState('');
    const [password, SetPassword] = useState('');
    const [confirmPassword, SetConfirmPassword] = useState('');
    const [showAlert, SetShowAlert] = useState(false);
    const [alertMsg, SetAlertMsg] = useState('');
    const [alertMsgClass, SetAlertMsgClass] = useState('alert');

    useEffect(()=>{
        let user = localStorage.getItem('user');
        user = JSON.parse(user);
        if(user!=null){
            if(user.isAdmin==='true'){
                navigate('/admin-dashboard');
            }
            else {
                navigate('/student-dashboard');
            }
        }
      }, []);

    const handleAlert = (msg, myclass, time=5000) => {
        SetAlertMsg(msg);
        SetShowAlert(true);
        SetAlertMsgClass(myclass);
        setTimeout(() => {
            SetShowAlert(false)
        }, 5000);
    }

    const handleRegister = (e)=>{
      e.preventDefault();
        
      if(name==='' || email==='' || password==='' || confirmPassword===''){
        handleAlert('Enter all the fields', 'alert alert-danger ');
      }
      else {
        if(password !== confirmPassword){
            handleAlert('Both password fields should be same', 'alert alert-danger ');
        }
        else{
            axios({
                method: 'post', 
                data: {
                    name: name,
                    email: email,
                    password: password
                },
                withCredentials: true,
                url: 'http://localhost:5000/register'
              }).then(res => {
                if(res.status===200){
                    handleAlert(res.data.msg, 'alert alert-success ', 2000);
                    navigate('/login');
                }
                else if(res.status===400){
                    handleAlert(res.data.msg, 'alert alert-danger ');
                }
              });
        }
      }
    }
  
    return (
      <div className='register-page'>
          <div className={showAlert==true ? alertMsgClass+"show" : alertMsgClass}>
             <strong>{alertMsg}</strong>
          </div>
          <div className="card">
          <div className="card-body">
              <h1 className='text-center'>Register</h1>
              <hr />
              <form onSubmit={(e)=>{
                  handleRegister(e);
              }}>
                  <div className="form-group mb-3">
                      <label htmlFor="name">Name</label>
                      <input type="text" className="form-control mt-2" id="name" placeholder="Enter your name"
                      value={name} onChange={(e)=>{
                          SetName(e.target.value);
                      }} />
                  </div>
                  <div className="form-group mb-3">
                      <label htmlFor="email">Email</label>
                      <input type="email" className="form-control mt-2" id="email" placeholder="Enter email address"
                      value={email} onChange={(e)=>{
                          SetEmail(e.target.value);
                      }} />
                  </div>
                  <div className="form-group mb-3">
                      <label htmlFor="password">Password</label>
                      <input type="password" className="form-control mt-2" id="password" placeholder="Enter password"
                      value={password} onChange={(e)=>{
                          SetPassword(e.target.value);
                      }} />
                  </div>
                  <div className="form-group mb-3">
                      <label htmlFor="confirm password">Confirm Password</label>
                      <input type="password" className="form-control mt-2" id="confirm-password" placeholder="Enter password again"
                      value={confirmPassword} onChange={(e)=>{
                          SetConfirmPassword(e.target.value);
                      }} />
                  </div>
                  <button type="submit" className="btn btn-primary">Register</button>
              </form>
              <p className='mt-3 text-center'>
              Already have a account? <Link to='/login'>login</Link>
              </p>
          </div>
          </div>
      </div>
    )
}

export default Register