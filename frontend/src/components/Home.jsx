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
     const [tableData, setTableData] = useState([
    [ 'Tiger Nixon', 'System Architect' ],
    [ 'Garrett Winters', 'Accountant' ],
  ]);
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
                <h3 className='fw-bolder'>Home</h3>

            </div>
        </div>

    </div>
        <section className="py-5">
    <div className="container">

     <DataTable data={tableData} className="display table">
            <thead>
                <tr>
                    <th>Name</th>
                    <th>Position</th>
                </tr>
            </thead>
        </DataTable>
    </div>
    </section>
    </>

  )
}

export default Home