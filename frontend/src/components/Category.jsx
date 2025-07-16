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

const Category = () => {
    var [sexeData,setSexeData]=useState([])
    var offset=0
    // const [offset,offset==seState(0)
    const [category,setCategory]=useState({
        name:"",
    })
    const [searchCategory,setSearchCategory]=useState({
        name:"",
        sexe:""
    })
    const handleChangeSearch=(e)=>{
        setSearchCategory({...searchCategory,[e.target.name]:e.target.value})
    }
    var [sexe, setSexe] = useState([
        { value: "Male", label: "Male" },
        { value: "Female", label: "Female" },
    
      ]);
    const [menu,setMenu]=useState(false);
//      const [tableData, setTableData] = useState([
//     [ 'Tiger Nixon', 'System Architect' ],
//     [ 'Garrett Winters', 'Accountant' ],
//   ]);
     const [tableData, setTableData] = useState([  ]);

const MenuSwitch=(data)=>{
        setMenu(!menu)

      }
const hideData=()=>{
      // document.querySelectorAll('.form-multi-select-option.form-multi-select-option-with-checkbox')[0].click();
      // document.querySelectorAll('.form-multi-select-option.form-multi-select-option-with-checkbox')[1].click();
      setCategory({
        name:"",
        sexe:"",
        _id:""
      })
      setSexeData([])
      

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
const handleChange=(e)=>{
    if (!Array.isArray(e)) {
      const value =        e.target.type == "file" ? e.target.files[0] : e.target.value;
    setCategory({...category,[e.target.name]:value})

    } else {
    //   setProduct({ ...product, sizes: JSON.stringify(e) });
    //   productFormData.set("sizes", JSON.stringify(e));
    setCategory({...category,"sexe":JSON.stringify(e)})
}    
}
const getData=()=>{

      fetch(`${API_URL}/category/getData/${offset}`,{
    method:"POST",
    headers:{
            "Accept":"application/json",
            "Content-Type":"application/json",
            "authorization":`Bearer ${JSON.parse(localStorage.getItem("user")).token}`

    },
    body:JSON.stringify(searchCategory)
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

const submitCategory=()=>{
    // for (var i = 0; i < sexe.length; i++) {
    //     sexe[i].selected = {value:sexe[i].value,label:sexe[i].label,};
        
    // }

   if(category.name=="" || category.sexe==""){
    toastr.warning("Please all the fields are required !!","Warning",{positionClass:"toast-bottom-right"});
   }
   fetch(`${API_URL}/category/submitCategory`,{
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
      setCategory({
        name:"",
        sexe:""
      })
      
          setSexe([        { value: "Male", label: "Male" },
        { value: "Female", label: "Female" },
])
    getData();
    setSexeData([])


    }else if(res.err){
      toastr.warning(res.err,"Warinig",{positionClass:"toast-bottom-right"})

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
const loadItem=(data)=>{
   
  //  form-multi-select-option form-multi-select-option-with-checkbox form-multi-selected
  // document.querySelectorAll('.form-multi-select-option.form-multi-select-option-with-checkbox')[0].classList.add('form-multi-selected');
  console.log(data.Sexe)
  var sexeData=[]
  var dataS=[]
  for(var i=0;i<data.Sexe.length;i++){
    if(data.Sexe[i]=='Male'){
sexeData.push('Male')    
dataS.push({"value":"Male","label":"Male"})
    }
        if(data.Sexe[i]=='Female'){
 sexeData.push('Female')    
dataS.push({"value":"Female","label":"Female"})

    }
setSexeData(sexeData);
   setCategory({
    name:data.Name,
    sexe:dataS,
    _id:data._id
   })

}
  
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
                <h3 className='fw-bolder'>Categories</h3>
           <div className="container">
            <form action="">
                <div className="row text-center">
                    <div className="col-md mt-2"><input type="text" name="name" onChange={handleChangeSearch} value={searchCategory.name}    placeholder='Name' className="form-control" /></div>
                    <div className="col-md mt-2"><input type="text" name="sexe" onChange={handleChangeSearch} value={searchCategory.sexe}   placeholder='Sexe' className="form-control" /></div>
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
                    <h5>Category Form</h5>
                    <button className="btn-close"  aria-label='close' onClick={hideData} data-bs-dismiss="modal"></button>
                </div>
                <div className="modal-body">
                    <div className="form">
                        <div className="row">
                            <div className="col-md mt-2">
                                <div className="label-control">Name</div>
                                <input type="text" name="name" value={category.name} id="" onChange={handleChange} className="form-control" />
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-md mt-2">
                                <div className="label-control">Sexe</div>
<CMultiSelect
                      options={sexe}
                      value={sexeData}
                      name="sexe"
                      onChange={handleChange}
                    />
                            </div>
                        </div>

<div className="row">
    <div className="col-md mt-2">
        <input type="button" value="Submit" onClick={submitCategory}  className="btn btn-dark" />
    </div>
</div>
                    </div>
                </div>
            </div>
        </div>
    </section>

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

export default Category