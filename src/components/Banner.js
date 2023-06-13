import React, { Component } from 'react'
import { movies } from './getMovies'

export default class Banner
    extends Component {
    render() {
        let bannerMovie =  movies.results[0]
        return (
            <>
               { bannerMovie === '' ?
                <div class="spinner-grow" role="status">
                    <span class="visually-hidden">Loading...</span>
                </div>
                :
                <div class="card banner-card">
                    <img class="banner-card-image card-img-top" src={`https://image.tmdb.org/t/p/original${bannerMovie.backdrop_path}`}  alt={bannerMovie.title} />
                    <div class="card-body">
                        <p class="card-title banner-card-title">{bannerMovie.original_title}</p>
                        <p class='card-text banner-card-text'>{bannerMovie.overview}</p>
                    </div>
                </div>
    }
            </>
        )
    }
}
