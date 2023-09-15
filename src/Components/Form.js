import React, { useState } from "react";
import Card from "./Card";
import "./Form.css";
const Form = (props) =>{
    const [title , setTitle] = useState('')
    const [openingtext, setOpeningtext] = useState('')
    const [date , setDate] = useState('')
    const titleHandler = (event)=>{
        setTitle(event.target.value)
    }
    const openingtextHandler = (event)=>{
        setOpeningtext(event.target.value)
    }
    const dateHandler = (event)=>{
        setDate(event.target.value)
    }
    const addMovieHandler = ()=>{
        const newMovieObj = {
            title,
            openingtext,
            date,
        }
        props.onAddMovie(newMovieObj);
    }
    return(
        <Card>
        <label htmlFor="title">Title</label>
        <input type="text" id="title" onChange={titleHandler} value={title}/>
        <label htmlFor="openingtext">Opening Text</label>
        <input type="text" id="openingtext" onChange={openingtextHandler} value={openingtext}/>
        <label htmlFor="date">Release Date</label>
        <input type="text" id="date" onChange={dateHandler} value={date}/>
        <button onClick={addMovieHandler} className="add-movie">Add Movie</button>
        </Card>
    )
}

export default Form;