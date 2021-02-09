import React, { useEffect, useContext, useState } from "react";
import {Link} from 'react-router-dom'
import { CTX } from "../redux/Store";
import altImage from './altPhoto.jpg'
import "./Home.css";



export default function Main() {

  const api0 = "0c969276146e480c8c1dc13535eee91b";
  const api1 = "53667b2c9c94402395e550bc490ae98c";
  const api2 = '886f30c32dc448419381a6f81346307e';
  const api3 = '441c1f481434473e863bc7f089e537dd';
  const [allRecipe, dispatch] = useContext(CTX);
  const [searchValue, setSearchValue] = useState("");
  
  useEffect(() => {
   fetch(`https://api.spoonacular.com/recipes/random?number=11&apiKey=${api3}`)
      .then((response) => response.json())
      .then((result) =>
        dispatch({ type: "GET_RECIPE", payload: result.recipes })
      );
    fetch(`https://api.spoonacular.com/recipes/random?number=3&apiKey=${api3}`)
      .then((response) => response.json())
      .then((result) =>
          dispatch({ type: "GET_RANDOM_RECIPE", payload: result.recipes })
      );
  }, []);
  
  const searchMethod = () => {
    console.log(searchValue)
    
  fetch(`https://api.spoonacular.com/recipes/complexSearch?query=${searchValue}&number=11&apiKey=${api3}`)
      .then((response) => response.json())
      .then((result) =>{
        console.log(result)
        dispatch({ type: "GET_RECIPE", payload: result.recipes })}
      );
    }

  return (
      <div>
        <div className="nav">
            <h1 className="navBrand"><Link className="navBrandLink" to='/'>Recipe App</Link></h1>
            <div className="homeSearch">
                <input onChange={(v => setSearchValue(v.target.value))} className="inputStyle" placeholder="Search..." ></input>
                <button onClick={() => searchMethod()} className="searchBtn"> <span> Search </span> </button>
            </div>
        </div>
        
        <div className="mainReceipe">
            <div className="homeReceipe"> {allRecipe.recipeReducer && allRecipe.recipeReducer.recipe && allRecipe.recipeReducer.recipe.map((data, index) => (
                <div key={data.id} id={data.id} style={{ backgroundImage: `url( ${data.image ? data.image : altImage}`}} className="main">
                  <div id={data.id} className="recipe">
                    <header className="header"> 
                      <Link className="linkHeader" to={`/detail/${data.id}`}>{data.title.substring(0,70).split('').length > 70 ? data.title.substring(0,75) + '...' : data.title.substring(0,75)}</Link> 
                    </header>
                    <div dangerouslySetInnerHTML={{__html: data.summary.substring(0,110)+'...'}} className="description"></div>
                  </div>
                </div>
            )) }
          </div>
          
          <div className="popularReceipe">
            <h1>Helpful How To's</h1>
            {allRecipe.recipeReducer && allRecipe.recipeReducer.random && allRecipe.recipeReducer.random.map((data, index) => index < 3 ? (
               <div key={data.id} id={data.id} style={{ backgroundImage: `url( ${data.image ? data.image : altImage}`}} className="popularMain">
                  <div id={data.id} className="popularRecipe">
                    <header className="popularHeader"> 
                      <Link className="linkHeader" to={`/detail/${data.id}`}>{data.title.substring(0,40).split('').length > 40 ? data.title.substring(0,35) + '...' : data.title.substring(0,35)}</Link> 
                    </header>
                    <div dangerouslySetInnerHTML={{__html: data.summary.substring(0,110)+'...'}} className="popularDescription"></div>
                  </div>
                </div> 
            ) : "") }
          </div>
      </div>
    </div>
  );
}
