import React from 'react'
import { Link } from 'react-router-dom'
import homeImg from '../images/homeImg.jpeg';
const Home = () => {
  return (
    <div className='home'>
        <div className="home-navbar">
            <div className="row mx-0 text-center">
                <div className="col-lg-3 px-0 bg-dark">
                    <Link to='' className='py-3' >Home</Link>
                </div>
                <div className="col-lg-3 px-0 bg-dark">
                    <Link to='students' className='py-3' >Students</Link>
                </div>
                <div className="col-lg-3 px-0 bg-dark">
                    <Link to='about' className='py-3' >About</Link>
                </div>
                <div className="col-lg-3 px-0 bg-dark">
                    <Link to='admissions' className='py-3' >Admissions</Link>
                </div>
            </div>
            <div className="row mx-0 text-center">
                <div className="col-lg-3 px-0 bg-dark">
                    <a href='https://rzp.io/l/z5dpvFzl' className='py-3' target='_blank' >Donate</a>
                </div>
                <div className="col-lg-3 px-0 bg-dark">
                    <Link to='login' className='py-3' >Login</Link>
                </div>
                <div className="col-lg-3 px-0 bg-dark">
                    <Link to='register' className='py-3' >Register</Link>
                </div>
                <div className="col-lg-3 px-0 bg-dark">
                    <Link to='resources' className='py-3' >Resources</Link>
                </div>
            </div>
        </div>
        <div className="container my-5">
            <img width="100%" src={homeImg} alt="" />
        </div>
    </div>
  )
}

export default Home