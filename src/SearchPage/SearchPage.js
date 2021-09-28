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
        page: 1,
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

    handleSubmit = async (e) => {
        e.preventDefault();
        await this.setState({page: 1});
        await this.fetchPokemon();
    }

    handleSortDirection = (e) => {
        this.setState({sortDirection: e.target.value})
    }
   
    handleSortBy = (e) => {
        this.setState({sortBy: e.target.value})
    }
    
    handleSearchBy = (e) => {
        this.setState({searchBy: e.target.value})
    }

    handleNextClick = async () => {
        await this.setState({page: this.state.page + 1})
        await this.fetchPokemon();
    }

    handlePrevClick = async () => {
        await this.setState({page: this.state.page - 1})
        await this.fetchPokemon();
    }


    fetchPokemon = async () => {
        // loading when waiting for results, switch back to not loading on response
        this.setState({ isLoading: true })

        // modify querystring to send back results based on user input stored in state
        const response =  await request.get(`https://pokedex-alchemy.herokuapp.com/api/pokedex?${this.state.searchBy}=${this.state.query}&sort=${this.state.sortBy}&direction=${this.state.sortDirection}&page=${this.state.page}&perPage=20`)
    
        this.setState({ pokeList: response.body.results, isLoading: false })

    }

    render() {

        return (
            <div>
                <div className="form-container">
                    <h1>Pocket</h1>
                    <form onSubmit={this.handleSubmit}>
                        <div className="form-part">{/* search area  */}

                            <input onChange={this.handleQuery} placeholder={`Search by ${this.state.searchBy}`} className="add-shadow"/>

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
                <div className="page-navigation">
                    {
                        (this.state.page === 1)
                        ? <button className="inactive-button">Previous</button>
                        : <button onClick={this.handlePrevClick}>Previous</button>
                    }
                    
                    {
                    (this.state.pokeList.length === 20)
                    ? <button onClick={this.handleNextClick}>Next</button>
                    : <button className="inactive-button">Next</button>
                    } 
                    <div>Current Page: {this.state.page}</div>
                        
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
