import { Button, Alert, Spinner, Form } from "react-bootstrap";
import React from "react";
import { useEffect, useState } from "react";

const AddComent = ({ asin, bookName, loadComments }) => {
  // STATES
  const [CommentSend, setCommentSend] = useState({
    comment: "",
    rate: 1,
    elementId: asin,
  });
  const [State, setState] = useState({
    loadSend: false,
    sendSuccess: false,
    loadWarn: false,
    err: null,
  });
  // FUNCTIONS
  //   INPUT COMMENT
  const comentInput = (e, comentNam) => {
    setCommentSend({
      ...CommentSend,
      [comentNam]: e.target.value,
    });
  };
  // Sending alerts
  const success = () => {
    setState({ ...State, loadSend: !State.loadSend });
  };
  const sendSuccess = () => {
    setState({ ...State, sendSuccess: !State.sendSuccess });
  };
  const sendingAlert = () => {
    setState({ ...State, sendSuccess: !State.sendSuccess });
  };
  // load Send alerts
  const loadAlert = () => {
    setState({ ...State, loadSend: !State.loadSend });
  };
  // warning
  const loadWarn = (error) => {
    console.log(error);
    setState({
      ...State,
      loadWarn: true,
      err: error.status + " " + error.statusText,
    });
  };
  // Set empty
  const emptyVal = () => {
    setCommentSend({
      ...CommentSend,
      author: "",
      comment: "",
      rate: 1,
      elementId: asin,
    });
  };

  //   SEND COMMENTS
  const sendComment = async (e) => {
    e.preventDefault();
    loadAlert();
    let url = `${process.env.REACT_APP_URLFETCH}/media/${asin}/reviews`;
    try {
      const response = await fetch(url, {
        method: "POST",
        body: JSON.stringify(CommentSend),
      });
      if (response.ok) {
        loadComments();
        setState({ ...State, loadSend: false });
        emptyVal();
      } else {
        loadWarn(response);
      }
    } catch (error) {
      console.log(error);
      loadWarn();
      emptyVal();
      loadAlert();
    }
  };
  return (
    <>
      {/* FORM */}
      {
        <form className="text-white" onSubmit={sendComment} key={asin + 123}>
          <Form.Group>
            <Form.Label>Review</Form.Label>
            <Form.Control
              type="text"
              placeholder="...comment"
              value={CommentSend.comment}
              onChange={(e) => {
                setCommentSend({ ...CommentSend, comment: e.target.value });
              }}
              required
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Rate</Form.Label>
            <Form.Control
              type="number"
              placeholder="...rate"
              value={CommentSend.rate}
              onChange={(e) => {
                setCommentSend({ ...CommentSend, rate: e.target.value });
              }}
              required
            />
          </Form.Group>

          {State.loadSend ? (
            <Spinner animation="border" variant="warning" />
          ) : State.sendSuccess ? (
            <Alert variant="success" className="mt-2">
              Succes
            </Alert>
          ) : (
            <>
              <Button type="submit" variant="success" className="mt-2">
                {" "}
                Send
              </Button>
              {State.loadWarn && (
                <Alert variant="warning" className="mt-2">
                  {State.err}
                </Alert>
              )}
            </>
          )}
        </form>
      }
    </>
  );
};

export default AddComent;
