import React, { Component } from 'react'
import { movies } from './getMovies'

export default class Banner
    extends Component {
    render() {
        let bannerMovie =  movies.results[0]
        return (
            <>
               { bannerMovie === '' ?
                <div className="spinner-grow" role="status">
                    <span className="visually-hidden">Loading...</span>
                </div>
                :
                <div className="card banner-card">
                    <img className="banner-card-image card-img-top" src={`https://image.tmdb.org/t/p/original${bannerMovie.backdrop_path}`}  alt={bannerMovie.title} />
                    <div className="card-body">
                        <p className="card-title banner-card-title">{bannerMovie.original_title}</p>
                        <p className='card-text banner-card-text'>{bannerMovie.overview}</p>
                    </div>
                </div>
    }
            </>
        )
    }
}
