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
            </nav>
        )
    }
}