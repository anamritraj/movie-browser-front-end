import React, { Component } from 'react'
import './Movie.css'

export default class Movie extends Component {
    render() {
        let movie = this.props.movie;
        return (
            <div className="col-md-3" onMouseEnter={async (e) => {await setTimeout(this.props.movieClicked(movie, e), 1000)}} onMouseLeave={this.props.hideToolTip}>
                <div className="Movie">
                    <div className="topbar">
                        <p className="year">{movie.title_year}</p>
                        <p className="rating">{movie.content_rating}</p>
                    </div>
                    <div className="title">
                        <h2 className="">{movie.movie_title}</h2>
                    </div>

                    <p className="director">{movie.director_name}</p>
                    <p className="imdb-link"><a target="_blank" href={movie.movie_imdb_link}><i className="fab fa-imdb"></i></a></p>

                </div>
            </div>
        )
    }
}