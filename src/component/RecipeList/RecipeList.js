import React, { useState, useEffect } from "react";
import styles from "./RecipeList.module.css";
import RecipeListRender from "../RecipeListRender/RecipeListRender";
import { Grid } from "@material-ui/core";
import { Alert } from "react-bootstrap";
// import BASE_URL from "../../services/api";
import axios from "axios";
import { Button } from "@material-ui/core";
import RecipeHead from "../RecipeHead/RecipeHead";

const LOADING = "LOADING";
const ERROR = "ERROR";

function RecipeList() {
  const [error, setError] = useState("");
  const [loading, setLoading] = useState("");
  const [recipe, setRecipe] = useState([]);
  const [sort, setSort] = useState("asc");

  useEffect(async () => {
    setLoading(LOADING);
    try {
      const { data } = await axios.get(
        "https://asia-northeast1-sharexpere-prod.cloudfunctions.net/recipe"
      );
      setError("");
      setLoading("");
      setRecipe(data);
      console.log(data);
    } catch (error) {
      setError(error);
    }
  }, []);

  const sorted = recipe.sort((a, b) => {
    const isReversed = sort === "asc" ? 1 : -1;
    return isReversed * a.category.localeCompare(b.category);
  });

  const onSort = (sortType) => {
    setSort(sortType);
  };

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
        <Button
          onClick={() => onSort("asc")}
          variant="contained"
          style={{
            marginTop: "30px",
            marginLeft: "10px",
            backgroundColor: "#ffd501",
          }}
        >
          Filter Asc
        </Button>
        <Button
          onClick={() => onSort("desc")}
          variant="contained"
          style={{
            marginTop: "30px",
            marginLeft: "10px",
            backgroundColor: "#ffd501",
          }}
        >
          Filter Desc
        </Button>
        <Grid className={styles.recipe__list} container spacing={1}>
          {sorted.map((recipe_item) => {
            return (
              <RecipeListRender key={recipe_item.id} recipe={recipe_item} />
            );
          })}
        </Grid>
      </div>
    </>
  );
}

export default RecipeList;
