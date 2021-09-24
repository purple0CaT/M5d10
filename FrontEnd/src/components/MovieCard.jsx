import React from "react";
import { Link } from "react-router-dom";
// import { Col,Card,Button } from "react-bootstrap";
class MovieCard extends React.Component {
  state = {
    showCom: false,
  };
  // set to show
  setShow() {
    this.setState({ showCom: true });
  }

  handleCallback = (childData) => {
    this.setState({ showCom: childData });
  };

  render() {
    return (
      <>
        <Link to={'/details/'+this.props.movieId}
          className="col-2 my-3"
          key={this.props.movieId}
          value={this.props.movieId}
          onClick={() => {
            this.setState({ showCom: true });
          }}
        >
          <div className="movieCard h-100">
            <img className="w-100" src={this.props.img} />
          </div>
        </Link>

      </>
    );
  }
}

export default MovieCard;
