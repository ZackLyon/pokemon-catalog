import React, { Component } from 'react'
import Dropdown from '../Dropdown.js'
import request from 'superagent'
import PokeList from '../PokeList/PokeList.js'

import './SearchPage.css'

export default class SearchPage extends Component {
    state = {
        query: '',
        sortBy: 'asc',
        pokeList: [], 
        isLoading: false
    }

    componentDidMount() {
        this.fetchPokemon()
    }

    handleText = (e) => {
        this.setState({query: e.target.value})
    }

    handleSubmit = (e) => {
        e.preventDefault();
        this.fetchPokemon();
    }

    handleSort = (e) => {
        this.setState({sortBy: e.target.value})
    }

    fetchPokemon = async () => {
        
        this.setState({ isLoading: true })
        
        const response = 
        await request.get(`https://pokedex-alchemy.herokuapp.com/api/pokedex?pokemon=${this.state.query}&sort=pokemon&direction=${this.state.sortBy}`)
    
        this.setState({ pokeList: response.body.results, isLoading: false })
    }

    render() {
    
        return (
            <div>
                <div className="form-container">
                    <form onSubmit={this.handleSubmit}>
                        <input onChange={this.handleText} placeholder="Search by Name"/>
                        <Dropdown 
                            options={
                                [{ id:'asc', 
                                key:'asc', name:'Ascending'}, {id:'desc', 
                                key:'desc',
                                name:'Descending'
                            }]} 
                            handleChange={this.handleSort}
                        />
                        <button type="submit">Submit</button>
                    </form>
                    
                </div>
                {
                    this.state.isLoading
                    ? <div><h1>Loading</h1><img src="https://w7.pngwing.com/pngs/506/902/png-transparent-pokemon-omega-ruby-and-alpha-sapphire-pokemon-go-poke-ball-pokemon-go-image-file-formats-circle-symbol.png" alt="pokeball" className="pokeball"></img></div>
                    : <PokeList
                    pokeList={this.state.pokeList}
                    />
                }
                       
            </div>
        
        )
    }
}

