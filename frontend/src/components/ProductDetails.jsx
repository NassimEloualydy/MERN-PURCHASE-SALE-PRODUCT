import React,{useState,useEffect} from 'react'
import Menu from './Menu'
import {API_URL} from '../config/config'
import toastr from 'toastr'
import { useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import "@coreui/coreui-pro/dist/css/coreui.min.css";
import { CMultiSelect } from "@coreui/react-pro";

const ProductDetails = () => {
  const [menu,setMenu]=useState(false);
  const location = useLocation();
  const navigate=useNavigate();
  const [productFormData,setProductFormData]=useState(new FormData());
       const prod = location.state || {};
               var [sizeValue,setsizeValue]=useState([])
              sizeValue=prod.sizes.split(',')
               const [saller,setSaller]=useState([]);
               const [category,setCategory]=useState([]);
               const [product,setProduct]=useState({
    name:prod.name,
    _id:prod._id,
    description:prod.description,
    price:prod.price,
    status:prod.status,
    qty:prod.qty,
    sizes:prod.sizes.split(','),
    rating:prod.rating,
    saller:prod.saller,
    category:prod.category,

})


               var [sizes, setSizes] = useState([
                     { value: "XS", label: "XS" },
                     { value: "S", label: "S" },
                     { value: "M", label: "M" },
                     { value: "L", label: "L" },
                     { value: "XL", label: "XL" },
                     { value: "XXL", label: "XXL" },
                 
                   ]);
       

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

console.log(location)
      const MenuSwitch=(data)=>{
          setMenu(!menu)
  
        }
const handleChange=(e)=>{
  if (!Array.isArray(e)) {      
        const value=e.target.name=='photo'?e.target.files[0]:e.target.value;
   setProduct({...product,[e.target.name]:value})
   productFormData.set(e.target.name,value);
       }else{
           let d=[]
           for(var i=0;i<JSON.parse(JSON.stringify(e)).length;i++){
               d.push(JSON.parse(JSON.stringify(e))[i].value);
            }
    setProduct({...product,"sizes":d});
    setsizeValue(d);
    console.log(sizeValue);
    productFormData.set("sizes",d);
}
}
      const returnToProducts=()=>{
        navigate('/Product')
      }
  useEffect(()=>{
    getDataInput();
    
  },[])
  const updateProduct=()=>{
productFormData.set("_id",product._id);
productFormData.set("name",product.name);
productFormData.set("description",product.description);
productFormData.set("price",product.price);
productFormData.set("status",product.status);
productFormData.set("qty",product.qty);
productFormData.set("sizes",product.sizes);
productFormData.set("rating",product.rating);
if(product.saller._id)
  productFormData.set("saller",product.saller._id);
else
  productFormData.set("saller",product.saller);
if(product.category._id)
    productFormData.set("category",product.category._id);
else
    productFormData.set("category",product.category);

    productFormData.set("_id",product._id)
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
      returnToProducts()

    }else if(res.err){
      toastr.warning(res.err,"Warinig",{positionClass:"toast-bottom-right"})

    }else{
    console.log(res)

    }
  }).catch(err=>{
    console.log(err)
  })  }
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
                <h3 className='fw-bolder'>{product.name}</h3>

            </div>
        </div>

    </div>
      <section>
        <div className="container">
          <div className="row mt-5 mt-3">
            <div className="col-md">
              <input
                type="button"
                value="Return"
                onClick={returnToProducts}
                className="btn btn-dark"
              />
            </div>
          </div>
        </div>
      </section>
        <section  className="py-3">
    <div className="container">
      <div className="col-md-12 card p-3" style={{position:"relative"}}>
        {/* <div className="card-title fw-bolder">Product Details</div> */}

{/* <ion-icon name="camera-outline"></ion-icon> */}
        <img src={`${API_URL}/product/getProductPhoto/${product._id}`} alt="" style={{width:"120px",height:"120px",border:"0px solid black",borderRadius:"15px",objectFit:"cover"}} />
                        <div className="row">
                            <div className="col-md mt-2">
                                <div className="label-control">Photo</div>
                                <input type="file" name="photo" onChange={handleChange} className="form-control" />
                            </div>
                        </div>

                        <div className="row">
                            <div className="col-md mt-2">
                                <div className="label-control">Name</div>
                                <input type="title" name="name" value={product.name} onChange={handleChange} className="form-control" />
                            </div>
                            <div className="col-md mt-2">
                                <div className="label-control">Description</div>
                                <input type="title" name="description" value={product.description} onChange={handleChange} className="form-control" />
                            </div>

                        </div>
                        <div className="row">
                            <div className="col-md mt-2">
                                <div className="label-control">Saller</div>
                                <select name="saller" className='form-control' value={product.saller._id} onChange={handleChange}>
                                  <option value="">Choose A Saller</option>
                                  {saller.map((item,index)=>(
                                  <option key={index} value={item._id}>{item.first_name} {item.last_name}</option>
                                  ))}
                                </select>
                            </div>
                            <div className="col-md mt-2">
                                <div className="label-control">Category</div>
                                <select name="category" className='form-control' value={product.category._id} onChange={handleChange}>
                                  <option value="">Choose A Category</option>
                                  {category.map((item,index)=>(
                                  <option key={index} value={item._id}>{item.name}</option>
                                  ))}
                                </select>
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
                                <div className="label-control">Price</div>
                                <input type="text" name="price" value={product.price} id="" onChange={handleChange} className="form-control" />
                            </div>
                            <div className="col-md mt-2">
                                <div className="label-control">Qty</div>
                                <input type="text" name="qty" value={product.qty} id="" onChange={handleChange} className="form-control" />
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-md mt-2">
                                <div className="label-control">Sizes</div>
<CMultiSelect
                      options={sizes}
                      value={product.sizes}
                      name="sizes"
                      onChange={handleChange}
                    />

                            </div>
                        </div>
                        <div className="row">
                          <div className="col-md mt-2">
                            <input type="button" onClick={updateProduct} value="Update" className="btn btn-dark w-100" />
                          </div>
                        </div>


      </div>
        </div>
      </section>

    </>
  )
}

export default ProductDetails