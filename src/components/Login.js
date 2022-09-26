import React, {useState, useEffect} from 'react'
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const Login = ({updateUser}) => {
  
  const navigate = useNavigate();

  const [email, SetEmail] = useState('');
  const [password, SetPassword] = useState('');
  const [showAlert, SetShowAlert] = useState(false);
  const [alertMsg, SetAlertMsg] = useState('');
  const [alertMsgClass, SetAlertMsgClass] = useState('');

  useEffect(()=>{
    let user = localStorage.getItem('user');
    user = JSON.parse(user);
    if(user!=null){
        if(user?.isAdmin==='true'){
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
    }, time);
  }

  const handleLogin = (e)=>{
    e.preventDefault();
    if(email==='' || password===''){
        handleAlert('Enter all the fields', 'alert alert-danger ');
    }
    else {
        axios({
            method: 'post', 
            data: {
                email: email,
                password: password
            },
            withCredentials: true,
            url: 'http://localhost:5000/login'
          }).then(res=>{
            if(res.status===200){
                if(res?.data?.success===true){
                    handleAlert(res.data.msg, 'alert alert-success ', 4000);
                    updateUser(res.data.data);
                    
                    // console.log(res.data.data.isAdmin);
                    if(res.data.data.isAdmin==='true'){
                        navigate('/admin-dashboard');
                    }
                    else{
                        navigate('/student-dashboard');
                    }
                }
                else {
                    handleAlert(res.data.msg, 'alert alert-danger ');
                }
            }
          });
    }

  }

  return (
    <div className='login-page'>
        <div className={showAlert==true ? alertMsgClass+"show" : alertMsgClass}>
            <strong>{alertMsg}</strong>
        </div>
        <div className="card">
        <div className="card-body">
            <h1 className='text-center'>Login</h1>
            <hr />
            <form onSubmit={(e)=>{
                handleLogin(e);
            }}>
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
                <button type="submit" className="btn btn-primary">Login</button>
            </form>
            <p className='mt-3 text-center'>
              Don't have a account? <Link to='/register'>register now</Link>
            </p>
        </div>
        </div>
    </div>
  )
}

export default Login