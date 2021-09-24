import MovieCard from "./MovieCard";
import { Spinner } from "react-bootstrap";
import React from "react";

class GallerieRow extends React.Component {
  state = {
    url: "https://www.omdbapi.com/?apikey=23ae3a68&s=",
    search: this.props.search,
    loading: true,
    library: [],
  };

  // Load Function
  async loadMovie() {
    this.setState({ loading: true });
    try {
      let response = await fetch(this.state.url + this.props.search);
      let data = await response.json();

      this.setState({ library: data.Search, loading: false });
      console.log(this.state.library);
    } catch (err) {
      console.log(err);
    }
  }
  // Deafult Load
  componentDidMount() {
    this.loadMovie();
  }
  componentDidUpdate(prev, prevArr) {
    if (prev.search !== this.props.search) {
      this.loadMovie();
    }
  }
  render() {
    return (
      <div className="row px-3 bg-black mt-3">
        <div className="col-12">
          <h2 className="text-white">{this.props.search}</h2>
        </div>
        {this.state.loading ? (
          <Spinner
            animation="grow"
            variant="warning"
            className="mx-auto my-5"
          />
        ) : (
          this.state.library
            .slice(0, 6)
            .map((mov) => <MovieCard movieId={mov.imdbID} img={mov.Poster} />)
        )}
      </div>
    );
  }
}

export default GallerieRow;
