import React from "react";
import { useEffect, useState } from "react";
import { Row, Col, Spinner } from "react-bootstrap";
import CommentArea from "./CommentArea";

export default function Details({ match }) {
  useEffect(() => {
    loadMov();
  }, []);
  const [Movie, setMovie] = useState(null);
  const [Loading, setLoading] = useState(false);
  //   fetching selected movie
  const loadMov = async () => {
    setLoading(true);
    try {
      let response = await fetch(
        "https://www.omdbapi.com/?apikey=23ae3a68&i=" + match.params.movieId
      );
      let data = await response.json();
      if (response.ok) {
        setLoading(false);
        setMovie({ data });
        console.log({ data });
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
            <Col xs="8" className="p-5 d-flex flex-wrap">
              <Col xs="12">
                {" "}
                <h2 className="text-white font-weight-light">
                  {Movie.data.Title}
                </h2>
                <hr className="bg-light" />
              </Col>
              <Col xs="6">
                <img src={Movie.data.Poster} alt="" />
              </Col>
              {/* movie details */}
              <Col xs="6" className="text-white d-flex flex-column">
                <p className="font-weight-light">{Movie.data.Plot}</p>
                <small className="font-weight-bold">{Movie.data.Genre}</small>
                <small className="font-weight-bold">
                  <small>Actors: </small>{Movie.data.Actors}
                </small>
                <small className="font-weight-bold">
                  <small>Awards: </small>{Movie.data.Awards}
                </small>
                <small className="font-weight-bold text-muted">
                  Year: {Movie.data.Year}
                </small>

              </Col>
            </Col>
            <CommentArea movieId={match.params.movieId} />
          </Row>
        )
      )}
    </>
  );
}
