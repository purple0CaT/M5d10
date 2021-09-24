import React from "react";
import { Button, Form } from "react-bootstrap";
import { useState } from "react";
import { useHistory } from "react-router";

export default function NewMov() {
  const [NewForm, setNewForm] = useState({ Title: "", Type: "", Year: "" });
  const [Cover, setCover] = useState({ img: "" });
  const history = useHistory();
  //   = MOVIE
  const sendMovie = async (e) => {
    e.preventDefault();
    let url = `${process.env.REACT_APP_URLFETCH}/media`;
    try {
      const response = await fetch(url, {
        method: "POST",
        body: JSON.stringify(NewForm),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();
      if (response.ok) {
        // console.log(data.id);
        sendCover(data.id);
      }
    } catch (err) {
      console.log(err);
    }
  };
  //   SendCover
  const sendCover = async (imgId) => {
    let url = `${process.env.REACT_APP_URLFETCH}/media/${imgId}/poster`;
    let formData = new FormData();
    formData.append("cover", Cover);
    try {
      const resp = await fetch(url, {
        method: "POST",
        body: formData,
        headers: {
          "Context-Type": "multipart/form-data",
        },
      });
      //   const data = await resp.json();
      if (resp.ok) {
        alert("Success");
        history.push("/");
      }
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div className="w-50 mx-auto my-4">
      <Form className="text-white" onSubmit={(e) => sendMovie(e)}>
        <Form.Group controlId="Title">
          <Form.Label>Title</Form.Label>
          <Form.Control
            required
            value={NewForm.Title}
            type="text"
            placeholder="...Title"
            onChange={(e) => setNewForm({ ...NewForm, Title: e.target.value })}
          />
        </Form.Group>
        <Form.Group controlId="Title">
          <Form.Label>Type</Form.Label>
          <Form.Control
            required
            value={NewForm.Type}
            type="text"
            placeholder="...Type"
            onChange={(e) => setNewForm({ ...NewForm, Type: e.target.value })}
          />
        </Form.Group>
        <Form.Group controlId="Title">
          <Form.Label>Year</Form.Label>
          <Form.Control
            required
            value={NewForm.Year}
            type="text"
            placeholder="...Year"
            onChange={(e) => setNewForm({ ...NewForm, Year: e.target.value })}
          />
        </Form.Group>
        <Form.Group className="text-white">
          <Form.File
            required
            className="ml-5"
            id="exampleFormControlFile1"
            label="Image input"
            onChange={(e) => setCover(e.target.files[0])}
          />
        </Form.Group>
        <Button className="mx-auto" type="submit">
          Add movie
        </Button>
      </Form>
    </div>
  );
}
