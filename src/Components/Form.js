import React, { useState } from "react";
import Card from "./Card";
import "./Form.css";


const Form = (props) => {
  const [title, setTitle] = useState("");
  const [openingtext, setOpeningtext] = useState("");
  const [date, setDate] = useState("");

  const titleHandler = (event) => {
    setTitle(event.target.value);
  };

  const openingtextHandler = (event) => {
    setOpeningtext(event.target.value);
  };

  const dateHandler = (event) => {
    setDate(event.target.value);
  };

  const addMovieHandler = async () => {
    try {
      const newMovieObj = {
        title,
        openingtext,
        date,
      };
      console.log("Add Movie button clicked");
      const response = await fetch(
        "https://react-api12-default-rtdb.firebaseio.com/movies.json",
        {
          method: "POST",
          body: JSON.stringify(newMovieObj),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        throw new Error("Failed to add the movie.");
      }

      // Clear input fields after successful addition
      setTitle("");
      setOpeningtext("");
      setDate("");

      // Trigger a function to update the movie list
      props.onAddMovie(newMovieObj);
    } catch (error) {
      console.error("Error adding movie:", error);
    }
  };

  return (
    <Card>
      <label htmlFor="title">Title</label>
      <input type="text" id="title" onChange={titleHandler} value={title} />
      <label htmlFor="openingtext">Opening Text</label>
      <input
        type="text"
        id="openingtext"
        onChange={openingtextHandler}
        value={openingtext}
      />
      <label htmlFor="date">Release Date</label>
      <input type="text" id="date" onChange={dateHandler} value={date} />
      <button onClick={addMovieHandler} className="add">
        Add Movie
      </button>
    </Card>
  );
};

export default Form;
