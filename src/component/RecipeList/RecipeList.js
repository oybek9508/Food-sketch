import { Grid } from "@material-ui/core";
import axios from "axios";
import React, { useEffect, useState } from "react";
import RecipeHead from "../RecipeHead/RecipeHead";
import RecipeListRender from "../RecipeListRender/RecipeListRender";
import styles from "./RecipeList.module.css";

const LOADING = "LOADING";

function RecipeList() {
  const [error, setError] = useState("");
  const [loading, setLoading] = useState("");
  const [recipesCategorized, setRecipesCategorized] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      setLoading(LOADING);
      try {
        const { data } = await axios.get(
          "https://asia-northeast1-sharexpere-prod.cloudfunctions.net/recipe"
        );
        setError("");
        setLoading("");
        const categorized = {};
        data.forEach((recipe) => {
          if (categorized[recipe.category]) {
            categorized[recipe.category].push(recipe);
          } else {
            categorized[recipe.category] = [recipe];
          }
        });

        // sorting the list by category
        Object.keys(categorized).forEach((category) => {
          const categoryItems = categorized[category];
          categoryItems.sort((a, b) => a.name.localeCompare(b.name));
        });
        setRecipesCategorized(categorized);
      } catch (error) {
        setError(error);
      }
    };
    fetchData();
  }, []);

  return (
    <>
      <div>
        <RecipeHead />
        {error && (
          <span className={styles.error__message}>
            FAILED: ERROR HAS OCCURED WHILE LOADING THE DATA !!!
          </span>
        )}
        {!error && loading === LOADING && (
          <span className={styles.loading__message}>LOADING ...</span>
        )}
        {Object.keys(recipesCategorized).map((categoryName) => {
          const recipes = recipesCategorized[categoryName];
          return (
            <div
              className={styles.recipe__container}
              key={categoryName}
              style={{ marginBottom: 50, padding: "10px 10px" }}
            >
              <h1>{categoryName}</h1>
              <Grid
                className={styles.recipe__list}
                container
                spacing={1}
                alignItems="flex-start"
              >
                {recipes.map((r) => (
                  <RecipeListRender key={r.id} recipe={r} />
                ))}
              </Grid>
            </div>
          );
        })}
      </div>
    </>
  );
}

export default RecipeList;

// The above sorting function works something like this ->

// const sss = [
//   {category: 'japanese',name: 'Item 1'},
//   {category: 'korean',name: ''},
//   {category: 'japanese',name: ''},
//   {category: 'japanese',name: ''},
//   {category: 'korean',name: ''},
// ]

// const fin = {
//   japense: [
//     {category: 'japanese',name: ''},
//     {category: 'japanese',name: ''},
//     {category: 'japanese',name: ''},
//   ],
//   korean: [
//     {category: 'korean',name: ''},
//     {category: 'korean',name: ''},
//   ]
// }
