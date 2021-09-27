import React, { Component } from 'react'
import { Link } from 'react-router-dom'


export default class PokeItem extends Component {
    render() {
        return (
            
            <Link to={`/pokemon/${this.props._id}`}>
                <li className="pokemon-container">
                    <img src={this.props.url_image} alt={this.props.pokemon} className="pokemon-image"></img>
                    <h6 className="pokemon-name">{this.props.pokemon}</h6>
                    <div className="attribute-container">
                        <h6>Attack: {this.props.attack}</h6>
                        <h6>Defense: {this.props.defense}</h6>       
                    </div>
                    <div className="attribute-container">
                        <h6>Height: {this.props.height}</h6>
                        <h6>Weight: {this.props.weight}</h6>       
                    </div>
                    <div className="attribute-container">
                        <h6>Hit Points: {this.props.hp}</h6>
                        <h6>Shape: {this.props.shape}</h6>       
                    </div>
                </li>
            </Link>
        )
    }
}
