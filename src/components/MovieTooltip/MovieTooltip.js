import React from 'react'
import './MovieTooltip.css'
export default ({ movie, display, toolTipLeft, toolTipTop, preventHide, hideToolTip }) => {
    let movieElement = null;
    if (movie) {
        let movieGeneres = movie.genres,
            movieGenresArray = movieGeneres.split("|").map((val, index) => {
                return val;
            }),
            styles = {
                opacity: display? 1 : 0,
                left: toolTipLeft + "px",
                top: toolTipTop + "px"
            };
        movieElement = <div className="MovieTooltip" style={styles} onMouseEnter={preventHide} onmouseleave={hideToolTip}>
            <h2>
                <a href={movie.movie_imdb_link} target="_blank">{movie.movie_title}</a>
                {movie.title_year ? <span>({movie.title_year})</span> : null}
            </h2>
            <p className="top-details">
                {movie.content_rating ? <span>{movie.content_rating}</span> : null}
                {movie.language ? <span>{movie.language}</span> : null}
                {movie.country ? <span>{movie.country}</span> : null}
                {movie.budget ? <span>${parseInt(movie.budget).toLocaleString('en')}</span> : null}
            </p>
            <p>Genre: {movieGenresArray.map((val) => { return val + ", " })}</p>
            {movie.actor_1_name || movie.actor_2_name ? <p>Actors: {movie.actor_1_name}, {movie.actor_2_name}</p> : null}
            {movie.director_name ? <p>Director: {movie.director_name}</p> : null}
        </div>;
    }
    return (
        movieElement
    )
}
