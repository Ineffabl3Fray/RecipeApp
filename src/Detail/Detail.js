import React, { useContext, useEffect } from "react";
import {Link} from 'react-router-dom'
import {CTX} from '../redux/Store'
import './Detail.css'
import alarmclock from './alarmclock.svg'
import oksvg from './ok.svg'
import altImage from '../Home/altPhoto.jpg'

export default function Detail(props) {
    const id = props && props.match && props.match.params && props.match.params.id;
    const api0 = "0c969276146e480c8c1dc13535eee91b";
    const api1 = "0c969276146e480c8c1dc13535eee91b";
    const api2 = '886f30c32dc448419381a6f81346307e';
    const api3 = '441c1f481434473e863bc7f089e537dd';
    const [recipe, dispatch] = useContext(CTX);
    
    useEffect(() => {
        fetch(`https://api.spoonacular.com/recipes/${id}/information?apiKey=${api3}`)
        .then((response) => response.json())
        .then((result) =>
            dispatch({ type: "GET_RECIPE_DETAIL", payload: result })
        );
    },[])

    const detailRecipe = recipe && recipe.recipeReducer && recipe.recipeReducer.detail
    console.log(detailRecipe)
    
    return (
        <div id='mainDetail'>
            <div id="navDetail">
                <div id="navBrandDetail"><Link id="navBrandLinkDetail" to='/'>Explore Recipe App</Link></div>
                <div id="linkDetailDiv">
                    <Link id="homeLinkDetail" to='/'>Home </Link>
                    <span id="arrowSpan"> > </span>
                    <Link id="homeLinkDetail" to={`/detail/${id}`}>Recipe App</Link>
                </div>
            </div>

            <div id="detailBody">
                <h1 id='recipeHeader'> {detailRecipe && detailRecipe.title && detailRecipe.title} </h1>
                
                <div id='mainDescription'> <p id='recipeDescription' dangerouslySetInnerHTML={{__html: detailRecipe && detailRecipe.summary && detailRecipe.summary + '.'}}/></div>

                <div id='mainImgDetail'>
                    <img id='imgDetaill' src={detailRecipe && detailRecipe.image ? detailRecipe.image : altImage} alt="a"/>
                    <div id='serveTime'>
                        <img id='alarmClock' src={alarmclock} alt='a'/>
                        <p id='serveTimeActive'>Health Score: {detailRecipe && detailRecipe.healthScore && detailRecipe.healthScore}</p>
                        <p id='serveTimeTotal'>Total: {detailRecipe && detailRecipe.readyInMinutes && detailRecipe.readyInMinutes} min.</p>
                        <p id='serveTimeServings'>Servings: {detailRecipe && detailRecipe.servings && detailRecipe.servings}</p>
                    </div>
                </div>

                <div id='detailLine'></div>
                <h1 id='h1IngredientsDetail'>Ingredients</h1>

                {detailRecipe && detailRecipe.extendedIngredients && detailRecipe.extendedIngredients.map(value => (
                    <div id='ingredientsDetail'>
                            <img id='okSvg' src={oksvg} alt='a'/>
                            <p id='pIngredientsDetail'> {value.original} </p>
                    </div> 
                ))}

                <div id='detailLine'></div>
                <h1 id='h1DirectionsDetail'>Directions</h1>
                <div id='directionsDetail'> <p id='pDirectionsDetail' dangerouslySetInnerHTML={{__html: detailRecipe && detailRecipe.instructions && detailRecipe.instructions}}></p> </div>
            </div>
         
        </div>
    );
}


