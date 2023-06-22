import React, { Component } from 'react'
import { movies } from './getMovies'
export default class Favourites extends Component {
    constructor() {
        super()
        this.state = {
            genres: [],
            currGenre: 'All Genres',
            favMovies: [],
            seachText: '',
            currPage: 1,
            parr: [],
            currLimit: 1
        }
    }

    componentDidMount() {

        let favMovies = []
        favMovies = JSON.parse(localStorage.getItem("favouritesMovieList") || "[]")
        console.log("localStorage" + favMovies)
        this.setState({ favMovies: [...favMovies] })
        let genreids = {
            28: 'Action', 12: 'Adventure', 16: 'Animation', 35: 'Comedy', 80: 'Crime', 99: 'Documentary', 18: 'Drama', 10751: 'Family', 14: 'Fantasy', 36: 'History',
            27: 'Horror', 10402: 'Music', 9648: 'Mystery', 10749: 'Romance', 878: 'Sci-Fi', 10770: 'TV', 53: 'Thriller', 10752: 'War', 37: 'Western'
        };
        let genresList = []

        favMovies.forEach((movie) => {
            if (!genresList.includes(genreids[movie.genre_ids[0]])) {
                genresList.push(genreids[movie.genre_ids[0]])
            }
        })


        this.setState({
            genres: ["All Genres", ...genresList],
        })
    }

    componentWillUnmount() {
        localStorage.setItem("favouritesMovieList", JSON.stringify(this.state.favMovies || []))
    }

    handleRowSet = (e) => {
        if(e.target.value == 0  )
            return

        this.setState({
            currLimit: e.target.value,
        })

    }

    handleDelete = (movie) => {
        let temp = this.state.favMovies
        temp.splice(temp.indexOf(movie), 1)
        this.setState({ favMovies: temp })
    }

    handleSearchTextChange = (event) => {
        console.log(event.target.value)
        this.setState({ seachText: event.target.value })
    }

    handlePopularitySortAsc(isAsc) {
        let temp = this.state.favMovies

        temp.sort(function (obj1, obj2) {
            return isAsc ? obj1.popularity - obj2.popularity : obj2.popularity - obj1.popularity
        })

        this.setState({ favMovies: temp })

    }

    handleRatingSortAsc(isAsc) {
        let temp = this.state.favMovies

        temp.sort(function (obj1, obj2) {
            return isAsc ? obj1.vote_average - obj2.vote_average : obj2.vote_average - obj1.vote_average
        })

        this.setState({ favMovies: temp })

    }

    handlePageNumberClick = (value) => {
        this.setState({ currPage: value })
    }
    render() {
        let genreids = {
            28: 'Action', 12: 'Adventure', 16: 'Animation', 35: 'Comedy', 80: 'Crime', 99: 'Documentary', 18: 'Drama', 10751: 'Family', 14: 'Fantasy', 36: 'History',
            27: 'Horror', 10402: 'Music', 9648: 'Mystery', 10749: 'Romance', 878: 'Sci-Fi', 10770: 'TV', 53: 'Thriller', 10752: 'War', 37: 'Western'
        };

        let filter = []
        console.log(this.state.favMovies)
        if (this.state.seachText == '') {
            filter = this.state.favMovies
        } else {
            filter = this.state.favMovies.filter((movie) => (
                movie.original_title.toLowerCase().includes(this.state.seachText.toLowerCase())
            ))

        }

        if (this.state.currGenre != 'All Genres') {
            filter = filter.filter((movie) => (
                genreids[movie.genre_ids[0]] == this.state.currGenre
            ))
        }

    

        let startI = (this.state.currPage - 1) * this.state.currLimit
        let endI = (parseInt(startI) + parseInt(this.state.currLimit))

        let parr = []
        let numberOfPages = Math.ceil(filter.length / this.state.currLimit)
        for (let i = 0; i < numberOfPages; i++)
            parr.push(i + 1)

        filter = filter.slice(startI, endI)

        return (
            <>
                <div class="favourite-main">
                    <div class="row">
                        <div class="col-3">
                            <ul class="list-group">

                                {

                                    this.state.genres.map((genre) => (
                                        this.state.currGenre == genre ?
                                            <li class="list-group-item" onClick={() => { this.setState({ currGenre: genre }) }} style={{ background: 'blue', color: 'white' }}>{genre}</li> :
                                            <li class="list-group-item" onClick={() => { this.setState({ currGenre: genre }) }} style={{ background: 'white', color: 'blue' }}>{genre}</li>
                                    ))
                                }
                            </ul>
                        </div>
                        <div class="col">
                            <div class="row">
                                <input className='input-group-text col-6' placeholder='Search' value={this.state.seachText} onChange={(e) => { this.handleSearchTextChange(e) }}></input>
                                <input className='input-group-text col-6' placeholder='Rows' value={this.state.currLimit} type="number" onChange={(e) => { this.handleRowSet(e) }}></input>
                            </div>
                            <div class="row">
                                <table class="col-12 table">
                                    <thead>
                                        <tr>
                                            <th scope="col">Title</th>
                                            <th scope="col" >Genre</th>
                                            <th scope="col" ><i class="fas fa-sort-up" onClick={() => { this.handlePopularitySortAsc(true) }}></i>Popularity<i onClick={() => { this.handlePopularitySortAsc(false) }} class="fas fa-sort-down"></i></th>
                                            <th scope="col" ><i onClick={() => { this.handleRatingSortAsc(true) }} class="fas fa-sort-up"></i>Rating<i onClick={() => { this.handleRatingSortAsc(false) }} class="fas fa-sort-down"></i></th>
                                            <th scope="col" ></th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            filter.map((movie) => (

                                                <tr>
                                                    <td><img src={`https://image.tmdb.org/t/p/original${movie.backdrop_path}`} style={{ width: '5rem' }} alt={movie.original_title} />{movie.original_title}</td>
                                                    <td >{genreids[movie.genre_ids[0]]}</td>
                                                    <td >{movie.popularity}</td>
                                                    <td >{movie.vote_average}</td>
                                                    <td ><button class="btn btn-danger" onClick={() => { this.handleDelete(movie) }}>Delete</button></td>
                                                </tr>
                                            ))
                                        }
                                    </tbody>
                                </table>
                            </div>
                            <nav aria-label="Page navigation example">
                                <ul class="pagination">
                              
                                    {
                                        parr.map((value) => (
                                            <li class="page-item"><a class="page-link" onClick={() => { this.handlePageNumberClick(value) }} >{value}</a></li>
                                        ))
                                    }
                                   
                                </ul>
                            </nav>
                        </div>
                    </div>
                </div>
            </>

        )
    }
}
