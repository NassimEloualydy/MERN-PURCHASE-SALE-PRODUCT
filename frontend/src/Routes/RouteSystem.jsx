import {BrowserRouter as Router,Route,Routes} from 'react-router-dom'
import Register from '../components/Register'
import Login from '../components/Login'
import React from 'react'
import Home from '../components/Home'
import PrivateRoute from './PrivateRoute'
import Category from '../components/Category'
import Product from '../components/Product'
import ProductDetails from '../components/ProductDetails'
import Paiment from '../components/Paiment'
const RouteSystem = () => {
  return (
    <div>
      <Router>
        <>
        <Routes>
            <Route path="" element={<Home/>} />
            <Route path="/Register" element={<Register/>} />
            <Route path="/Login" element={<Login/>} />
            <Route element={<PrivateRoute/>}>
              <Route path="/Category" element={<Category/>} />
            </Route>
            <Route element={<PrivateRoute/>}>
              <Route path="/Product" element={<Product/>} />
            </Route>
            <Route element={<PrivateRoute/>}>
              <Route path="/ProductDetails" element={<ProductDetails/>} />
            </Route>

            <Route element={<PrivateRoute/>}>
              <Route path="/Paiment" element={<Paiment/>} />
            </Route>
            

{/*             
            <Route element={<PrivateRoute/>}>
              <Route path="/Product" element={<Product/>} />
            </Route>
            <Route element={<PrivateRoute/>}>
              <Route path="/ProductInfo/:_id" element={<ProductInfo/>} />
            </Route>
            <Route element={<PrivateRoute/>}>
              <Route path="/Paiment/" element={<Paiment/>} />
            </Route>
            <Route element={<PrivateRoute/>}>
              <Route path="/Checkout/" element={<Checkout/>} />
            </Route>

            <Route element={<PrivateRoute/>}>
              <Route path="/Orders/" element={<Orders/>} />
            </Route> */}

        </Routes>
        </>
      </Router>
    </div>
  )
}

export default RouteSystem