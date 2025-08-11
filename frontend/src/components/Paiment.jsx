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
import {PayPalButtons,PayPalScriptProvider,usePayPalScriptReducer} from '@paypal/react-paypal-js'
const Paiment = () => {
// paypal tools
const base="https://api-m.sandbox.paypal.com"
const capturePayment=async (orderId)=>{
  const token=await generateAccessToken();
  const url=`${base}/v2/checkout/orders/${orderId}/capture`
  const response=await fetch(url,{
    method:"POST",
    headers:{
      'Content-Type':'application/json',
      Authorization:`Bearer ${token}`,
    }
  })
  if(response.ok){
    const res=await response.json()
    console.log(res)
    return await response.json();
  }else{
    const errorMessage=await response.text()
    console.log(errorMessage)
  }
}
const createOrder=async (price)=>{

  const token=await generateAccessToken();
  const url=`${base}/v2/checkout/orders`
  const response=await fetch(url,{
    method:"POST",
    headers:{
      'Content-Type':'application/json',
      Authorization:`Bearer ${token}`
    },
    body:JSON.stringify({
      intent:'CAPTURE',
      purchase_units:[{
        amount:{
          currency_code:'USD',
          value:price
        }
      }]
    })
  }

  )
  if(response.ok){
    return await response.json();
  }else{
    const errorMessage=await response.text()
    console.log(errorMessage)
  }
}
// Generate Access token
const PAYPAL_CLENT_ID="AfdbfYtpK1KaTxW83MWQlreQSQwugc6ToyOlppQpyBoiSCePQIT6p4ErRCM5BwM9AdHxcMP3z7KVufR1"
const PAYPAL_SECRET="EEIkO9DDLk5KjBpxP269LnmsXyDHiXJOFLVOqTc2gtWwrFdxhcbyqhvaoRShHNy411PPP9jXwoPS8Zc5"
const generateAccessToken=async ()=>{
const auth= btoa(`${PAYPAL_CLENT_ID}:${PAYPAL_SECRET}`)

const response=await fetch(`${base}/v1/oauth2/token`,{
  method:"POST",
  body:'grant_type=client_credentials',
  headers:{
    Authorization:`Basic ${auth}`,
    'Content-Type':'application/x-www-form-urlencoded'
  }
});
if(response.ok){
  const jsonData=await response.json();
  return jsonData.access_token 
}else{
  const errorMessage=await response.text();
  console.log(errorMessage)
}
}
// paypal tools

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
const hanldeCreateOrdr = async ()=>{
  const res=await createOrder(price)
  return res.id
}
const handleApprove =async ()=>{
 
}
const PintLoadingState=()=>{
  const [{isPending,isRejected}]=usePayPalScriptReducer();
  let status='';
  if(isPending)
    status='Loading PayPal ...'
  else if(isRejected)
    status='Error Loading PayPal ...'

  return status
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
                        {/* paypal payment */}
                        <PayPalScriptProvider options={{clientId:PAYPAL_CLENT_ID}}>
                        <PintLoadingState/>
                                <PayPalButtons createOrder={hanldeCreateOrdr} onApprove={handleApprove}/>
                        </PayPalScriptProvider>
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