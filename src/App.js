import React, { Component } from 'react';
import './App.css';
import Header from './components/header/header';
import Movies from './containers/movies/Movies';
import Movie from './components/Movie/Movie';
import MovieTooltip from './components/MovieTooltip/MovieTooltip';
import Toolbar from './containers/ToolBar/Toolbar';
let SERVICE_URL = "http://starlord.hackerearth.com/movieslisting";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      movies: null,
      currentMovie: null,
      display: true,
      toolTipLeft: 10,
      toolTipTop: 100,
      allCountries: null,
      allLanguages: null,
      allRatings: null,
      languageFilter: null,
      countryFilter: null,
      isFetching: true
    }
  }

  fetchData = () => {
    fetch(SERVICE_URL)
      .then(response => response.json())
      .then(result => {
        console.log(result);
        let movies = result.map((movie, index) => {
          return <Movie movie={movie} hideToolTip={this.hideToolTip} movieClicked={this.movieClicked} key={index}></Movie>
        });
        let allRatings = [], allLanguages = [], allCountries = [];
    
        result.forEach(movie => {
          if (allCountries.indexOf(movie.country) === -1 && movie.country != "") {
            allCountries.push(movie.country);
          }
    
          if (allRatings.indexOf(movie.content_rating) === -1 && movie.content_rating != "") {
            allRatings.push(movie.content_rating);
          }
    
          if (allLanguages.indexOf(movie.language) === -1 && movie.language != "") {
            allLanguages.push(movie.language);
          }
        });
    
        
        this.setState({ 
          movies: movies,
          originalMovies: result, 
          isFetching: false,
          currentMovie: null,
          display: true,
          toolTipLeft: 10,
          toolTipTop: 100,
          allCountries,
          allLanguages,
          allRatings,
          languageFilter: null,
          countryFilter: null,
          genreFilter: null
        })
      })
      .catch(e => console.log(e));
  }

  componentDidMount = () => {
    this.fetchData()
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
    if (movieRight + 400 < windowWidth && (movieLeft - 400 > 0)) {
      toolTipLeft = movieRight;
    } else if (movieRight + 400 < windowWidth && (movieLeft - 400 < 0)) {
      toolTipLeft = movieRight;
    }
    else if ((movieRight + 400 > windowWidth) && (movieLeft - 400 > 0)) {
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

  hideToolTip = () => {
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

  filterMovies = (languageFilter, countryFilter, genreFilter) => {
    let movies = this.state.originalMovies;
    let filteredMovies = [];
    movies.forEach(movie => {
      if (languageFilter && countryFilter && genreFilter) {
        if ((movie.language === languageFilter && movie.country === countryFilter && movie.genres.includes(genreFilter))) {
          filteredMovies.push(movie);
        }
      } else if (languageFilter && !countryFilter && !genreFilter) {
        if ((movie.language === languageFilter)) {
          filteredMovies.push(movie);
        }
      }else if (languageFilter && !countryFilter && genreFilter) {
        if ((movie.genres.includes(genreFilter)) && movie.language === languageFilter) {
          filteredMovies.push(movie);
        }
      }else if (languageFilter && countryFilter && !genreFilter) {
        if ((movie.languageFilter === languageFilter) && movie.country === countryFilter) {
          filteredMovies.push(movie);
        }
      } else if (!languageFilter && countryFilter && genreFilter) {
        if (movie.country === countryFilter && (movie.genres.includes(genreFilter))) {
          filteredMovies.push(movie);
        }
      }else if (!languageFilter && !countryFilter && genreFilter) {
        if (movie.genres.includes(genreFilter)) {
          filteredMovies.push(movie);
        }
      } else if (!languageFilter && countryFilter && !genreFilter) {
        if (movie.country === countryFilter) {
          filteredMovies.push(movie);
        }
      } else {
        filteredMovies.push(movie);
      }
    });
    let filteredMovieDivs = filteredMovies.map((movie, index) => {
      return <Movie movie={movie} hideToolTip={this.hideToolTip} movieClicked={this.movieClicked} key={index}></Movie>
    });
    this.setState({
      ...this.state,
      languageFilter,
      countryFilter,
      genreFilter,
      movies: filteredMovieDivs
    })
  }

  filterChanged = (value, type) => {
    switch (type) {
      case "lang":
        if (value === "all") {
          this.filterMovies(null, this.state.countryFilter, this.state.genreFilter);
        } else {
          this.filterMovies(value, this.state.countryFilter, this.state.genreFilter);
        }
        break;
      case "country":
        if (value === "all") {
          this.filterMovies(this.state.languageFilter, null, this.state.genreFilter);
        } else {
          this.filterMovies(this.state.languageFilter, value, this.state.genreFilter);
        }
        break;
      case "genre":
        if (value === "all") {
          this.filterMovies(this.state.languageFilter, this.state.countryFilter, null);
        } else {
          this.filterMovies(this.state.languageFilter, this.state.countryFilter, value);
        }
        break;
      default:
        this.filterMovies();
        break;
    }
  }

  genreClicked = (genre) => {
    this.filterChanged(genre, "genre");
  }

  render() {
    return (
      <div className="App">
        <Header></Header>
        <Toolbar
          filterChanged={this.filterChanged}
          allCountries={this.state.allCountries}
          allLanguages={this.state.allLanguages}
          allRatings={this.state.allRatings}
          genre={this.state.genreFilter}
        ></Toolbar>
        {this.state.isFetching ? 
          <div className="text-center">Loading</div>: 
          <div className="container">
            {
              this.state.movies.length > 0?  
              <Movies movies={this.state.movies}></Movies>:
              <div className="text-center">No results! Please change the filters</div>
            }
          </div>
        }
        <MovieTooltip
          movie={this.state.currentMovie}
          display={this.state.display && this.state.currentMovie}
          toolTipLeft={this.state.toolTipLeft}
          toolTipTop={this.state.toolTipTop}
          hideToolTip={this.hideToolTip}
          preventHide={this.preventHide}
          genreClicked = {this.genreClicked}
        ></MovieTooltip>
      </div>
    );
  }
}

export default App;
