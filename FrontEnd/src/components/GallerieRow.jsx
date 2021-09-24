import MovieCard from "./MovieCard";
import { Spinner } from "react-bootstrap";
import React from "react";

class GallerieRow extends React.Component {
  state = {
    search: this.props.search,
    loading: true,
    library: [],
  };

  // Load Function
  async loadMovie() {
    let url = this.props.search
      ? `${process.env.REACT_APP_URLFETCH}/media/search/?t=${this.props.search}`
      : `${process.env.REACT_APP_URLFETCH}/media/`;
    try {
      let response = await fetch(url);
      let data = await response.json();

      this.setState({ library: data, loading: false });
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
          this.state.library.map((mov) => (
            <MovieCard movieId={mov.imdbID} img={mov.Poster} />
          ))
        )}
      </div>
    );
  }
}

export default GallerieRow;
