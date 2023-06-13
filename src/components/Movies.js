import React, { Component } from 'react'
import { movies } from './getMovies'


export default class Movies extends Component {
    constructor() {
        super()
        this.state = {
            hover: '',
            parr : [1]
        }
    }

    render() {
        let moviesList = movies.results

        return (
            <>
                <h1 className='text-center'><strong>Trending</strong></h1>

                <div className='movies-continer'>
                    {

                        moviesList.length == 0 ?
                            <div class="spinner-grow" role="status">
                                <span class="visually-hidden">Loading...</span>
                            </div> :

                            moviesList.map((movie) => (
                                <div className='card movie-card' onMouseEnter={() => { this.setState({ hover: movie.id }) }} onMouseLeave={()=>{this.setState({hover:''})}}>
                                    <img className="movie-card-image" src={`https://image.tmdb.org/t/p/original${movie.backdrop_path}`} alt={movie.title} />
                                    <div>
                                        <p className='movie-card-title'>{movie.original_title}</p>
                                        {
                                            
                                                (this.state.hover == movie.id) && <button className='btn btn-primary movie-card-button'>Add to fovourite</button>
                                        
                                        }
                                    </div>
                                </div>
                            ))

                    }


                </div>
                <nav aria-label="Page navigation example">
                    <ul class="pagination" style={{ display: 'flex', justifyContent: 'center' }}>
                        <li class="page-item"><a class="page-link" href="#">Previous</a></li>
                        {
                            this.state.parr.map((value)=>(
                                <li class="page-item"><a class="page-link" href="#">{value}</a></li>
                            ))
                        }
                        <li class="page-item"><a class="page-link" href="#">Next</a></li>
                    </ul>
                </nav>
            </>
        )
    }
}
