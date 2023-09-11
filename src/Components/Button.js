import React from "react";
import Card from "./Card";
import "./Button.css";
const Button = (props) =>{
    return(
        <Card>
            <button onClick={props.onClick}>{props.children}</button>
        </Card>
    )
}

export default Button;