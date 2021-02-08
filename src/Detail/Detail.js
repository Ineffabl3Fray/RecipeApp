import React, { useContext, useEffect } from "react";
import {CTX} from '../redux/Store'
import './Detail.css'

export default function Detail(props) {
    const id = props.match.params.id;
    const api = "0c969276146e480c8c1dc13535eee91b";
    const [recipe, dispatch] = useContext(CTX);
    
    useEffect(() => {
        fetch(`https://api.spoonacular.com/recipes/${id}/information?apiKe=${api}`)
        .then((response) => response.json())
        .then((result) =>
            dispatch({ type: "GET_RECIPE_DETAIL", payload: result })
        );
    },[])
    console.log(recipe)
    return (
        <div className='mainDetail'>
            <div>
                aa
            </div>
        </div>
    );
}


