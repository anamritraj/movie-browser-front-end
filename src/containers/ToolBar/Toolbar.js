import React, { Component } from 'react'
import Filter from '../../components/Filter/Filter';
import './Toolbar.css'
export default class Toolbar extends Component {
    render() {
        return (
            <div className="container-fluid">
                <div className="Toolbar">
                    <Filter filterChanged={this.props.filterChanged} type="lang" options={this.props.allLanguages} title="Language"></Filter>
                    <Filter filterChanged={this.props.filterChanged} type="country" options={this.props.allCountries} title="Country"></Filter>
                </div>
            </div>
        )
    }
}
