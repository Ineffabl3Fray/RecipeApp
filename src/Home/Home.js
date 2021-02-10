import React, { useEffect, useContext, useState } from "react";
import {Link} from 'react-router-dom'
import Footer from '../Footer/Footer'
import { CTX } from "../redux/Store";
import altImage from './altPhoto.jpg'
import "./Home.css";


let arrPagination = [];
let page = 0;
let pageCount = 10;

export const api = ["0c969276146e480c8c1dc13535eee91b", "53667b2c9c94402395e550bc490ae98c", '886f30c32dc448419381a6f81346307e', '2719180f54774ace8657df2e69271c33', '441c1f481434473e863bc7f089e537dd', 'c529d3a0548342cbb71b458dbe8a69cd', 'a187cff7c5dc4744b8aba1f594b1c11c', 'f09d13989f1a46bdb84b03efc21dd062', '00efc59416df49ec81c330f69eef7f90', '80ee69d4cf404e6d95d5d59c5e74d938' ]

export default function Main() {
  let defaultSummary = ` might be just the main course you are searching for. This gluten free recipe...`;


  const [allRecipe, dispatch] = useContext(CTX);
  const [searchValue, setSearchValue] = useState("");
  const [btnBgColor, setbtnBgColor] = useState(1);
  
  const chancePage = (value) => {
    setbtnBgColor(value + 1)
    page = value * 10;
    pageCount = (value * 10) + 10;
    dispatch({ type: " "})
  }

  const getMainRecipe = (count) => {
    page === 0 && fetch(`https://api.spoonacular.com/recipes/random?number=100&apiKey=${api[count]}`)
    .then((response) => {
      if (response.ok) {
        return response.json()
      }
      else{
        count = count + 1;
        count < api.length && getMainRecipe(count)
      }} )
    .then((result) =>{
      dispatch({ type: "GET_RECIPE", payload: result && result.recipes ? result.recipes : "" })}
    );
  }

  const getPopularRecipe = (count) => {
    page === 0 && fetch(`https://api.spoonacular.com/recipes/random?number=3&apiKey=${api[count]}`)
    .then((response) => {
      if (response.ok) {
        return response.json()
      }
      else{
        count = count + 1
        count < api.length && getPopularRecipe(count)
      }
    })
    .then((result) =>
        dispatch({ type: "GET_RANDOM_RECIPE", payload: result && result.recipes ? result.recipes : "" })
    );
  }

  const searchMethod = () => {
    fetch(`https://api.spoonacular.com/recipes/complexSearch?query=${searchValue}&number=11&apiKey=${api[3]}`)
      .then((response) => response.json())
      .then((result) =>{
        dispatch({ type: "GET_RECIPE", payload: result.results })}
      );
  }
  
  useEffect(() => {
    getMainRecipe(0)
    getPopularRecipe(0)
  
  }, []);

    arrPagination = [];
    arrPagination = [1,2,3,4,5,6,7,8,9,10]

  return (
      <div className='home'>
        <div className="nav">
            <h1 className="navBrand"><Link className="navBrandLink" to='/'>Recipe App</Link></h1>
            <div className="homeSearch">
                <input onChange={(v => setSearchValue(v.target.value))} className="inputStyle" placeholder="Search..." ></input>
                <button onClick={() => searchMethod()} className="searchBtn"> <span> Search </span> </button>
            </div>
        </div>
        
        <div className="mainReceipe">
            <div className="homeReceipe"> {allRecipe.recipeReducer && allRecipe.recipeReducer.recipe && allRecipe.recipeReducer.recipe.map((data, index) => index >= page ? index < pageCount ? 
            (
                <div key={data.id} id={data.id} style={{ backgroundImage: `url( ${data.image ? data.image : altImage}`}} className="main">
                  <div id={data.id} className="recipe">
                    <header className="header"> 
                      <Link className="linkHeader" to={`/detail/${data.id}`}>{data.title.split('').length > 55 ? data.title.substring(0,55) + '...' : data.title}</Link> 
                    </header>
                    <div dangerouslySetInnerHTML={{__html: data.summary ? data.summary.substring(0,110)+'...' : data.title + defaultSummary}} className="description"></div>
                  </div>
                </div>
            ) : "" : "")}
          </div>
          
          <div className="popularReceipe">
            <h1>Helpful How To's</h1>
            {allRecipe.recipeReducer && allRecipe.recipeReducer.random && allRecipe.recipeReducer.random.map((data, index) => index < 3 ? (
               <div key={data.id} id={data.id} style={{ backgroundImage: `url( ${data.image ? data.image : altImage}`}} className="popularMain">
                  <div id={data.id} className="popularRecipe">
                    <header className="popularHeader"> 
                      <Link className="linkHeader" to={`/detail/${data.id}`}>{data.title.split('').length > 40 ? data.title.substring(0,40) + '...' : data.title}</Link> 
                    </header>
                    <div dangerouslySetInnerHTML={{__html: data.summary.substring(0,80)+'...'}} className="popularDescription"></div>
                  </div>
                </div> 
            ) : "") }
            </div>
          </div>
              
        <div className='mainPagination'>
          {
            arrPagination.map((i) => (
              <button key={i} style={{backgroundColor: btnBgColor === i && 'rgb(252, 7, 7)'}} className={'pagination'} id={i - 1} onClick={(v) => {chancePage(i - 1)}}>{i}</button>
            ))
          }
        </div>
        <Footer></Footer>
      </div>
  );
}
