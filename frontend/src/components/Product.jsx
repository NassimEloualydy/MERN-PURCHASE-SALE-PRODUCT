import React,{useState,useEffect} from 'react'
import Menu from './Menu'
import {API_URL} from '../config/config'
import toastr from 'toastr'
import { CMultiSelect } from "@coreui/react-pro";
import { useNavigate } from 'react-router-dom';
import "@coreui/coreui-pro/dist/css/coreui.min.css";
import {Bar,Doughnut,Bubble} from "react-chartjs-2";
import Chart from 'chart.js/auto';
import { data } from 'jquery';

const Product = () => {
     var label1=[];
     var data1=[];
     const [chartData1,setChartData1]=useState({
      labels:label1,
      datasets:[{
       label:"Products By Category",
       data:data1,
       backgroundColor: [
        'rgba(255, 99, 132, 0.2)',
        'rgba(255, 159, 64, 0.2)',
        'rgba(255, 205, 86, 0.2)',
        'rgba(75, 192, 192, 0.2)',
        'rgba(54, 162, 235, 0.2)',
        'rgba(153, 102, 255, 0.2)',
        'rgba(201, 203, 207, 0.2)'
      ],
      borderColor: [
        'rgb(255, 99, 132)',
        'rgb(255, 159, 64)',
        'rgb(255, 205, 86)',
        'rgb(75, 192, 192)',
        'rgb(54, 162, 235)',
        'rgb(153, 102, 255)',
        'rgb(201, 203, 207)'
      ],
borderWidth: 1

      }]  
 

     })
    
 const options = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };
        const navigate=useNavigate()
        const getDataProductByCategory=()=>{
                    fetch(`${API_URL}/product/getDataProductByCategory`,{
    method:"POST",
    headers:{
            "Accept":"application/json",
            "Content-Type":"application/json",
            "authorization":`Bearer ${JSON.parse(localStorage.getItem("user")).token}`

    },

  }).then(res=>res.json()).then(res=>{
    if(res.data){
    for(var i=0;i<res.data.length;i++){
        label1.push(res.data[i].category)
        data1.push(res.data[i].productCount)

    }
    console.log(res.data)
 setChartData1({
      labels:label1,
      datasets:[{
       label:"Products By Category",
       data:data1,
       backgroundColor: [
        'rgba(255, 99, 132, 0.2)',
        'rgba(255, 159, 64, 0.2)',
        'rgba(255, 205, 86, 0.2)',
        'rgba(75, 192, 192, 0.2)',
        'rgba(54, 162, 235, 0.2)',
        'rgba(153, 102, 255, 0.2)',
        'rgba(201, 203, 207, 0.2)'
      ],
      borderColor: [
        'rgb(255, 99, 132)',
        'rgb(255, 159, 64)',
        'rgb(255, 205, 86)',
        'rgb(75, 192, 192)',
        'rgb(54, 162, 235)',
        'rgb(153, 102, 255)',
        'rgb(201, 203, 207)'
      ],
borderWidth: 1

      }]  
 

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

        const [menu,setMenu]=useState(false);
        const [products,setProducts]=useState([]);
        const [saller,setSaller]=useState([]);
        const [category,setCategory]=useState([]);
            var offset=0

        const MenuSwitch=(data)=>{
            setMenu(!menu);
        }
        var [sizeValue,setsizeValue]=useState([])
const paginateData=(step)=>{
  console.log(offset)

  if(step=='next'){
   let p=offset+6
    offset=p
  }
  if(step=='prev'){
    if(offset-6>=0){
      let p=offset-6
       offset=p

    }
  }
  console.log(offset)
  getData();

}
const getDataInput=()=>{
        fetch(`${API_URL}/product/getDataInput`,{
    method:"POST",
    headers:{
            "Accept":"application/json",
            "Content-Type":"application/json",
            "authorization":`Bearer ${JSON.parse(localStorage.getItem("user")).token}`

    },

  }).then(res=>res.json()).then(res=>{
    if(res.sallers  && res.categories){
        setSaller(res.sallers)
        setCategory(res.categories)
    }else if(res.err){
      toastr.warning(res.err,"Warinig",{positionClass:"toast-bottom-right"})

    }else{
    console.log(res)

    }
  }).catch(err=>{
    console.log(err)
  }) 
}
var [sizes, setSizes] = useState([
              { value: "XS", label: "XS" },
              { value: "S", label: "S" },
              { value: "M", label: "M" },
              { value: "L", label: "L" },
              { value: "XL", label: "XL" },
              { value: "XXL", label: "XXL" },
          
            ]);

const [product,setProduct]=useState({
    name:"",
    description:"",
    price:"",
    status:"",
    qty:"",
    sizes:"",
    rating:"",
    saller:"",
    category:"",

})
const [productSearch,setProductSearch]=useState({
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

})

const [productFormData,setProductFormData]=useState(new FormData());

const handleChange=(e)=>{
    if (!Array.isArray(e)) {
        
        const value=e.target.name=='photo'?e.target.files[0]:e.target.value;
   setProduct({...product,[e.target.name]:value})
   productFormData.set(e.target.name,value);
       }else{
           let d=[]
           for(var i=0;i<JSON.parse(JSON.stringify(e)).length;i++){
               d.push(JSON.parse(JSON.stringify(e))[i].value)
            }
    setProduct({...product,"sizes":d})    
    setsizeValue(d);
    console.log(sizeValue)

   productFormData.set("sizes",d);

}
}
const submitProduct=()=>{

   fetch(`${API_URL}/product/submitProduct`,{
    method:"POST",
    headers:{
            "Accept":"application/json",
            // "Content-Type":"application/json",
            "authorization":`Bearer ${JSON.parse(localStorage.getItem("user")).token}`

    },
    body:productFormData
  }).then(res=>res.json()).then(res=>{
    if(res.message){
      toastr.success(res.message,"Success",{positionClass:"toast-bottom-right"})
      
        hideData()
        getData();
        getDataProductByCategory();

    }else if(res.err){
      toastr.warning(res.err,"Warinig",{positionClass:"toast-bottom-right"})

    }else{
    console.log(res)

    }
  }).catch(err=>{
    console.log(err)
  })}
const hideData=()=>{
    document.querySelectorAll('.form-multi-select-cleaner')[0].click();
    setProduct({
            name:"",
    description:"",
    price:"",
    status:"",
    qty:"",
    sizes:"",
    rating:"",
    saller:"",
    category:"",

    })
    setProductFormData(new FormData());
}
const getData=()=>{
      fetch(`${API_URL}/product/getData/${offset}`,{
    method:"POST",
    headers:{
            "Accept":"application/json",
            "Content-Type":"application/json",
            "authorization":`Bearer ${JSON.parse(localStorage.getItem("user")).token}`

    },
    body:JSON.stringify(productSearch)
  }).then(res=>res.json()).then(res=>{
    if(res.data){
      if(res.data.length==0){
    offset=0

        getData();
      }
    //   var data=[]
    //   for(var i=0;i<res.data.length;i++){
    //     var Sexe=[]
    //     for(var j=0;j<JSON.parse(res.data[i].sexe).length;j++){
    //         if (JSON.parse(res.data[i].sexe)[j].value=="Male")
    //             // Sexe+="<span style='margin: 1px;padding-bottom: 0px;background-color: #2a9d8f;display:inline-block;padding:.35em .65em;font-size:.75em;font-weight:700;line-height:1;color:#fff;text-align:center;white-space:nowrap;vertical-align:baseline;border-radius:.25rem;' className='badge pb-1'>Male</span>"
    //           Sexe.push("Male")
    //         if (JSON.parse(res.data[i].sexe)[j].value=="Female")
    //             // Sexe+="<span style='margin: 1px;padding-bottom: 0px;background-color: #2a9d8f;display:inline-block;padding:.35em .65em;font-size:.75em;font-weight:700;line-height:1;color:#fff;text-align:center;white-space:nowrap;vertical-align:baseline;border-radius:.25rem;' className='badge pb-1'>Female</span>"
    //           Sexe.push("Female")

    //     }
    //     data.push({_id:res.data[i]._id,Name:res.data[i].name,Sexe})
    //   }
      setProducts(res.data)



    }else{
    console.log(res)

    }
  }).catch(err=>{
    console.log(err)
  })
}
const deleteItem=(data)=>{
   fetch(`${API_URL}/product/deleteProduct/${data}`,{
    method:"POST",
    headers:{
            "Accept":"application/json",
            // "Content-Type":"application/json",
            "authorization":`Bearer ${JSON.parse(localStorage.getItem("user")).token}`

    },
  }).then(res=>res.json()).then(res=>{
    if(res.message){
      toastr.success(res.message,"Success",{positionClass:"toast-bottom-right"})
      
        getData();
        getDataProductByCategory();

    }else if(res.err){
      toastr.warning(res.err,"Warinig",{positionClass:"toast-bottom-right"})

    }else{
    console.log(res)

    }
  }).catch(err=>{
    console.log(err)
  })
}
const loadItem=(data)=>{
    console.log(data)
navigate('/ProductDetails',{state:data})
}
const handleChangeSearch=(e)=>{
    setProductSearch({...productSearch,[e.target.name]:e.target.value});
}
    useEffect(()=>{
        getDataInput();
        getData();
        getDataProductByCategory();
    },[])
return (
    <>       <div className={menu?"menu":"hide_menu"}>
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
                <h3 className='fw-bolder'>Products</h3>
           <div className="container">
            <form action="">
                <div className="row text-center">
                    <div className="col-md mt-2"><input type="text" name="name" onChange={handleChangeSearch} value={productSearch.name}    placeholder='Name' className="form-control" /></div>
                    <div className="col-md mt-2"><input type="text" name="description" onChange={handleChangeSearch} value={productSearch.description}   placeholder='Description' className="form-control" /></div>
                    <div className="col-md mt-2"><input type="text" name="price" onChange={handleChangeSearch} value={productSearch.price}   placeholder='Price' className="form-control" /></div>
                    <div className="col-md mt-2"><input type="text" name="category" onChange={handleChangeSearch} value={productSearch.category}   placeholder='Category' className="form-control" /></div>
                </div>
                <div className="row text-center">
                    <div className="col-md mt-2"><input type="text" name="first_name" onChange={handleChangeSearch} value={productSearch.first_name}   placeholder='Saller First Name' className="form-control" /></div>
                    <div className="col-md mt-2"><input type="text" name="last_name" onChange={handleChangeSearch} value={productSearch.last_name}   placeholder='Saller Last Name' className="form-control" /></div>
                    <div className="col-md mt-2"><input type="text" name="rating" onChange={handleChangeSearch} value={productSearch.rating}   placeholder='Rating' className="form-control" /></div>
                    <div className="col-md mt-2"><input type="text" name="sizes" onChange={handleChangeSearch} value={productSearch.sizes}   placeholder='Sizes' className="form-control" /></div>
                    <div className="col-md mt-2"><input type="text" name="qty" onChange={handleChangeSearch} value={productSearch.qty}   placeholder='Quantity' className="form-control" /></div>
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
    <div className="container">
        <div className="row mt-5 mt3">
            <div className="col-md" >
                      <Bar data={chartData1} width={900} height={300} options={options}/>

            </div>
        </div>
    </div>
      <section>
        <div className="container">
          <div className="row mt-5 mt-3">
            <div className="col-md">
              <input
                type="button"
                value="New"
                data-bs-toggle="modal"
                data-bs-target="#modelForm"
                className="btn btn-dark"
              />
            </div>
          </div>
        </div>
      </section>
    <section className="modal fade" id="modelForm">
        <div className="modal-dialog">
            <div className="modal-content">
                <div className="modal-header">
                    <h5>Product Form</h5>
                    <button className="btn-close"  aria-label='close' onClick={hideData} data-bs-dismiss="modal"></button>
                </div>
                <div className="modal-body">
                    <div className="form">
                        <div className="row">
                            <div className="col-md mt-2">
                                <div className="label-control">Photo</div>
                                <input type="file" name="photo" onChange={handleChange} className="form-control" />
                            </div>
                        </div>

                        <div className="row">
                            <div className="col-md mt-2">
                                <div className="label-control">Name</div>
                                <input type="text" name="name" value={product.name} id="" onChange={handleChange} className="form-control" />
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-md mt-2">
                                <div className="label-control">Description</div>
                                <input type="text" name="description" value={product.description} id="" onChange={handleChange} className="form-control" />
                            </div>
                        </div>

                        <div className="row">
                            <div className="col-md mt-2">
                                <div className="label-control">Sizes</div>
<CMultiSelect
                      options={sizes}
                      value={sizeValue}
                      name="sizes"
                      onChange={handleChange}
                    />

                            </div>
                        </div>

                        <div className="row">
                            <div className="col-md mt-2">
                                <div className="label-control">Price</div>
                                <input type="text" name="price" value={product.price} id="" onChange={handleChange} className="form-control" />
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-md mt-2">
                                <div className="label-control">Qty</div>
                                <input type="text" name="qty" value={product.qty} id="" onChange={handleChange} className="form-control" />
                            </div>
                        </div>

                        <div className="row">
                            <div className="col-md mt-2">
                                <div className="label-control">Status</div>
                                <select name="status" value={product.status} id="" onChange={handleChange} className="form-control">
                                    <option value="">Choose A Status</option>
                                    <option value="In Stock">In Stock</option>
                                    <option value="Comming Soon">Comming Soon</option>
                                    <option value="Limited Edition">Limited Edition</option>
                                    <option value="Out Of Stock">Out Of Stock</option>
                                </select>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-md mt-2">
                                <div className="label-control">Rating</div>
                                <select name="rating" value={product.rating}  onChange={handleChange} className="form-control">
                                    <option value="">Choose A Rating</option>
                                    <option value="5">5</option>
                                    <option value="4">4</option>
                                    <option value="3">3</option>
                                    <option value="2">2</option>
                                    <option value="1">1</option>
                                </select>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-md mt-2">
                                <div className="label-control">Saller</div>
                                <select name="saller" value={product.saller}  onChange={handleChange} className="form-control">
                                    <option value="">Choose A Saller</option>
                                     {saller.map((item,index)=>(
                                        <option key={index} value={item._id}>{item.first_name} {item.last_name}</option>
                                    ))}

                                </select>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-md mt-2">
                                <div className="label-control">Category</div>
                                <select name="category" value={product.category}  onChange={handleChange} className="form-control">
                                    <option value="">Choose A Category</option>
                                    {category.map((item,index)=>(
                                        <option key={index} value={item._id}>{item.name}</option>
                                    ))}
                                </select>
                            </div>
                        </div>

<div className="row">
    <div className="col-md mt-2">
        <input type="button" value="Submit" onClick={submitProduct}  className="btn btn-dark" />
    </div>
</div>
                    </div>
                </div>
            </div>
        </div>
    </section>
<div className="py-3">
    <div className="container">
    <div className="row">
        {products.map((item,index)=>(
            <div key={index} className="col-sm-6 col-lg-6 col-md-12">

        <div className="card m-1 p-3" style={{position:"relative"}}>
            <div className="card-title">
                <div className="" style={{position:"absolute",bottom:"5px",right:"5px"}}>

                        <span className="Icon Icon_delete" onClick={deleteItem.bind(this,item._id)} style={{paddingBottom:"0px",margin:"5px"}}>
                                <ion-icon   name="trash-outline"></ion-icon>
                            </span>
                            <span  className="Icon Icon_update"   onClick={loadItem.bind(this,item)} style={{paddingBottom:"0px"}}>

<ion-icon name="information-outline"></ion-icon>                            </span>
                </div>



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
                <div className="row">
                    <div className="col-md-4">
                        <img src={`${API_URL}/product/getProductPhoto/${item._id}`} alt="" style={{width:"120px",height:"120px",border:"0px solid black",borderRadius:"15px",objectFit:"cover"}} />
                    </div>
                    <div className="col-md-8">                    
                        <div className="fw-bolder" style={{marginBottom:"15px"}}>{item.name}</div>
                        <hr />
                       Price : <span className="fw-bolder">{item.price} MAD</span><br/>
                       Saller : <span className="fw-bolder">{item.saller.first_name} {item.saller.last_name}</span><br/>
                       {item.category && (
                        <>
                       Category : <span className="fw-bolder">{item.category.name}</span><br/>
                        </>
                       )}
                       Sizes :{item.sizes.split(',').map((size, index) => (
    <span key={index} className="badge text-dark" style={{backgroundColor:"#e1e5f2", margin:"3px"}}>
      {size.trim()}
    </span>
  ))}<br/>

                    </div>
                

                </div>
            </div>
        </div>
            </div>
        ))}
        </div>
<br />

                                    <span  className="Icon Icon_paginate" onClick={paginateData.bind(this,"prev")}  style={{paddingBottom:"0px",margin:"5px"}}>

                        <ion-icon   name="chevron-back-outline" ></ion-icon>
                            </span>
                            <span  className="Icon Icon_paginate"  onClick={paginateData.bind(this,"next")} style={{paddingBottom:"0px",margin:"5px"}}>

                        <ion-icon   name="chevron-forward-outline" ></ion-icon>
                            </span>

    </div>
</div>
</>
  )
}

export default Product