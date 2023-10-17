import React, { useState } from 'react';
import Axios from 'axios'
import {  
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBCard,
  MDBCardBody,
  MDBInput
}
  from 'mdb-react-ui-kit';

import './Loginstyle.css'
import { Link, useNavigate } from 'react-router-dom';
import HomePage from './home/HomePage';
import { useDispatch } from 'react-redux';
import { LoginAction } from '../reducers/AuthReducer';
import config from '../configurations/config';

function Login() {

  const dispatch=useDispatch();

  const navigate=useNavigate();
  const [email, setEmail] = useState("");
  const [passw, setPassw] = useState("");
  const [dataInput, setDataInput] = useState("");
  const [isLogged, setIsLogged] = useState(false);
  const submitHandler = () => {
    const info = { email: email, passw: passw };
    setDataInput([info]);
  }

  function loginHandler(e) {
    e.preventDefault();
    console.log("Login button clicked")
    const info = { email: email, passw: passw };
    setDataInput([info]);
    console.log("INFO email " + info.email)
    console.log("INFO password " + info.passw)
    if (info.email != '' && info.passw != '') {
      Axios.post(config.apiUrl+"users/login", {
        email: info.email,
        password: info.passw
      }).then(res => {
        
        if (res.status == 200) {
         // setIsLogged(true);
         console.log("res token is " + res.data.token);
        console.log("res user_id is " + res.data.user_id);
        console.log("res status is " + res.status);
        const UserDetails={
          userId:res.data.user_id,
          token:res.data.token
        }
         dispatch(LoginAction(UserDetails));
          navigate('/home')
        }
      })

    }


  }


  return <>
    {isLogged ? <HomePage /> :
      <MDBContainer fluid className='loginBody'>

        <MDBRow className='d-flex justify-content-center align-items-center h-100'>
          <MDBCol col='12'>

            <MDBCard className='bg-dark text-white my-5 mx-auto' style={{ borderRadius: '1rem', maxWidth: '400px' }}>
              <MDBCardBody className='p-5 d-flex flex-column align-items-center mx-auto w-100 Logincard'>

                <h2 className="fw-bold mb-2 text-uppercase">Login</h2>
                <p className="text-white-50 mb-5">Please enter your email and password!</p>

                <MDBInput wrapperClass='mb-4 mx-5 w-100' labelClass='text-white' label='Email address' id='formControlLg' name='email' value={email} onChange={(e) => setEmail(e.target.value)} type='email' size="lg" />
                <MDBInput wrapperClass='mb-4 mx-5 w-100' labelClass='text-white' label='Password' id='formControlLg' name='password' value={passw} onChange={(e) => setPassw(e.target.value)} type='password' size="lg" />

                <p className="small mb-3 pb-lg-2"><a className="text-white-50" href="#!">Forgot password?</a></p>
                {/* <MDBBtn className='mx-2 px-5 loginButton' color='dark' size='lg' onClick={loginHandler}>
              Login
            </MDBBtn> */}
                <Link to="/home"><button type="button" className="btn btn-dark btn-outline-dark lg mx-2 px-5 loginButton" onClick={loginHandler}>Login</button></Link>

                {/* <div className='d-flex flex-row mt-3 mb-5'>
              <MDBBtn tag='a' color='none' className='m-3' style={{ color: 'white' }}>
                <MDBIcon fab icon='facebook-f' size="lg"/>
              </MDBBtn>

              <MDBBtn tag='a' color='none' className='m-3' style={{ color: 'white' }}>
                <MDBIcon fab icon='twitter' size="lg"/>
              </MDBBtn>

              <MDBBtn tag='a' color='none' className='m-3' style={{ color: 'white' }}>
                <MDBIcon fab icon='google' size="lg"/>
              </MDBBtn>
            </div> */}

                <div>
                  <p className="mb-0">Don't have an account? <a href="#!" className="text-white-50 fw-bold">Sign Up</a></p>

                </div>
              </MDBCardBody>
            </MDBCard>

          </MDBCol>
        </MDBRow>

      </MDBContainer>
    }
  </>
}

export default Login;