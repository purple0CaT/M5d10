import { Spinner, Row, Col } from "react-bootstrap";
import React from "react";
import AddComent from "./addComent";
import Comments from "./Comments";
import { useState, useEffect } from "react";

const CommentArea = ({movieId}) => {
  const [State, setState] = useState({ loading: false, asin: movieId});
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
    setState({ loading: true });
    try {
      const response = await fetch(
        "https://striveschool-api.herokuapp.com/api/comments/" + movieId,
        {
          method: "GET",
          headers: {
            Authorization:
              "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MTFjZjcwZDJkNTI2MjAwMTViNmRjOTkiLCJpYXQiOjE2Mjk5ODUyNzMsImV4cCI6MTYzMTE5NDg3M30.XnwP2w8HYgNw7WtHh0tP8haV9jofgQ_UQ9xJOsb01C4",
          },
        }
      );
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
      <Col xs="4" className="p-5 text-center">
        <h2 className='text-white font-weight-light'>Commentaries</h2>
        <hr className='bg-light'/>
        {State.loading ? (
          <Spinner animation="grow" variant="warning" className="mx-auto" />
        ) : (
          CommentsState &&
          Object.values(CommentsState.data).map((comm) => {
            return (
              <Comments
                _id={comm._id}
                author={comm.author}
                comment={comm.comment}
                rate={comm.rate}
                asin={comm.elementId}
                loadComments={() => loadComments()}
              />
            );
          })
        )}
        <hr />
        <AddComent loadComments={() => loadComments()} asin={State.asin} />
      </Col>
  );
};

export default CommentArea;
