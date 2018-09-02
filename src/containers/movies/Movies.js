import React, { Component } from 'react'
import Movie from '../../components/Movie/Movie';
import MovieData from '../../data.json'
import MovieTooltip from '../../components/MovieTooltip/MovieTooltip';
export default class Movies extends Component {
    constructor(props){
        super(props);
        this.state = {
            currentMovie: null,
            display: true,
            toolTipLeft: 10,
            toolTipTop: 100 
        }
    }

    movieClicked = (movie, event) => {
        let clientRect = event.target.getBoundingClientRect();
        let windowWidth = window.innerWidth,
            windowHeight = window.innerHeight,
            movieTop = clientRect.top,
            movieLeft = clientRect.left,
            movieRight = clientRect.right,
            movieBottom = clientRect.bottom,
            toolTipLeft, toolTipTop;
        
        // Handle X position of ToolTip
        if(movieRight + 400 < windowWidth && (movieLeft - 400 > 0)){
            toolTipLeft = movieRight;
        }else if(movieRight + 400 < windowWidth && (movieLeft - 400 < 0)){
            toolTipLeft = movieRight;
        }
        else if((movieRight + 400 > windowWidth) && (movieLeft - 400 > 0)){
            toolTipLeft = movieLeft - 400;
        }

        // Handle Y position of ToolTip
        toolTipTop = movieTop + (movieBottom - movieTop) / 2;

        let newState = {
            ...this.state,
            display: true,
            toolTipLeft: parseInt(toolTipLeft),
            toolTipTop: parseInt(toolTipTop + document.documentElement.scrollTop),
            currentMovie: movie
        }
        this.setState(newState);
    }

    hideToolTip= () => {
        let newState = {
            ...this.state,
            display: false
        }
        this.setState(newState);
    }

    preventHide = () => {
        let newState = {
            ...this.state,
            display: true
        }
        this.setState(newState);
    }
    render() {
        let movies = MovieData.map((movie,index) => {
            return <Movie movie={movie} hideToolTip={this.hideToolTip} movieClicked={this.movieClicked} key={index}></Movie>
        })
        return (
            <div className="row" onScroll={this.hideToolTip}>
                {movies}
                
                <MovieTooltip 
                    movie={this.state.currentMovie} 
                    display={this.state.display && this.state.currentMovie}
                    toolTipLeft={this.state.toolTipLeft}
                    toolTipTop={this.state.toolTipTop}
                    hideToolTip={this.hideToolTip}
                    preventHide={this.preventHide}
                ></MovieTooltip>
            </div>
        )
    }
}
