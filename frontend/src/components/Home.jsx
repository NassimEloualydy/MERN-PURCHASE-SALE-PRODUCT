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
    const [orders,setOrders]=useState([]);
    const [price,setPrice]=useState(0)
    const [search,setSearch]=useState({
    name:"",
    description:"",
    price:"",
    status:"",
    qty:"",
    sizes:"",
    rating:"",
    first_name:"",
    last_name:"",
    category:"",
    });
    const [categorySelected,setCategorySelected]=useState("")
    const [categories,setCategories]=useState([])
     const [tableData, setTableData] = useState([
    [ 'Tiger Nixon', 'System Architect' ],
    [ 'Garrett Winters', 'Accountant' ],
  ]);
    const MenuSwitch=(data)=>{
        setMenu(!menu)

      }
const getOrders=()=>{
        fetch(`${API_URL}/order/getData`,{
    method:"POST",
    headers:{
            "Accept":"application/json",
            "Content-Type":"application/json",
            "authorization":`Bearer ${JSON.parse(localStorage.getItem("user")).token}`

    },
    body:JSON.stringify(search)
  }).then(res=>res.json()).then(res=>{
    if(res.data){
      setOrders(res.data);
      let p=0
      for(var i=0;i<res.data.length;i++){
        p+=res.data[i].product.price*res.data[i].qty
      }
      setPrice(p)
    }else{
    console.log(res)

    }
  }).catch(err=>{
    console.log(err)
  })
}
const handleChange=(e)=>{
    setSearch({...search,[e.target.name]:e.target.value})
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
      for(var i=0;i<res.data.length;i++){
        if(!categories.includes(res.data[i].category.name))
        categories.push(res.data[i].category.name)
      }
    
      console.log(categories)


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
const filterCategory=(data)=>{
  setCategorySelected(data);
  // var products=products.filter(p=>p.category.name==data)
  console.log(products)
}
const clearCurrentOrders=()=>{
          fetch(`${API_URL}/order/clearALL`,{
    method:"POST",
    headers:{
            "Accept":"application/json",
            "Content-Type":"application/json",
            "authorization":`Bearer ${JSON.parse(localStorage.getItem("user")).token}`

    },
  }).then(res=>res.json()).then(res=>{
    if(res.err){
      toastr.warning(res.err,"Wanrning",{positionClass:"toast-bottom-right"})

    }else if(res.message){
      toastr.success(res.message,"Success",{positionClass:"toast-bottom-right"})
      getOrders();
    
    }else{
    console.log(res)

    }
  }).catch(err=>{
    console.log(err)
  })
}
const submitOrder=(data)=>{
  
          fetch(`${API_URL}/order/submitOrder`,{
    method:"POST",
    headers:{
            "Accept":"application/json",
            "Content-Type":"application/json",
            "authorization":`Bearer ${JSON.parse(localStorage.getItem("user")).token}`

    },
    body:JSON.stringify({data})
  }).then(res=>res.json()).then(res=>{
    if(res.err){
      toastr.warning(res.err,"Wanrning",{positionClass:"toast-bottom-right"})

    }else if(res.message){
      toastr.success(res.message,"Success",{positionClass:"toast-bottom-right"})
      getOrders();
    
    }else{
    console.log(res)

    }
  }).catch(err=>{
    console.log(err)
  })
}
const updateQty=(order,step)=>{
            fetch(`${API_URL}/order/updateQty`,{
    method:"POST",
    headers:{
            "Accept":"application/json",
            "Content-Type":"application/json",
            "authorization":`Bearer ${JSON.parse(localStorage.getItem("user")).token}`

    },
    body:JSON.stringify({order,step})
  }).then(res=>res.json()).then(res=>{
    if(res.err){
      toastr.warning(res.err,"Wanrning",{positionClass:"toast-bottom-right"})

    }else if(res.message){
      toastr.success(res.message,"Success",{positionClass:"toast-bottom-right"})
      getOrders();
    
    }else{
    console.log(res)

    }
  }).catch(err=>{
    console.log(err)
  })
}
useEffect(()=>{
  getOrders();
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
                <div className="">
            <form action="">
                <div className="row text-center">
                    <div className="col-md mt-2"><input type="text" name="name" onChange={handleChange} value={search.name}    placeholder='Name' className="form-control" /></div>
                    <div className="col-md mt-2"><input type="text" name="description" onChange={handleChange} value={search.description}   placeholder='Description' className="form-control" /></div>
                    <div className="col-md mt-2"><input type="text" name="price" onChange={handleChange} value={search.price}   placeholder='Price' className="form-control" /></div>
                    <div className="col-md mt-2"><input type="text" name="category" onChange={handleChange} value={search.category}   placeholder='Category' className="form-control" /></div>
                </div>
                <div className="row text-center">
                    <div className="col-md mt-2"><input type="text" name="first_name" onChange={handleChange} value={search.first_name}   placeholder='Saller First Name' className="form-control" /></div>
                    <div className="col-md mt-2"><input type="text" name="last_name" onChange={handleChange} value={search.last_name}   placeholder='Saller Last Name' className="form-control" /></div>
                    <div className="col-md mt-2"><input type="text" name="rating" onChange={handleChange} value={search.rating}   placeholder='Rating' className="form-control" /></div>
                    <div className="col-md mt-2"><input type="text" name="sizes" onChange={handleChange} value={search.sizes}   placeholder='Sizes' className="form-control" /></div>
                    <div className="col-md mt-2"><input type="text" name="qty" onChange={handleChange} value={search.qty}   placeholder='Quantity' className="form-control" /></div>
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
        <section className="py-5">
    <div className="row m-2">
    {/* <div className="col-md-12 mb-3">
      <div className="card p-3">
        <div className="card-title"><div className="fw-bolder h5">Filters</div></div>
        <div className="card-body">
          <span className="badge text-dark" style={{fontSize:"17px",backgroundColor:"#e1e5f2",cursor:"pointer", margin:"3px"}}>All</span>
          <span className="badge text-dark" style={{fontSize:"17px",backgroundColor:"#e1e5f2",cursor:"pointer", margin:"3px"}}>All</span>
        </div>
      </div>
    </div> */}
    <div className="col-lg-9 col-md-12">
    <div className="row">
    <div className="fw-bolder m-1 h4">Products</div>

    <div className="mt-2 mb-2" style={{display:"flex"}}>
            {categorySelected==""?
            (            <span className="badge" onClick={filterCategory.bind(this,"")} style={{fontSize:"17px",backgroundColor:"#264653",cursor:"pointer", margin:"3px"}}>All</span>
):
            (
                         <span className="badge text-dark" onClick={filterCategory.bind(this,"")} style={{fontSize:"17px",backgroundColor:"#e1e5f2",cursor:"pointer", margin:"3px"}}>All</span>
 
            )
          }
          {categories.map((item,index)=>(
            item==categorySelected ? (
              <span key={index}  onClick={filterCategory.bind(this,item)} className="badge" style={{fontSize:"17px",backgroundColor:"#264653",cursor:"pointer", margin:"3px"}}>{item}</span>
            ):
            (
              <span key={index}  onClick={filterCategory.bind(this,item)} className="badge text-dark" style={{fontSize:"17px",backgroundColor:"#e1e5f2",cursor:"pointer", margin:"3px"}}>{item}</span>
            )



          ))}

    </div>
    
    {products && products.map((item,index)=>(
      (item.category.name==categorySelected || !categorySelected) && (        
        <div key={index} className="col-md-6 col-lg-3">
            <div className="card m-1 p-3" style={{position:"relative"}}>
            {item.status=='In Stock' && (
            <div className="badge fw-bolder" style={{position:"absolute",top:"5px",right:"5px",backgroundColor:"#2a9d8f"}}>{item.status}</div>
            )}
            {item.status=='Comming Soon' && (
            <div className="badge fw-bolder" style={{position:"absolute",top:"5px",right:"5px",backgroundColor:"#264653"}}>{item.status}</div>
            )}
            {item.status=='Limited Edition' && (
            <div className="badge fw-bolder" style={{position:"absolute",top:"5px",right:"5px",backgroundColor:"#f4a261"}}>{item.status}</div>
            )}
            {item.status=='Out Of Stock' && (
            <div className="badge fw-bolder" style={{position:"absolute",top:"5px",right:"5px",backgroundColor:"#e76f51"}}>{item.status}</div>
            )}

                {/* <div className="card-title">{item.name}</div> */}
                <img src={`${API_URL}/product/getProductPhoto/${item._id}`} 
                className="card-img-top img-main img-fluid imgProduct"

                style={{height:"100px"}} />
                <div className="text-center fw-bolder">{item.name}</div>
                <hr />
                <div className="text-start d-flex">
                    <span className="fw-bolder me-3">Category</span>
                    {item.category && (<span>{item.category.name}</span>)}
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
                <input type="button" onClick={submitOrder.bind(this,item._id)} value="Order 🛒" className="btn btn-dark mt-3"  style={{backgroundColor:"#264653"}}/>

            </div>
        </div>
      )
    ))}
    </div>
    </div>
    
    <div className="col-lg-3 col-md-12" >
        <div className="fw-bolder m-1 h4">Current Sale</div>

                    <div className="card p-3 m-1">
                      <div className="row">

                      <div className="col-md text-start fw-bolder">{orders.length} Items</div>
                      <div className="col-md text-end badge text-dark" >
                        <span onClick={clearCurrentOrders} className='badge p-2 fw-bolder' style={{backgroundColor:"#e76f51",cursor:"pointer",fontSize:"13px"}}>
                          Clear All
                        </span>
                        </div>
                      </div>
                      {orders.map((item,index)=>(
                        <div className='row' style={{position:"relative"}} key={index}>

                          <div className="col-md-3 text-start mt-3">
                                                    <img src={`${API_URL}/product/getProductPhoto/${item.product._id}`} alt="" style={{width:"50px",height:"50px",border:"0px solid black",borderRadius:"15px",objectFit:"cover"}} />
                            
                          </div>
                          <div className="col md-9 text-start">
                            <br />
                            <div className="fw-bolder">{item.product.name}</div>
                            Price :{item.product.price}

                            <span onClick={updateQty.bind(this,item._id,"add")} className="Icon Icon_paginate pb-0"   style={{position:"absolute",right:"0"}}>
                                <ion-icon   name="add-outline" ></ion-icon>
                            </span>
                            <span className="fw-bolder" style={{position:"absolute",right:"49px",marginTop:"5px"}}>{item.qty}</span>
                            <span onClick={updateQty.bind(this,item._id,"remove")} className="Icon Icon_paginate pb-0"   style={{position:"absolute",right:"80px"}}>
                        <ion-icon   name="remove-outline" ></ion-icon>
                            </span>

                          </div>
                        </div>
                        
                      ))}
                      <hr />
                      <div className="row">
                        <span className='col-md fw-bolder text-start'>Total : </span> 
                        <span className='col-md fw-bolder text-end'>{JSON.stringify(price)} MAD </span> 

                      </div>
                      
                      
                      <hr />
                      <input type="button" value="Confirm Order" className="btn btn-dark" style={{backgroundColor:"#2a9d8f",borderColor:"#2a9d8f"}} />

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