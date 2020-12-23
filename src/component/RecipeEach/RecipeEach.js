import React, { useState, useEffect } from "react";
import styles from "./RecipeEach.module.css";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";
import axios from "axios";
import time from "../../images/sample_icons/time.png";
import serving from "../../images/sample_icons/serving.png";
import kcalImg from "../../images/sample_icons/kcal.png";
import check_full from "../../images/sample_icons/check_full.png";
import back from "../../images/sample_icons/back@2x.png";
import { useHistory } from "react-router-dom";

const LOADING = "LOADING";

const useStyles = makeStyles({
  media: {
    height: 280,
  },
});

export default function RecipeEach({ match: { params } }) {
  const classes = useStyles();
  const [error, setError] = useState("");
  const [food, setFood] = useState({});
  const history = useHistory();
  const [loading, setLoading] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      setLoading(LOADING);
      try {
        const { data } = await axios.get(
          `https://asia-northeast1-sharexpere-prod.cloudfunctions.net/recipe/${params.id}`
        );
        setError("");
        setLoading("");
        setFood(data);
        console.log(data);
      } catch (error) {
        setError(error);
      }
    };
    fetchData();
  }, []);

  const handleReturnHome = () => {
    history.push("/");
  };
  const {
    picture,
    name,
    description,
    cookingTime,
    servings,
    kcal,
    ingredients,
    spices,
    cookingSteps,
  } = food;
  return (
    <>
      {error && (
        <span className={styles.error__message}>
          FAILED: ERROR HAS OCCURED WHILE LOADING THE DATA !!!
        </span>
      )}
      {!error && loading === LOADING && (
        <span className={styles.loading__message}>LOADING ...</span>
      )}
      <Card className={classes.root}>
        <CardActionArea>
          <img
            src={back}
            alt="backIcon"
            style={{ position: "absolute", top: "80px" }}
            onClick={handleReturnHome}
          />
          <CardMedia className={classes.media} image={picture} title={name} />
          <CardContent>
            <Typography gutterBottom variant="h5" component="h2">
              <strong>{name}</strong>
            </Typography>
            <Typography variant="body2" color="textSecondary" component="p">
              {description}
            </Typography>
          </CardContent>
          <CardContent className={styles.time__servings__kcal}>
            <div>
              <img src={time} alt="time icon" />
              <p>{cookingTime}</p>
            </div>
            <div>
              <img src={serving} alt="serving icon" />
              <p>{servings}</p>
            </div>
            <div>
              <img src={kcalImg} alt="kcal" />
              <p>{kcal}</p>
            </div>
          </CardContent>
          <CardContent className={styles.ingredients}>
            <h2>
              <strong>재료</strong>
            </h2>
            {ingredients &&
              ingredients.map((ingredient) => {
                return (
                  <div key={ingredient}>
                    <img src={check_full} alt="" />
                    <p>{ingredient}</p>
                  </div>
                );
              })}
          </CardContent>
          <CardContent className={styles.ingredients}>
            <h2>
              <strong>양념장</strong>
            </h2>
            {spices &&
              spices.map((spice) => {
                return (
                  <div key={spice}>
                    <img src={check_full} alt="" />
                    <p>{spice}</p>
                  </div>
                );
              })}
          </CardContent>
          <CardContent>
            <h2>
              <strong>만들어봅시다</strong>
            </h2>
            {cookingSteps &&
              cookingSteps.map((step, index) => {
                return (
                  <div key={step} className={styles.steps}>
                    {/*<img src={check_full} alt="" />*/}
                    <div className={styles.cooking__steps}>{index + 1}</div>
                    <p>{step}</p>
                  </div>
                );
              })}
          </CardContent>
        </CardActionArea>
      </Card>
    </>
  );
}
