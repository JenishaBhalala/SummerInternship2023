//import { useNavigate } from "react-router-dom";
import Button from '@mui/material/Button';
//import TextField from '@mui/material/TextField';
// import { useEffect, useState } from 'react';
import {Formik} from 'formik';

// import { Navigate } from 'react-router-dom';
import TextField from '@mui/material/TextField';
import axios from "axios";
import {toast} from 'react-toastify';
import * as Yup from "yup";//for validation
import { useEffect, useState } from 'react';
export const Apple = () => {
    // const Navigate = useNavigate()
    // const[name,setName]=useState("");
    // const[email,setEmail]=useState("");
    // function handleText(event){
    //     const newdata=event.target.value;
    //     setName(newdata);
    // }
    const [user,setUser]=useState([]);
    useEffect(()=>{
        axios.get("https://jsonplaceholder.typicode.com/posts").then((res)=>{
            console.log("user details: ",res.data);
            setUser(res.data);
        });
    },[]);
    //for validation 
    const validationSchema=Yup.object().shape(
    {
        name:Yup.string().min(3,"enter nanme with min char 3").required("required"),
        email:Yup.string().email("enter valid email").required("plese enter email"),

    });
    const initialValues={
        name:"",
        email:"",
    };
    //async await one call after amother
    const onFormSubmit=async(values)=>{
        //call apito submit form
        const requestData={
   userName:values.name,
   userEmail:values.email,
        };
        //when create record use post(send all data)
        //data update put
        //nothing executes until get res of this post
        //when get res add in res then executes next one
      const res =await axios.post("https://jsonplaceholder.typicode.com/posts",requestData);
    //   .then((res)=>
    //     // {
            if(res.status=== 201){
            console.log(res.data.id);
            toast.success('🦄 Registered ! ', {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "dark",
                    });
           }
        //     //configuration of style
        // }).catch();
        // catch for erro
        axios.delete("https://jsonplaceholder.typicode.com/posts/1").then((res)=>{
            if(res.status===200){
                toast.success('🦄 deletion completed ', {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "dark",
                    });

            }
        });
         console.log("values are",values);
        //  alert("submitted");
    }
    //toastify axios
    // const onHomePageButtonClick = () =>{
    //     // Navigate("/");
    //     console.log('You clicked Home button');
    //     console.log("name is ",name);
    //     console.log("email is ",email);
        
    // };
    // function handleEmail(e){
    //    setEmail(e.target.value);
    // }
    // runs when page load []
//     useEffect(()=>{
//   console.log("new name",name);
//   return()=>{
//     console.log("old name ",name)
//   }
    // },[name]);
    return (
    <div style={{ textAlign: 'center'}} >
        <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={onFormSubmit}>
            {({value,errors,touched,handleChange,handleSubmit})=>(
    <form onSubmit={handleSubmit}>
        {touched.name && errors.name && errors.name}
        <TextField label="Name" name="name" id="name" variant="outlined" type="text"onChange={handleChange}/>
        <TextField label="Email Address" id="email" name="email" variant="outlined" type="text" onChange={handleChange}/>
    {touched.email && errors.email && errors.email}
   {console.log("error: ",errors)}
     <Button variant="contained" type='submit'>submit</Button>
     </form>
            )}
     </Formik>
     {/* <button onClick={ onHomePageButtonClick}>Navigate to Home Page</button> */}
   
    <div>
           {user.map((item)=>(
            <div key={item.id}>
                {/* {/* <h3>{item.body}</h3> */}
                {/* <h3>{item.title}</h3>  */}
            </div>
           ))}
    </div>
    </div>
    );
}; 
export default Apple;
// mateial ui on input is remaining