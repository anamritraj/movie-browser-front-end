import React, { Component } from 'react'
import Movie from '../../components/Movie/Movie';
import MovieData from '../../data.json'
export default class Movies extends Component {
    
    movieClicked = () => {
        console.log("Hi there!");    
    }
    render() {
        let movies = MovieData.map((movie,index) => {
            return <Movie movie={movie} movieClicked={this.movieClicked} key={index}></Movie>
        })
        return (
            <div className="row">
                {movies}
            </div>
        )
    }
}
