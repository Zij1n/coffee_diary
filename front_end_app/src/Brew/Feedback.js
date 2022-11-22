import React from "react";
import { useRef } from "react";
import { Button, TextField } from "@mui/material";
import { useNavigate } from "react-router";

const CREATE_URL = "/appendRecord";

export default function Feedback({ recipe }) {
  const feedbackRef = useRef();
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log(recipe);
    // get a new date (locale machine date time)
    const date = new Date();
    // get the date as a string
    const n = date.toDateString();
    // get the time as a string
    const time = date.toLocaleTimeString();

    const record = JSON.stringify({
      Feedback: feedbackRef.current.value,
      recipe: recipe,
      time: n+" "+ time,
    });
    console.log(record);
    await fetch(CREATE_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: record,
    }).catch((error) => {
      window.alert(error);
      return;
    });
    navigate("/");
  };

  return (
    <div>
      {" "}
      <TextField
        fullWidth
        id="outlined-multiline-static"
        label="How is your coffee?"
        multiline
        rows={4}
        inputRef={feedbackRef}
        defaultValue="Great!"
      />
      <Button variant="contained" onClick={handleSubmit}>
        Submit
      </Button>
    </div>
  );
}
