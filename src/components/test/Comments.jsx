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
    return loadComments;
  };

  // delete coment
  const deleteCom = async (e) => {
    succDelete();
    let url = `${process.env.REACT_APP_URLFETCH}/media/${_id}/reviews`;
    try {
      const response = await fetch(url, {
        method: "DELETE",
      });
      const data = await response.json();
      if (response.ok) {
        // reloadCom();
        return loadComments();
      }
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
          className="d-flex flex-column comment-bg mb-1 position-relative del-hover comment"
        >
          <small className="font-weight-bold">{author}</small>
          <p className="m-0">{comment}</p>
          <small className="font-weight-bold">
            Rate:{" "}
            {Array.from({ length: rate }).map((x) => (rate > 2 ? "⭐️" : "🍅"))}
          </small>
          <small>Asin: {asin}</small>
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
