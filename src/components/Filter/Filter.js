import React from 'react'
import './Filter.css'

export default (props) => {
    let options = props.options ? props.options.map((val, index) => {
        return <option key={index} val={val}>{val}</option>
    }) : null;
    return (
        <div className="Filter">
            <label htmlFor="">{props.title}</label>
            <select onChange={(e) => props.filterChanged(e.target.value, props.type)} >
                <option value="all">All</option>
                {options}
            </select>
        </div>
    )
}
