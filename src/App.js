import React from "react";
import { useState, useEffect } from "react";
import TinderCard from 'react-tinder-card'
import "./App.css";

function App() {
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saved, setSaved] = useState([]);


  useEffect(() => {
    const fetchRecipe = async () => {
      const res = await fetch(
        "https://www.themealdb.com/api/json/v1/1/random.php"
      );
      const data = await res.json();
      setRecipes(recipes => recipes.concat(data));
    };
    
    if(loading && recipes.length < 100){
      fetchRecipe();
      console.log(recipes);
    }else{
      setLoading(false);
    }
  },[loading, recipes]);

  const swiped = (dir, data) => {
    if (dir === 'right') {
      setSaved(saved => saved.concat(data));
    }
  };

  function clipboardexport() {
    let copy = "";
    saved.forEach(element => {
      copy = copy + element.meals[0].strMeal + ": " + element.meals[0].strYoutube + "\n";
    });
    navigator.clipboard.writeText(copy);
    alert("Copied to clipboard");
  }  


  return (  
    <div>
    <h1 className="title">RecipeExplorer</h1>
    <h2>Explore the World of Food</h2>
    <h2>Swipe Right to Like, Swipe Left to Forget</h2>
    {loading ? <h1>{recipes.length}%</h1> :
    <>
    <div className='cardContainer'>
        {recipes.map((recipe) =>
            <TinderCard className='swipe' key={recipe.meals[0].strMeal}  preventSwipe={['up', 'down']} onSwipe={(dir) => swiped(dir, recipe)}>
              <div style={{    backgroundImage: 'url(' + recipe.meals[0].strMealThumb + ')'  }} className='card'>
                <span>{recipe.meals[0].strMeal}</span>
              </div>
            </TinderCard>
        )}
      </div>
      <h4>Recipes You Liked</h4>
      <div className="listContainer">
        {saved.map((recipe) =>
          <a href={recipe.meals[0].strYoutube}><div className="list" target="_blank" style={{    backgroundImage: 'url(' + recipe.meals[0].strMealThumb + ')'  }}><h5 className="listText">{recipe.meals[0].strMeal}</h5></div></a>
        )}
      </div>
      <button className="btn-grad" onClick={clipboardexport}>Copy to Clipboard</button>
      </>
  }
  <div>

  </div>


  </div>
  );
}

export default App;