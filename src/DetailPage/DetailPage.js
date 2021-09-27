import React, { Component } from 'react'
import request from 'superagent'

import './DetailsPage.css'

export default class DetailPage extends Component {
    state = {
        pokemon: [],
        isLoading: false
    }

    fetchPokemon = async () => {
        // loading when waiting for results, switch back to not loading on response
        // const newParam = this.props.match.params.id;
        this.setState({ isLoading: true })

        // modify querystring to send back results based on user input stored in state
        const response =  await request.get(`https://pokedex-alchemy.herokuapp.com/api/pokedex/${this.props.match.params.id}`)
    
        this.setState({ pokemon: response.body, isLoading: false })
    }

    componentDidMount() {
        this.fetchPokemon();
    }

    render() {
        console.log(this.state.pokemon);
        
    

        return (
            <div>
                {
                    this.state.isLoading
                    ? <div><h1>Loading</h1><img src="https://w7.pngwing.com/pngs/506/902/png-transparent-pokemon-omega-ruby-and-alpha-sapphire-pokemon-go-poke-ball-pokemon-go-image-file-formats-circle-symbol.png" alt="pokeball" ></img></div>
                    : <div className="details-container">
                        <img src={this.state.pokemon.url_image} alt={this.state.pokemon.pokemon}></img>
                        <div className="stats-container" style={{backgroundColor: this.state.pokemon.color_1}}>
                            <div>Attack: {this.state.pokemon.attack}</div>
                            <div>Special Attack: {this.state.pokemon.special_attack}</div>
                            <div>Defense: {this.state.pokemon.Defense}</div>
                            <div>Special Defense: {this.state.pokemon.special_defense}</div>
                            <div>Ability 1: {this.state.pokemon.ability_1}</div>
                            {(this.state.pokemon.ability_2 !== "NA")? <div>Ability 2: {this.state.pokemon.ability_1}</div> : false}
                            <div>Hit Points: {this.state.pokemon.hp}</div>
                            <div>Base Experience: {this.state.pokemon.base_experience}</div>
                            <div>Height: {this.state.pokemon.height}</div>
                            <div>Weight: {this.state.pokemon.weight}</div>
                            <div>Shape: {this.state.pokemon.shape}</div>
                        </div>



                    </div>
                }
            </div>
        )
    }
}
