import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
// import Navbar from './components/Nav.jsx'
import Card from './components/CardMenu.jsx'
import 'bootstrap/dist/css/bootstrap.min.css';




ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    {/* <Navbar/> */}
    <App />
    <Card/>
  </React.StrictMode>,
)
