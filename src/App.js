import React, {lazy, Suspense, useEffect, useState} from 'react'
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";

const Home = lazy(() => import('./components/Home'));
const AdminDashboard = lazy(() => import('./components/AdminDashboard'));
const StudentDashboard = lazy(() => import('./components/StudentDashboard'));
const Admissions = lazy(() => import('./components/home/Admissions'));
const Resources = lazy(() => import('./components/home/Resources'));
const About = lazy(() => import('./components/home/About'));
const Students = lazy(() => import('./components/home/Students'));
const Login = lazy(() => import('./components/Login'));
const Register = lazy(() => import('./components/Register'));
const TimeTableComponent = lazy(() => import('./components/management/forms/TimeTableComponent'));

function App() {
  const [user, SetUser] = useState(null);
  
  useEffect(()=>{
    const user = localStorage.getItem('user');
    console.log(JSON.parse(user));
    SetUser(user);
  }, []);

  const updateUser = (user)=>{
    SetUser(user);
    localStorage.setItem('user', JSON.stringify(user));
  }
  

  return (
    <Router>
      <Suspense fallback={<div></div>}>
        <Routes>
          <Route exact path='/' element={<Home/>}  />
          <Route exact path='/admissions' element={<Admissions/>}  />
          <Route exact path='/login' element={<Login updateUser={updateUser}  user={user}/>}  />
          <Route exact path='/register' element={<Register/>}  user={user} />
          <Route exact path='/admin-dashboard' element={<AdminDashboard user={user} />} />
          <Route exact path='/student-dashboard' element={<StudentDashboard user={user} />} />
          <Route exact path='/resources' element={<Resources />} />
          <Route exact path='/students' element={<Students />} />
          <Route exact path='/about' element={<About />} />
          <Route exact path='/timetable/:id' element={<TimeTableComponent /> } />
        </Routes>
      </Suspense>
    </Router>
  );
}

export default App;
