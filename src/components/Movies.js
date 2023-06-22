import React, { Component } from 'react'
import { movies } from './getMovies'
import axios from 'axios';

export default class Movies extends Component {
    constructor() {
        super()
    
        this.state = {
            hover: '',
            movies: [],
            currPage: 1,
            parr: [1],
            favouritesList:[],
        
        }
    }

    async componentDidMount() {
        this.loadMoviesOnPage()
        this.setState({favouritesList:JSON.parse(localStorage.getItem("favouritesMovieList")||"[]")})
    }
    componentWillUnmount(){
        localStorage.setItem("favouritesMovieList",JSON.stringify(this.state.favouritesList))
    }

    loadMoviesOnPage = async () => {
        let moviesList = await axios.get('https://api.themoviedb.org/3/movie/popular?api_key=5540e483a20e0b20354dabc2d66a31c9&language=en-US&page=' + this.state.currPage)
        console.log(this.state.currPage + "loadMovies")
        this.setState({ movies: [...moviesList.data.results] })
    }

    handleRight = () => {

        if (this.state.currPage < 500) {
            this.setState({
                parr: [...this.state.parr, this.state.parr.length + 1],
                currPage: this.state.currPage + 1
            }, this.loadMoviesOnPage)
        }
        console.log("handleRight" + this.state.currPage)
    }
    handleLeft = () => {

        if (this.state.currPage != 1) {
            this.setState({
                currPage: this.state.currPage - 1
            }, this.loadMoviesOnPage)
        }
        console.log("handleleft" + this.state.currPage)
    }
    handlePageNumberClick = (pageNumber) => {
        if (this.state.currPage != pageNumber) {
            this.setState({
                currPage: pageNumber
            }, this.loadMoviesOnPage)
        }
        console.log("click" + this.state.parr)
    }

    handleFavorites=(movie)=>{
        let favList = this.state.favouritesList
        if(!favList.includes(movie))            
            favList.push(movie)
        else
            favList.splice(favList.indexOf(movie),1) 
        this.setState({favouritesList:favList}) 
    }

    render() {


        return (
            <>
                <h1 className='text-center'><strong>Trending</strong></h1>
                <div className='movies-continer'>
                    {
                        this.state.movies.length == 0 ?
                            <div className="spinner-grow" role="status">
                                <span className="visually-hidden">Loading...</span>
                            </div> :

                            this.state.movies.map((movie) => (
                                <div key={movie.id} className='card movie-card' onMouseEnter={() => { this.setState({ hover: movie.id }) }} onMouseLeave={() => { this.setState({ hover: '' }) }}>
                                    <img className="movie-card-image" src={`https://image.tmdb.org/t/p/original${movie.backdrop_path}`} alt={movie.title} />
                                    <div>
                                        <p className='movie-card-title'>{movie.original_title}</p>
                                        {

                                            (this.state.hover == movie.id) && <button className='btn btn-primary movie-card-button' onClick={()=>{this.handleFavorites(movie)}}>{!this.state.favouritesList.includes(movie) ? "Add to fovourite" : "Remove From Favourites"}</button>

                                        }
                                    </div>
                                </div>
                            ))

                    }


                </div>
                <nav aria-label="Page navigation example">
                    <ul className="pagination" style={{ display: 'flex', justifyContent: 'center' }}>
                        <li className="page-item"><a className="page-link" onClick={this.handleLeft}>Previous</a></li>
                        {
                            this.state.parr.map((value) => (
                                <li key={value} className="page-item"><a className="page-link" onClick={() => {
                
                                    this.handlePageNumberClick(value)
                                }}>{value}</a></li>
                            ))
                        }
                        <li className="page-item"><a className="page-link" onClick={this.handleRight}>Next</a></li>
                    </ul>
                </nav>
            </>
        )
    }
}
