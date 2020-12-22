import React, { useState, useEffect } from "react";
import styles from "./RecipeEach.module.css";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import axios from "axios";
import time from "../../images/sample_icons/time.png";
import serving from "../../images/sample_icons/serving.png";
import kcal from "../../images/sample_icons/kcal.png";
import check_full from "../../images/sample_icons/check_full.png";
import back from "../../images/sample_icons/back@2x.png";
import { useHistory } from "react-router-dom";

const useStyles = makeStyles({
  media: {
    height: 280,
  },
});

export default function RecipeEach({
  match: {
    params: { id },
  },
}) {
  const classes = useStyles();
  const [error, setError] = useState("");
  const [food, setFood] = useState({});
  const history = useHistory();

  useEffect(async () => {
    try {
      const { data } = await axios.get(
        `https://asia-northeast1-sharexpere-prod.cloudfunctions.net/recipe/${id}`
      );
      setError("");
      setFood(data);
      console.log(data);
    } catch (error) {
      setError(error);
    }
  }, []);

  const handleReturnHome = () => {
    history.push("/");
  };

  return (
    <Card className={classes.root}>
      <CardActionArea>
        <img
          src={back}
          alt="backIcon"
          style={{ position: "absolute", top: "80px" }}
          onClick={handleReturnHome}
        />
        <CardMedia
          className={classes.media}
          image={food.picture}
          title={food.name}
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            <strong>{food.name}</strong>
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            {food.description}
          </Typography>
        </CardContent>
        <CardContent className={styles.time__servings__kcal}>
          <div>
            <img src={time} alt="time icon" />
            <p>{food.cookingTime}</p>
          </div>
          <div>
            <img src={serving} alt="serving icon" />
            <p>{food.servings}</p>
          </div>
          <div>
            <img src={kcal} alt="kcal" />
            <p>{food.kcal}</p>
          </div>
        </CardContent>
        <CardContent className={styles.ingredients}>
          <h2>
            <strong>재료</strong>
          </h2>
          {food.ingredients &&
            food.ingredients.map((ingredient) => {
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
          {food.spices &&
            food.spices.map((spice) => {
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
          {food.cookingSteps &&
            food.cookingSteps.map((step) => {
              return (
                <div key={step} className={styles.steps}>
                  <img src={check_full} alt="" />
                  <p>{step}</p>
                </div>
              );
            })}
        </CardContent>
      </CardActionArea>
    </Card>
  );
}
