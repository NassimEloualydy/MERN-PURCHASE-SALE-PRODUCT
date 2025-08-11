import React,{useState,useEffect} from 'react'
import ReactDOMServer from 'react-dom/server';
import Menu from './Menu'
import {API_URL} from '../config/config'
import toastr from 'toastr'
import DataTable from 'datatables.net-react';
import DT from 'datatables.net-dt';
import 'datatables.net-select-dt';
import 'datatables.net-responsive-dt';
import { CMultiSelect } from "@coreui/react-pro";
import "@coreui/coreui-pro/dist/css/coreui.min.css";
import $, { data } from 'jquery';
DataTable.use(DT);

const Orders = () => {
    var [sexeData,setSexeData]=useState([])
    var offset=0
    // const [offset,offset==seState(0)
    const [searchOrders,setSearchOrders]=useState({
        name:"",
        sexe:""
    })
    const handleChangeSearch=(e)=>{
        setSearchOrders({...searchOrders,[e.target.name]:e.target.value})
    }
    const [menu,setMenu]=useState(false);
//      const [tableData, setTableData] = useState([
//     [ 'Tiger Nixon', 'System Architect' ],
//     [ 'Garrett Winters', 'Accountant' ],
//   ]);

const MenuSwitch=(data)=>{
        setMenu(!menu)

      }
const paginateData=(step)=>{
  console.log(offset)

  if(step=='next'){
   let p=offset+8
    offset=p
  }
  if(step=='prev'){
    if(offset-8>=0){
      let p=offset-8
       offset=p

    }
  }
  console.log(offset)
  getData();

}
const [tableData, setTableData] = useState([  ]);

const getData=()=>{

      fetch(`${API_URL}/category/getData/${offset}`,{
    method:"POST",
    headers:{
            "Accept":"application/json",
            "Content-Type":"application/json",
            "authorization":`Bearer ${JSON.parse(localStorage.getItem("user")).token}`

    },
    body:JSON.stringify(searchOrders)
  }).then(res=>res.json()).then(res=>{
    if(res.data){
      if(res.data.length==0){
    offset=0

        getData();
      }
      var data=[]
      for(var i=0;i<res.data.length;i++){
        var Sexe=[]
        for(var j=0;j<JSON.parse(res.data[i].sexe).length;j++){
            if (JSON.parse(res.data[i].sexe)[j].value=="Male")
                // Sexe+="<span style='margin: 1px;padding-bottom: 0px;background-color: #2a9d8f;display:inline-block;padding:.35em .65em;font-size:.75em;font-weight:700;line-height:1;color:#fff;text-align:center;white-space:nowrap;vertical-align:baseline;border-radius:.25rem;' className='badge pb-1'>Male</span>"
              Sexe.push("Male")
            if (JSON.parse(res.data[i].sexe)[j].value=="Female")
                // Sexe+="<span style='margin: 1px;padding-bottom: 0px;background-color: #2a9d8f;display:inline-block;padding:.35em .65em;font-size:.75em;font-weight:700;line-height:1;color:#fff;text-align:center;white-space:nowrap;vertical-align:baseline;border-radius:.25rem;' className='badge pb-1'>Female</span>"
              Sexe.push("Female")

        }
        data.push({_id:res.data[i]._id,Name:res.data[i].name,Sexe})
      }
      setTableData(data)



    }else{
    console.log(res)

    }
  }).catch(err=>{
    console.log(err)
  })

}

const deleteItem=(data)=>{
    fetch(`${API_URL}/category/deleteCategory/${data}`,{
    method:"POST",
    headers:{
            "Accept":"application/json",
            "Content-Type":"application/json",
            "authorization":`Bearer ${JSON.parse(localStorage.getItem("user")).token}`

    },
    body:JSON.stringify(category)
  }).then(res=>res.json()).then(res=>{
    if(res.message){
      toastr.success(res.message,"Success",{positionClass:"toast-bottom-right"})
       getData();


    }else if(res.err){
      toastr.warning(res.err,"Warinig",{positionClass:"toast-bottom-right"})

    }else{
    console.log(res)

    }
  }).catch(err=>{
    console.log(err)
  }) 
}

useEffect(()=>{
getData();
},[])

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
                <h3 className='fw-bolder'>Orders</h3>
           <div className="container">
            <form action="">
                <div className="row text-center">
                    {/* <div className="col-md mt-2"><input type="text" name="name" onChange={handleChangeSearch} value={searchCategory.name}    placeholder='Name' className="form-control" /></div>
                    <div className="col-md mt-2"><input type="text" name="sexe" onChange={handleChangeSearch} value={searchCategory.sexe}   placeholder='Sexe' className="form-control" /></div> */}
                </div>
                <div className="row text-center">
                    <div className="col-md mt-2">
                        <input type="button" value="Search" onClick={getData}  className="btn btn-dark w-100" />
                    </div>
                </div>
            </form>
        </div>
            </div>
        </div>

    </div>
        <section  className="py-3">
    <div className="container">
      <table className='table'>
        <thead>
          <tr>
            <th>Name</th>
            <th>Sexe</th>
            <th ></th>
          </tr>
        </thead>
        <tbody>
                        {tableData.map((item,index)=>(
                        <tr key={index}>
                            
                        <td className='text-start'>{item.Name}</td>
                        <td className='text-start'>{item.Sexe.map((key,value)=>(
                          <span
  key={key}
  style={{
    margin: '1px',
    paddingBottom: '0px',
    backgroundColor: '#2a9d8f',
    display: 'inline-block',
    padding: '.35em .65em',
    fontSize: '.75em',
    fontWeight: '700',
    lineHeight: '1',
    color: '#fff',
    textAlign: 'center',
    whiteSpace: 'nowrap',
    verticalAlign: 'baseline',
    borderRadius: '.25rem',
  }}
  className="badge pb-1"
>
  {item.Sexe[value]}
</span>
                        ))}</td>
                        <td className="text-start">
                            <span className="Icon Icon_delete" onClick={deleteItem.bind(this,item._id)} style={{paddingBottom:"0px",margin:"5px"}}>
                                <ion-icon   name="trash-outline"></ion-icon>
                            </span>
                            <span  className="Icon Icon_update" data-bs-toggle="modal" data-bs-target="#modelForm"  onClick={loadItem.bind(this,item)} style={{paddingBottom:"0px"}}>

                        <ion-icon   name="pencil-outline" ></ion-icon>
                            </span>

                        </td>
                        </tr>
                        ))}
        </tbody>
      </table>
                            <span  className="Icon Icon_paginate" onClick={paginateData.bind(this,"prev")}  style={{paddingBottom:"0px",margin:"5px"}}>

                        <ion-icon   name="chevron-back-outline" ></ion-icon>
                            </span>
                            <span  className="Icon Icon_paginate"  onClick={paginateData.bind(this,"next")} style={{paddingBottom:"0px",margin:"5px"}}>

                        <ion-icon   name="chevron-forward-outline" ></ion-icon>
                            </span>
    </div>
    </section>
    </>

  )
}

export default Orders