import React, { Component } from 'react'
import Dropdown from '../Dropdown.js'
import request from 'superagent'
import PokeList from '../PokeList/PokeList.js'

import './SearchPage.css'

export default class SearchPage extends Component {
    state = {
        query: '',
        searchBy: 'pokemon',
        sortDirection: 'asc',
        sortBy: 'pokemon',
        pokeList: [], 
        isLoading: false
    }

    //do something on page load
    componentDidMount() {
        this.fetchPokemon()
    }

    handleQuery = (e) => {
        this.setState({query: e.target.value})
    }

    handleSubmit = (e) => {
        e.preventDefault();
        this.fetchPokemon();
    }

    handleSortDirection = (e) => {
        this.setState({sortDirection: e.target.value})
    }
   
    handleSortBy= (e) => {
        this.setState({sortBy: e.target.value})
    }
    
    handleSearchBy= (e) => {
        this.setState({searchBy: e.target.value})
    }

    fetchPokemon = async () => {
        // loading when waiting for results, switch back to not loading on response
        this.setState({ isLoading: true })

        // modify querystring to send back results based on user input stored in state
        const response =  await request.get(`https://pokedex-alchemy.herokuapp.com/api/pokedex?${this.state.searchBy}=${this.state.query}&sort=${this.state.sortBy}&direction=${this.state.sortDirection}`)
    
        this.setState({ pokeList: response.body.results, isLoading: false })
    }

    render() {
        const placeholderString = `Search by ${this.state.searchBy}`

        return (
            <div>
                <div className="form-container">
                    <h1>Pocket</h1>
                    <form onSubmit={this.handleSubmit}>
                        <div className="form-part">{/* search area  */}

                            <input onChange={this.handleQuery} placeholder={placeholderString} className="add-shadow"/>

                            <Dropdown 
                                options={
                                    [
                                        { id:'pokemon', key:'pokemon', name:'Pokemon' }, 
                                        { id:'height', key:'height', name:'Height' }, 
                                        { id:'weight', key:'weight', name:'Weight' }, 
                                        { id:'attack', key:'attack', name:'Attack' }, 
                                        { id:'defense', key:'defense', name:'Defense' }, 
                                        { id:'shape', key:'shape', name:'Shape' }                                    
                                    ]
                                } 
                                handleChange={this.handleSearchBy}
                            />

                        </div>
                        <div className="form-part">

                            <span>Sort by </span>
                            <Dropdown 
                                options={
                                    [
                                        { id:'asc', key:'asc', name:'Ascending' }, 
                                        { id:'desc', key:'desc', name:'Descending' }
                                    ]
                                } 
                                handleChange={this.handleSortDirection}
                            />

                            <Dropdown
                                options={
                                    [
                                        { id:'pokemon', key:'pokemon', name:'Pokemon' }, 
                                        { id:'height', key:'height', name:'Height' }, 
                                        { id:'weight', key:'weight', name:'Weight' }, 
                                        { id:'attack', key:'attack', name:'Attack' }, 
                                        { id:'defense', key:'defense', name:'Defense' }, 
                                        { id:'shape', key:'shape', name:'Shape' }              
                                    ]
                                } 
                                handleChange={this.handleSortBy}
                            />
                        </div>
                        
                        <button type="submit">Submit</button>
                    </form>
                    <h1>Monsters</h1>
                </div>

                {/* render pokemon or loading ball here */}
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
