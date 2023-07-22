//  import Select from '@mui/material/Select';
//import InputLabel from '@mui/material/InputLabel';
// import React, { useEffect, useState } from 'react'
// import Button from '@mui/material/Button';
import { ErrorMessage, Formik } from 'formik';
import * as Yup from "yup";
// import axios from 'axios';
import {useNavigate} from 'react-router-dom';
import authService from "./src/services/auth.service";
import { toast } from 'react-toastify';
import { FormControl } from '@mui/material';
import {InputLabel,Select, TextField, MenuItem, Button} from '@material-ui/core';
import '../../src/App.css'
const Register = () => {
  // const [roleList,setRoleList]=useState([]);
const navigate = useNavigate();
  //const [roles,newRoles]=useState("");
  //  const [open, setOpen]=useState(false);
  // const handleChange=(e)=>{
  //   newRoles(e.target.value);
  // }
  // const handleClose = () => {
  //   setOpen(false);
  // };

  // const handleOpen = () => {
  //   setOpen(true);
  // };
  const roleList = [
    { id: 2, name: "buyer" },
    { id: 3, name: "seller" }
  ];
  //const [role, setRole] = useState("buyer");
  // const [user, setUser] = useState([]);
  // useEffect(() => {
  //   axios.get("https://jsonplaceholder.typicode.com/posts").then((res) => {
  //     console.log("user details: ", res.data);
  //     setUser(res.data);
  //   });
  // }, []);
  const initialValues = {
    firstName:"",
    lastName: "",
    email: "",
    roleId:0,
    password: '',
    conpassword: ""
  };
 
  // useEffect(()=>{
  //   if(roleList.length) return;
  // },[roleList]);
  // const getRoles=()=>{
  //   userService.getAllRoles.then((res)=>{
  //     setRoleList(res);
  //   })
  // }
  const onFormSubmit = async (values) => {
    // alert(`You are registered ${values.name}! `);
    //API integration
 
    delete values.conpassword;
    authService.create(values).then((res) => {
      navigate("/login");
      toast.success('🦄Successfully  Registered');
    })
    // fetch(" https://book-e-sell-node-api.vercel.app/api/user",{method:"POST",headers:{"Content-Type":"application/json"},
    // body:JSON.stringify(values)}).then(res=>res.json()).then(res=>console.log("api ",res));
    //use axios instead fetch
    // const requestData = {
    //   userName: values.firstname,
    //   userLastName: values.lastName,
    //   userEmail: values.email,
    //   userPassword: values.password,
    //   userConfirmPassword: values.conpassword,
    // };
    // const res=await axios.post("https://book-e-sell-node-api.vercel.app/api/user", requestData);
    // if (res.status === 201) {
    //   console.log(res.data.id);
    //   toast.success('🦄Successfully  Registered', {
    //     position: "top-right",
    //     autoClose: 5000,
    //     hideProgressBar: false,
    //     closeOnClick: true,
    //     pauseOnHover: true,
    //     draggable: true,
    //     progress: undefined,
    //     theme: "light",
    //   });
    // }
    // axios.delete("https://book-e-sell-node-api.vercel.app/api/").then((res) => {
    //   if (res.status === 200) {

    //     toast.success('🦄 deletion completed ', {
    //       position: "top-right",
    //       autoClose: 5000,
    //       hideProgressBar: false,
    //       closeOnClick: true,
    //       pauseOnHover: true,
    //       draggable: true,
    //       progress: undefined,
    //       theme: "dark",
    //     });

    //   }
    // });
  }
  // console.log("values are", values);
  const validationSchema = Yup.object().shape(
    {
      firstName: Yup.string().min(3, "enter name with min char 3").required("required"),
      lastName: Yup.string().min(3, "enter name with min char 3").required("required"),
      email: Yup.string().email("enter valid email").required("please enter valid email"),
      password: Yup.string().min(5, 'at least 5 characters').required('required!!'),
      conpassword: Yup.string().oneOf([Yup.ref('password'), null], 'password must be same').required('required!'),
      roleId: Yup.number().required("role is required")
    });
   
  return(
    <div>
            <div className='title'>
              <center>Login or Create an Account</center> 
            </div>
    
            <div className='personal_info'>
              Personal Information
            </div>
    
            <div className='sentence'>Please enter the following information to create your Account</div>

            <div>
                <Formik
                    initialValues={initialValues}
                    validationSchema={validationSchema}
                    onSubmit={onFormSubmit}
                >

                {({values , errors,touched,handleChange,handleBlur,handleSubmit
                })=>(
                    <form onSubmit={handleSubmit}>
                       
                       <div
                  style={{
                    display: "flex",
                    justifyContent: 'center',
                    alignItems: 'center'
                  }} >
                  <div style={{ flexDirection: 'column', display: 'flex' }}>
                    <TextField label="First Name" name="firstName" id="firstName" variant="outlined" type="text" style={{
                      width: 375, height: 40, margin: 40,
                    }} onChange={handleChange} onBlur={handleBlur}
                      required />
                    {touched.firstname && errors.firstname && <span style={{
                      color: 'red', padding: 5,
                      fontSize: 15
                    }}>{errors.firstname}</span>}
                  </div>
                  <div style={{ flexDirection: 'column', display: 'flex' }}>
                    <TextField label="Last Name" name="lastName" id="lastName" variant="outlined" type="text" style={{
                      width: 375, height: 40, margin: 40,
                    }} onChange={handleChange} onBlur={handleBlur} required />
                    {errors.lastName && touched.lastName &&
                      <span style={{
                        color: 'red',
                        fontSize: 15,
                        paddingBottom: 5
                      }}>{errors.lastName}</span>}</div>
                </div>
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    flexDirection: 'column',
                  }}>
                     <div style={{ flexDirection: 'column', display: 'flex' }}>
                  <TextField label="Email Address" id="email" name="email" variant="outlined" type="text" style={{
                     width: 375, height: 40, margin: 40,
                  }}
                    required onChange={handleChange} onBlur={handleBlur} />
                  {errors.email && touched.email &&
                    <span style={{
                      color: 'red',
                      fontSize: 15,
                      paddingBottom: 5
                    }}>{errors.lastName}</span>}</div>
                    <div style={{flexDirection: 'column', display: 'flex' }}>
               
                  <FormControl className='dropdown-wrapper' variant='outlined'>
                    <InputLabel htmlFor='select'>Roles</InputLabel>
                    <Select
                      labelId="demo-simple-select-label"
                      id={"roleId"}
                      label="Role"
                      name="roleId"
                      defaultValue=""
                      onChange={handleChange}
                      onBlur={handleBlur}
                    >{roleList.length > 0 && roleList.map((role) => (
                      <MenuItem value={role.id} key={"name" + role.id}>{role.name}</MenuItem>
                    ))}
                    </Select>
                  </FormControl>
                  {errors.roleId && touched.roleId &&
                    <span style={{
                      color: 'red',
                      fontSize: 15,
                      paddingBottom: 5
                    }}>{errors.roleId}</span>}
                </div>
                          </div>

                <div
                  style={{
                    display: "flex",
                    justifyContent: 'center',
                    alignItems: 'center',
                  }} >
                  <div style={{ flexDirection: 'column', display: 'flex' }}>
                    <TextField
                      type="password" variant='outlined'
                      name="password"
                      label="Password"
                      onChange={handleChange} onBlur={handleBlur}
                      style={{ width: 375, margin: 40 }}
                      required />
                    <ErrorMessage component="div" name="password" style={{
                      color: 'red',
                      fontSize: 15,
                    }} />
                  </div>
                  <div style={{ flexDirection: 'column', display: 'flex' }}>
                    <TextField
                      type="password" variant='outlined'
                      name="conpassword"
                      label="Confirm Password"
                      onChange={handleChange} onBlur={handleBlur}
                      style={{ width: 375, margin: 40 }}
                      required />
                    <ErrorMessage component="div" name="conpassword" style={{
                      color: 'red',
                      fontSize: 15,
                    }} /></div>
                </div>
                <div style={{
                  display: "flex",
                  justifyContent: "center"
                }}>
                  <Button variant="contained" type='submit' color="secondary"
                  >REGISTER</Button>
                </div>
            </form>)}
        </Formik>
      </div>
      </div>
 )
              }    
export default Register;