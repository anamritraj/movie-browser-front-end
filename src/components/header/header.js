import React, { Component } from 'react'
import './header.css';

export default class header extends Component {

    constructor(props){
        super(props);
        this.state = {
            navbarOpen : false,
            navbarClasses: "collapse navbar-collapse"
        }
    }

    toggleNavbar = (event) => {
        event.preventDefault();
        let navbarClasses = "";
        if(this.state.navbarOpen){
            navbarClasses = "collapse navbar-collapse";
        }else{
            navbarClasses = "collapse navbar-collapse show";
        }
        let newState = {
            ...this.state,
            navbarOpen: !this.state.navbarOpen,
            navbarClasses: navbarClasses
        }
        this.setState(newState);
    }

    render() {
        return (
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
                <a className="navbar-brand" href="#"><i className="fa fa-film"></i> TWs Movies</a>
                <button className="navbar-toggler" type="button" onClick={this.toggleNavbar} aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div className={this.state.navbarClasses} id="navbarSupportedContent">
                    <form className="form-inline my-2 ml-auto my-lg-0">
                        <input className="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search" />
                        <button className="btn my-2 my-sm-0" type="submit"><i className="fa fa-search"></i></button>
                    </form>
                </div>
            </nav>
        )
    }
}