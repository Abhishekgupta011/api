import React from "react";
import Card from "./Card";
import "./Button.css";
const Button = (props) =>{
    return(
        <Card>
            <button onClick={props.onClick} className="fetch-movie">{props.children}</button>
        </Card>
    )
}

export default Button;