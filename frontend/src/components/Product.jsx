import React,{useState,useEffect} from 'react'
import Menu from './Menu'
import {API_URL} from '../config/config'
import toastr from 'toastr'
import { CMultiSelect } from "@coreui/react-pro";
import "@coreui/coreui-pro/dist/css/coreui.min.css";

const Product = () => {
        const [menu,setMenu]=useState(false);
        const [saller,setSaller]=useState([]);
        const [category,setCategory]=useState([]);
        const MenuSwitch=(data)=>{
            setMenu(!menu);
        }
        var [sizeValue,setsizeValue]=useState([])
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
    productFormData=new FormData();
}
const getData=()=>{
    
}
const handleChangeSearch=(e)=>{
    setProductSearch({...productSearch,[e.target.name]:e.target.value});
}
    useEffect(()=>{
        getDataInput()
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

</>
  )
}

export default Product