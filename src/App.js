import React, { useState } from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import { Navbar, Sidebar, Footer } from './components'
import { About, Cart, Checkout, Error, Home, PrivateRoute, Products, SingleProduct } from './pages'

function App() {
  return (
    <Footer values>
      <Router>

        <h5>comfy sloth starter starter</h5>
      </Router>
    </Footer>
  )
}


export default App
