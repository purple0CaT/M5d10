import React from "react";
import { useEffect, useState } from "react";
import { Row, Col, Spinner } from "react-bootstrap";
import CommentArea from "./CommentArea";

export default function Details({ match }) {
  useEffect(() => {
    loadMov();
  }, []);
  const [Movie, setMovie] = useState(null);
  const [Loading, setLoading] = useState(true);
  const [moviesId, setmoviesId] = useState(match.params.movieId);
  //   fetching selected movie
  const loadMov = async () => {
    let url = `${process.env.REACT_APP_URLFETCH}/media/`;
    try {
      let response = await fetch(url + moviesId);
      let data = await response.json();
      if (response.ok) {
        setLoading(false);
        console.log(data);
        setMovie({ data: data[0] });
      }
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <>
      {Loading ? (
        <Spinner
          animation="grow"
          variant="warning"
          className="d-block m-auto"
        />
      ) : (
        Movie && (
          <Row>
            <Col xs="12" md="8" className="p-5 d-flex flex-wrap h-100">
              <Col xs="12">
                {" "}
                <h2 className="text-white font-weight-light">
                  {Movie.data.Title}
                </h2>
                <hr className="bg-light" />
              </Col>
              <Col xs="12" md="6" className="h-100">
                <img src={Movie.data.Poster} className="w-75" alt="" />
              </Col>
              {/* movie details */}
              <Col xs="12" md="6" className="text-white d-flex flex-column">
                <p className="font-weight-light">{Movie.data.Plot}</p>
                <small className="font-weight-bold">{Movie.data.Genre}</small>
                <small className="font-weight-bold">
                  <small>Actors: </small>
                  {Movie.data.Actors}
                </small>
                <small className="font-weight-bold">
                  <small>Awards: </small>
                  {Movie.data.Awards}
                </small>
                <small className="font-weight-bold text-muted">
                  Year: {Movie.data.Year}
                </small>
                <a
                  href={`${process.env.REACT_APP_URLFETCH}/media/${moviesId}/pdf`}
                  className="btn btn-dark my-auto"
                >
                  Download PDF
                </a>
              </Col>
            </Col>
            <CommentArea movieId={moviesId} />
          </Row>
        )
      )}
    </>
  );
}
