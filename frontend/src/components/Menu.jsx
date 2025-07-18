import React,{useState,useEffect} from 'react'
import { useNavigate } from 'react-router-dom'
import { API_URL } from '../config/config'

const Menu = () => {
    const navigate=useNavigate()
    const NavigateUrl=(data)=>{
      if(data=="/Log Out"){
        localStorage.clear()
        setUser({})
        navigate('/')
      }else{
        navigate(data);
        
      }
    }
    const [user,setUser]=useState({})
    useEffect(()=>{
      const user=JSON.parse(localStorage.getItem("user"));
      if(user)
        setUser(user)
      
    },[])
  return (
    <>
     {user.first_name && (
      <>
                          

         <img src={`${API_URL}/user/getPhoto/${user._id}`} alt="" className="imageUser" />
         <h3 className='fw-bolder'>{user.first_name} {user.last_name}</h3>  
      </>
     )}
     {!user.first_name && (
      <>
         <h3 className='fw-bolder'>Menu</h3>  
      </>
     )}


{!user.first_name && (
      <>
         <div onClick={NavigateUrl.bind(this,"/")} className="itemMenu">Home</div>

         <div onClick={NavigateUrl.bind(this,"/Register")} className="itemMenu">Register</div>
         <div onClick={NavigateUrl.bind(this,"/Login")} className="itemMenu">Login</div>
      </>
     )}
{user.first_name && (
  <>
         <div onClick={NavigateUrl.bind(this,"/")} className="itemMenu">Home</div>
  <div onClick={NavigateUrl.bind(this,"/Product")} className="itemMenu">Products</div>
  <div onClick={NavigateUrl.bind(this,"/Category")} className="itemMenu">Categories</div>
         <div onClick={NavigateUrl.bind(this,"/Log Out")} className="itemMenu">Log Out</div>

      </>
     )}

    </>
  )
}

export default Menu
