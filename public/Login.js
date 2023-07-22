import { Button, TextField } from '@material-ui/core'
import { Formik } from 'formik'
import React from 'react'
import * as Yup from "yup";
import authService from './src/services/auth.service';
import { toast } from 'react-toastify';
import '../../src/App.css'
import { Link} from 'react-router-dom';

import {useNavigate } from 'react-router-dom';
export default function Login() {
//    const authContext=useAuthContext();
//    const mydata=useContext(authContext);
//    console.log(mydata);
 const navigate=useNavigate();
  const initialValues={
   email:"",
   password:""
  };
  const validationSchema=Yup.object().shape({
    email: Yup.string().email("enter valid email").required("required"),
      password: Yup.string().min(5, 'at least 5 characters').required('required!!'),
  });
  const onFormSubmit=async(values)=>{
    authService.login(values).then((res) => {
      toast.success('🦄Successfully Login');
       console.log("login details : ",res);
      // authContext.setUser(res);
       navigate("/book-listing");
      
    }) 
  };
  return (
    <>
    <div>
        <div  style={{marginTop:130,}}>
            <center>
                <Link to="/Register" style={{color:"#414141" , fontFamily:"Roboto" , fontSize:18, fontWeight:"lighter",}}>Home</Link>
                <span> {`>`} </span>
                <Link to="/LoginPage" style={{color:"#f14d54" , fontFamily:"Roboto" , fontSize:18, fontWeight:"lighter",}}>Login</Link>
            </center>
        </div>

        <div className='title'>
              <center>Login or Create an Account</center>        
        </div>

        <div style={{paddingTop:50,}}> 
            <div style={{paddingLeft:90,}}>
                <span className='newCustomer'>New Customer</span>
            </div>

            <div style={{paddingLeft:791, marginTop:-23}}>
                <span className='RegCustomer'>Registered Customers</span>
            </div>
        </div>
        
        <div>
            <div style={{paddingLeft:90,paddingTop:30,}}>
                <span style={{fontSize:"15px",color:"#838383",fontFamily:"Roboto",fontWeight:"lighter",}}>Registration is free and easy.</span>
            </div>

            <div style={{paddingLeft:791,marginTop:-27,}}>
                <span style={{fontSize:"15px",color:"#838383",fontFamily:"Roboto",fontWeight:"lighter",}}>If you have an account with us, Please log in.</span>
            </div>
        </div>
        

        <div style={{paddingLeft:70,}}>
            <sapn style={{fontSize:"15px",fontFamily:"Roboto",color:"#212121" , fontWeight:"lighter", }}>
                <ul>
                    <li>Faster checkout.</li>
                    <li>Save multiple shopping addresses.</li>
                    <li>View and track orders and more.</li>
                </ul>                
            </sapn>

            <Formik 
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={onFormSubmit}
            >

            {({values , errors , touched , handleChange , handleBlur , handleSubmit,
            })=>(
                <form onSubmit={handleSubmit}>
                    <div  style={{marginLeft:723 , marginTop:-80}} >
                        
                        <TextField sx={{marginLeft:-13,marginTop: 3.5, width:400}}
                         variant='outlined' type='text' id='email' name='email' placeholder='email' 
                                 onChange={handleChange} onBlur={handleBlur}/>

                                    <div style={{paddingTop:5, paddingLeft:0,}}>
                                        { touched.email && errors.email && <span style={{
                                            //padding: 5,
                                            color: "red",
                                            fontSize: 16,
                                            fontWeight: 500,
                                            // paddingTop:20,
                                            // paddingLeft:25,
                                            
                                        }}> {errors.email} </span>}
                                    </div>
                    </div>

                    <div style={{marginLeft:723 , marginTop:40}}>
                       
                        <TextField sx={{marginLeft:-9,marginTop: 3.5, width:400}}
                         variant='outlined' type='password' id='password' name='password' placeholder='password' 
                                 onChange={handleChange} onBlur={handleBlur}/>

                                    <div style={{paddingTop:5, paddingLeft:0,}}>
                                        { touched.password && errors.password && <span style={{
                                            //padding: 5,
                                            color: "red",
                                            fontSize: 16,
                                            fontWeight: 500,
                                            // paddingTop:20,
                                            // paddingLeft:25,
                                            
                                        }}> {errors.password} </span>}
                                    </div>
                    </div>

                    <Button variant="contained" type='submit' style={{
                        marginLeft:723,
                        marginTop:60,
                        width:136,
                        height:45,
                        //color:"#f14d54",
                        backgroundColor:"rgb(255,89,92)",
                        borderRadius:3,
                        fontWeight:"bold"
                    }}>Login</Button>

                </form>
            )}

            </Formik>
        </div>

        <div style={{paddingTop:"-90px", paddingBottom:"10px"}}>
            <Button variant="contained" style={{
                            marginLeft:80,
                            marginTop:50,
                            marginBottom:70,
                            width:220,
                            height:45,
                            //color:"#f14d54",
                            backgroundColor:"rgb(255,89,92)",
                            borderRadius:3,
                            fontWeight:"bold"
                        }}>Create an Account
            </Button>
        </div>
        
        
    </div>
    </>
  )
}
