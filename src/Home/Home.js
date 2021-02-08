import React, { useEffect, useContext, useState } from "react";
import {Link} from 'react-router-dom'
import { CTX } from "../redux/Store";
import "./Home.css";

export default function Main() {

  const api = "0c969276146e480c8c1dc13535eee91b";
  const [allRecipe, dispatch] = useContext(CTX);

  useEffect(() => {
    fetch(`https://api.spoonacular.com/recipes/random?number=11&apiKe=${api}`)
      .then((response) => response.json())
      .then((result) =>
        dispatch({ type: "GET_RECIPE", payload: result.recipes })
      );
  }, []);
  let altImage = "https://external-content.duckduckgo.com/iu/?u=http%3A%2F%2Fcdn-image.myrecipes.com%2Fsites%2Fdefault%2Ffiles%2Fstyles%2F4_3_horizontal_-_1200x900%2Fpublic%2Fbeef-burgundy-stew-sl.jpg%3Fitok%3D310Vkk9y&f=1&nofb=1";
  console.log(allRecipe);

  return (
      <div>
        <div className="nav">
            <h1 className="navBrand"><Link className="navBrandLink" to='/'>Recipe App</Link></h1>
            <div className="homeSearch">
                <input className="inputStyle" placeholder="Search..." ></input>
                <button className="searchBtn"> <span> Search </span> </button>
            </div>
        </div>
        
        <div className="homeReceipe">
        {allRecipe.recipeReducer ? allRecipe.recipeReducer.recipe ? allRecipe.recipeReducer.recipe.map((data, index) => (
                <div key={data.id} id={data.id} style={{ backgroundImage: `url( ${data.image ? data.image : altImage}`}} className="main">
                    <div id={data.id} className="recipe">
                    
                    <header className="header"> 
                        <Link className="linkHeader" to={`/detail/${data.id}`} params={{data: "data"}}>{data.title.substring(0,70).split('').length > 70 ? data.title.substring(0,75) + '...' : data.title.substring(0,75)}</Link> 
                    </header>

                    <div dangerouslySetInnerHTML={{__html: data.summary.substring(0,110)+'...'}} className="description"></div>
                    </div>
                </div>
                )) : "" : ""}
        </div>
      </div>
  );
}
