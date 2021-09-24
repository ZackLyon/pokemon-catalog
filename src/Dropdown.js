import React, { Component } from 'react'

export default class Dropdown extends Component {
    render() {
        return (
            <select onChange={this.props.handleChange} className="add-shadow">
                {
                    this.props.options.map(item => <option key={item.key} value={item.id}>{item.name}</option>)
                }
            </select>
        )
    }
}
