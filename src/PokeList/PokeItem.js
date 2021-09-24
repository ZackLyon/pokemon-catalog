import React, { Component } from 'react'


export default class PokeItem extends Component {
    render() {
        return (
            <li className="pokemon-container">
                <img src={this.props.url_image} alt={this.props.pokemon} className="pokemon-image"></img>
                <h6 className="pokemon-name">{this.props.pokemon}</h6>
            </li>
        )
    }
}
