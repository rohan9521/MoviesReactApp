import React, { Component } from 'react'

export default class Navbar extends Component {
    render() {
        return (
            <div style={{display:"flex" , color: 'green', background: 'black'}}>

                <h1 className="navbar-row">Movies App</h1>
                <h1 className="navbar-row">Favourites</h1>

            </div>
        )
    }
} 
