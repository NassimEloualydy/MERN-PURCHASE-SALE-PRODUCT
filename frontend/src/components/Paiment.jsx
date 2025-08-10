import React,{useState,useEffect} from 'react'
import ReactDOMServer from 'react-dom/server';
import { useNavigate } from 'react-router-dom';
import Menu from './Menu'
import {API_URL} from '../config/config'
import toastr from 'toastr'
import DataTable from 'datatables.net-react';
import DT from 'datatables.net-dt';
import { useLocation } from 'react-router-dom';

import 'datatables.net-select-dt';
import 'datatables.net-responsive-dt';
import { CMultiSelect } from "@coreui/react-pro";
import "@coreui/coreui-pro/dist/css/coreui.min.css";

const Paiment = () => {
        const [user,setUser]=useState({})
        const navigate=useNavigate();
        useEffect(()=>{
          const user=JSON.parse(localStorage.getItem("user"));
          if(user)
            setUser(user)
          
        },[])
    
  const location = useLocation();
    var price=0;
    const [menu,setMenu]=useState(false);
const orders=location.state || {}
      for(var i=0;i<orders.length;i++){
        price+=orders[i].product.price*orders[i].qty
      }
const paid=()=>{
   var ids=[]
      for(var i=0;i<orders.length;i++){
        ids.push(orders[i]._id)
      }
            fetch(`${API_URL}/order/paid`,{
        method:"POST",
        headers:{
                "Accept":"application/json",
                "Content-Type":"application/json",
                "authorization":`Bearer ${JSON.parse(localStorage.getItem("user")).token}`
    
        },
        body:JSON.stringify({ids})
      }).then(res=>res.json()).then(res=>{
    if(res.message){
      toastr.success(res.message,"Success",{positionClass:"toast-bottom-right"})      
      navigate('/',{state:orders})

    }else if(res.err){
      toastr.warning(res.err,"Warinig",{positionClass:"toast-bottom-right"})

    }else{
    console.log(res)

    }      }).catch(err=>{
        console.log(err)
      })
    
}
const MenuSwitch=(data)=>{
        setMenu(!menu)

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
                <h3 className='fw-bolder'>Paiment</h3>
           <div className="container">
        </div>
            </div>
        </div>

    </div>
    <section className="py-5">
        <div className="row m-2">
            <div className="col-lg-9 col-md-12 mt-2">
                <div className="card p-3">
                    <div className="card-title fw-bolder">
                    Orders
                    </div>
                    <div className="card-body">
                        <table className='table'>
                            <thead>
                                <tr>
                                    <th>Product</th>
                                    <th>Price</th>
                                    <th>Qte</th>
                                    <th>Status</th>
                                    <th>Delevered</th>
                                    <th>Paid</th>
                                </tr>
                            </thead>
                            <tbody>
                                              {orders.map((item,index)=>(
                                                <tr key={index}>
                                                    <td>{item.product.name}</td>
                                                    <td>{item.product.price} MAD</td>
                                                    <td>{item.qty}</td>
                                                    <td>                                                        
                                                        {item.status=="In Progress" && (
                                                            <span className="badge"  style={{backgroundColor:"#e9c46a",cursor:"pointer", margin:"3px"}}>{item.status}</span>
                                                        )}
                                                        {item.status=="Confirmed" && (
                                                            <span className="badge"  style={{backgroundColor:"#2a9d8f",cursor:"pointer", margin:"3px"}}>{item.status}</span>
                                                        )}
                                                        {item.status=="Cancelled" && (
                                                            <span className="badge"  style={{backgroundColor:"#e76f51",cursor:"pointer", margin:"3px"}}>{item.status}</span>
                                                        )}

                                                    </td>
                                                    <td>
                                                        {
                                                        item.isReceived=="True" && (
                                                            <span className="badge"  style={{backgroundColor:"#2a9d8f",cursor:"pointer", margin:"3px"}}>Yes</span>

                                                        )
                                                        }
                                                                                                                {
                                                        item.isReceived=="False" && (
                                                            <span className="badge"  style={{backgroundColor:"#e76f51",cursor:"pointer", margin:"3px"}}>No</span>

                                                        )
                                                        }
                                                        </td>
                                                    <td>
                                                                                                                {
                                                        item.isPaid=="True" && (
                                                            <span className="badge"  style={{backgroundColor:"#2a9d8f",cursor:"pointer", margin:"3px"}}>Yes</span>

                                                        )
                                                        }
                                                                                                                {
                                                        item.isPaid=="False" && (
                                                            <span className="badge"  style={{backgroundColor:"#e76f51",cursor:"pointer", margin:"3px"}}>No</span>

                                                        )
                                                        }

                                                        </td>
                                                </tr>
                                                // <div className='row' style={{position:"relative"}} key={index}>
                        
                                                //   <div className="col-md-3 text-start mt-3">
                                                //                             <img src={`${API_URL}/product/getProductPhoto/${item.product._id}`} alt="" style={{width:"50px",height:"50px",border:"0px solid black",borderRadius:"15px",objectFit:"cover"}} />
                                                    
                                                //   </div>
                                                //   <div className="col md-9 text-start">
                                                //     <br />
                                                //     <div className="fw-bolder">{item.product.name}</div>
                                                //     Price :{item.product.price}
                        
                        
                                                //   </div>
                                                // </div>
                                                
                                              ))}
                                
                            </tbody>
                        </table>
                        
                    </div>
                </div>
            </div>
            <div className="col-lg-3 col-md-12 mt-2">
                <div className="card p-3">
                      <div className="row mb-3">
                        <span className='col-md fw-bolder text-start'>Saller : </span> 
                        <span className='col-md fw-bolder text-end'>{user.first_name} {user.last_name} </span> 

                      </div>

                      <div className="row">
                        <span className='col-md fw-bolder text-start'>Total : </span> 
                        <span className='col-md fw-bolder text-end'>{price} MAD </span> 

                      </div>
                      <div className="row mt-3">
                      <input type="button" value="Mark As Paid" onClick={paid} className="btn btn-dark" style={{backgroundColor:"#2a9d8f",borderColor:"#2a9d8f"}} />

                      </div>

                </div>
            </div>
        </div>
    </section>
    </>
  )
}

export default Paiment