import React from "react";
import { Spinner } from "react-bootstrap";
import { AiFillCloseCircle } from "react-icons/ai";
import { useEffect, useState } from "react";

const Comments = ({ _id, author, comment, rate, asin, loadComments }) => {
  // States
  const [State, setState] = useState({ id: _id, loadDel: false });

  // loaders
  const succDelete = () => {
    return setState({ ...State, loadDel: !State.loadDel });
  };
  const reloadCom = () => {
    return loadComments();
  };

  // delete coment
  const deleteCom = async (e) => {
    succDelete();
    try {
      const response = await fetch(
        "https://striveschool-api.herokuapp.com/api/comments/" + State.id,
        {
          method: "DELETE",
          headers: {
            Authorization:
              "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MTFjZjcwZDJkNTI2MjAwMTViNmRjOTkiLCJpYXQiOjE2Mjk5ODUyNzMsImV4cCI6MTYzMTE5NDg3M30.XnwP2w8HYgNw7WtHh0tP8haV9jofgQ_UQ9xJOsb01C4",
          },
        }
      );
      const data = await response.json();
      succDelete();
      reloadCom();
    } catch (e) {
      succDelete();
      console.error(e);
    }
  };
  return (
    <>
      {
        <div
          key={State.id + rate}
          className="d-flex flex-column comment-bg mb-1 position-relative del-hover"
        >
          <small>Asin: {asin}</small>
          <small className="font-weight-bold">{author}</small>
          <small>{comment}</small>
          <small className="font-weight-bold">
            Rate: {Array.from({ length: rate }).map((x) => "⭐️")}
          </small>
          {State.loadDel && (
            <Spinner
              animation="border"
              variant="danger"
              className="mx-auto text-center"
            />
          )}
          <a className="delete" onClick={() => deleteCom()}>
            {" "}
            <AiFillCloseCircle />{" "}
          </a>
        </div>
      }
    </>
  );
};

export default Comments;
