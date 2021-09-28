import React, { Component } from 'react'
import PokeItem from './PokeItem'
import './PokeList.css'

export default class PokeList extends Component {
    render() {
        return (
            <ul>
                {
                    this.props.pokeList.length === 0
                    ? <div>Loading</div>
                    : this.props.pokeList.map(poke => 
                    <PokeItem 
                        {...poke}
                        key={poke.id}
                    />
                    )
                }
            </ul>
        )
    }
}
