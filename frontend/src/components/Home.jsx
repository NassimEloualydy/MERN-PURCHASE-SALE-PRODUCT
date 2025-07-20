import React,{useState,useEffect} from 'react'
import Menu from './Menu'
import {API_URL} from '../config/config'
import toastr from 'toastr'
import DataTable from 'datatables.net-react';
import DT from 'datatables.net-dt';
import 'datatables.net-select-dt';
import 'datatables.net-responsive-dt';
DataTable.use(DT);


const Home = () => {
    const [menu,setMenu]=useState(false);
    const [products,setProducts]=useState([])
    const [search,setSearch]=useState();
     const [tableData, setTableData] = useState([
    [ 'Tiger Nixon', 'System Architect' ],
    [ 'Garrett Winters', 'Accountant' ],
  ]);
    const MenuSwitch=(data)=>{
        setMenu(!menu)

      }
const handleChange=(e)=>{
    setSearch({...search,[e.target.name]:e.target.vaue})
}
const getData=()=>{
      fetch(`${API_URL}/product/getDataHome/${offset}`,{
    method:"POST",
    headers:{
            "Accept":"application/json",
            "Content-Type":"application/json",
            "authorization":`Bearer ${JSON.parse(localStorage.getItem("user")).token}`

    },
    body:JSON.stringify(search)
  }).then(res=>res.json()).then(res=>{
    if(res.data){
      if(res.data.length==0){
    offset=0
        getData();
      }
      setProducts(res.data)



    }else{
    console.log(res)

    }
  }).catch(err=>{
    console.log(err)
  })
}      
            var offset=0

const paginateData=(step)=>{
  console.log(offset)

  if(step=='next'){
   let p=offset+9
    offset=p
  }
  if(step=='prev'){
    if(offset-9>=0){
      let p=offset-9
       offset=p

    }
  }
  console.log(offset)
  getData();

}
useEffect(()=>{
    getData()
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
        <div className="border border-white text-light pb-3 rounded-3" style={{width:"90%",marginLeft:"5%"}}>
            <div className="p-2">
                <h3 className='fw-bolder'>By Or Sale Your Product</h3>
                <br />
                <div className="d-flex">
                <input type="text" name="search" placeholder='Search By name,description,size,category....' value={search} onChange={handleChange} className="form-control"  style={{width:"80%"}}/>
                <input type="button" value="Search" id="" className="form-control btn btn-dark" style={{width:"20%"}} />
                
                </div>
            </div>
        </div>

    </div>
        <section className="py-5">
    <div className="row">
    <div className="col-md-9">
    <div className="row" style={{width:"90%",marginLeft:"5%"}}>
    <div className="fw-bolder m-1 h4">Products</div>
    {products.map((item,index)=>(
        <div key={index} className="col-md-6 col-lg-3">
            <div className="card m-1 p-3">
                {/* <div className="card-title">{item.name}</div> */}
                <img src={`${API_URL}/product/getProductPhoto/${item._id}`} 
                className="card-img-top img-main img-fluid imgProduct"

                style={{height:"100px"}} />
                <div className="text-center fw-bolder">{item.name}</div>
                <hr />
                <div className="text-start d-flex">
                    <span className="fw-bolder me-3">Category</span>
                    <span>{item.category.name}</span>
                </div>
                <div className="text-start d-flex">
                    <span className="fw-bolder me-3">Price</span>
                    <span>{item.price} MAD</span>
                </div>
                <div className="text-start d-flex">
                    <span className="fw-bolder me-3">Sizes</span>
                    <span>{item.sizes.split(',').map((size, index) => (
    <span key={index} className="badge text-dark" style={{backgroundColor:"#e1e5f2", margin:"3px"}}>
      {size.trim()}
    </span>
  ))}</span>
                </div>

            </div>
        </div>
    ))}
    </div>
    </div>
    
    <div className="col-md-3" >
        <div className="fw-bolder m-1 h4">Current Sale</div>

                    <div className="card me-5 p-3">
                <div className="card-title">Basket</div>
            </div>

    </div>
    </div>
    <br />
    <div className="" style={{marginLeft:"80px"}}>

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

export default Home