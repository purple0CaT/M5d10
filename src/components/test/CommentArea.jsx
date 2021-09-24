import { Spinner, Row, Col } from "react-bootstrap";
import React from "react";
import AddComent from "./addComent";
import Comments from "./Comments";
import { useState, useEffect } from "react";

const CommentArea = ({ movieId }) => {
  const [State, setState] = useState({ loading: true, asin: movieId });
  const [CommentsState, setCommState] = useState(null);
  // On load
  useEffect(() => {
    loadComments();
  }, []);
  // Refresh
  useEffect(() => {
    loadComments();
  }, [movieId]);
  // FETCH COMMENTS
  const loadComments = async () => {
    let url = `${process.env.REACT_APP_URLFETCH}/media/${movieId}/reviews`;
    try {
      const response = await fetch(url);
      const data = await response.json();
      if (response.ok) {
        setState({ loading: false });
        setCommState({ data });
      }
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <Col  xs="12" md='4' className="p-5 text-center">
      <h2 className="text-white font-weight-light">Reviews</h2>
      <hr className="bg-light" />
      {State.loading ? (
        <Spinner animation="grow" variant="warning" className="mx-auto" />
      ) : (
        CommentsState &&
        Object.values(CommentsState.data).map((comm) => {
          return (
            <Comments
              _id={comm._id}
              comment={comm.comment}
              rate={comm.rate}
              loadComments={() => loadComments()}
            />
          );
        })
      )}
      <hr />
      <AddComent loadComments={() => loadComments()} asin={movieId} />
    </Col>
  );
};

export default CommentArea;
