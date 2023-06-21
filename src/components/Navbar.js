import React, { Component } from 'react'
import { Link } from 'react-router-dom'

export default class Navbar extends Component {
    render() {
        return (
            <div style={{display:"flex" , color: 'blue', background: 'white'}}>

                <Link to="/" style={{textDecoration:'none'}}><h1  className="navbar-row">Movies App</h1></Link>
                <Link to="/favourites" style={{textDecoration:'none'}}><h1 className="navbar-row">Favourites</h1></Link>

            </div>
        )
    }
} 
