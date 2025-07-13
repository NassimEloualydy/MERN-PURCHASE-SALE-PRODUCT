import React,{useState,useEffect} from 'react'
import Menu from './Menu'
import {API_URL} from '../config/config'
import toastr from 'toastr'
const Register = () => {
    const [menu,setMenu]=useState(false);
    const [user,setUser]=useState({
      first_name:"",
      last_name:"",
      email:"",
      password:"",
      phone:"",

    })
    const [userFormData,setUserFormData]=useState(new FormData());
    
    const MenuSwitch=(data)=>{
        setMenu(!menu)

      }
const handleChange=(e)=>{
  const value=e.target.name=='photo'?e.target.files[0]:e.target.value
  setUser({...user,[e.target.name]:value})
  userFormData.set(e.target.name,value)

}
const register=()=>{
  userFormData.set("role","User");

  fetch(`${API_URL}/user/register`,{
    method:"POST",
    headers:{
      "Accept":"application/json"
    },
    body:userFormData
  }).then(res=>res.json()).then(res=>{
    if(res.message){
      toastr.success(res.message,"Success",{positionClass:"toast-bottom-right"})
  setUser({
          first_name:"",
      last_name:"",
      email:"",
      password:"",
      phone:"",

  })

    }else if(res.err){
      toastr.warning(res.err,"Warinig",{positionClass:"toast-bottom-right"})

    }else{
    console.log(res)

    }
  }).catch(err=>{
    console.log(err)
  })
}
  return (
    <>
                <div className={menu?"menu":"hide_menu"}>
              <span onClick={MenuSwitch.bind(this,false)} className="close_menu">
              {/* <ion-icon name="close-outline"></ion-icon> */}
              </span>
              <br />
              <br />
              <Menu/>
              <span className="iconmenu" onClick={MenuSwitch.bind(this,true)}>

<ion-icon name="menu-outline"></ion-icon>
    </span>
        </div>
                <div className="headerSearchInfo">
        <br />
        <br />
        <div className="container border border-white text-light pb-3 rounded-3">
            <div className="p-2">
                <h3 className='fw-bolder'>Register</h3>

            </div>
        </div>

    </div>
    <section className="m-3">
      <div className="container">
        <div className="row">
          <div className="card col-md-6 mx-auto">
            <div className="card-body">
              <div className="card-title">
                <h3>Register Form</h3>
              </div>
              <form action="">
                <div className="row col-md mt-2">
                  <div className="form-label">Photo</div>
                  <input type="file" name="photo" onChange={handleChange}   className="form-control" />
                </div>

                <div className="row col-md mt-2">
                  <div className="form-label">First Name</div>
                  <input type="text" name="first_name" onChange={handleChange}  value={user.first_name} className="form-control" />
                </div>
                <div className="row col-md mt-2">
                  <div className="form-label">Last Name</div>
                  <input type="text" name="last_name" onChange={handleChange}  value={user.last_name} className="form-control" />
                </div>
                <div className="row col-md mt-2">
                  <div className="form-label">Phone</div>
                  <input type="text" name="phone" onChange={handleChange}  value={user.phone} className="form-control" />
                </div>

                <div className="row col-md mt-2">
                  <div className="form-label">Email</div>
                  <input type="text" name="email" onChange={handleChange}  value={user.email} className="form-control" />
                </div>

                <div className="row col-md mt-2">
                  <div className="form-label">Password</div>
                  <input type="text" name="password" onChange={handleChange}  value={user.password} className="form-control" />
                </div>


                <div className="row col-md mt-2">
                  <input type="button" value="Register" onClick={register} className="btn btn-dark" />
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>

    </>

  )
}

export default Register