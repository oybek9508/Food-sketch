import React from "react";
import styles from "./RecipeListRender.module.css";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";
import timeIcon from "../../images/sample_icons/time_gray@3x.png";
import eyeIcon from "../../images/sample_icons/eye@3x.png";
import { Link } from "react-router-dom";
import CountUp from "react-countup";

const useStyles = makeStyles({
  root: {
    display: "flex",
    minWidth: 320,
    width: "100%",
    float: "left",
  },
  media: {
    height: 140,
  },
});

export default function RecipeListRender({ recipe }) {
  const classes = useStyles();
  const viewCount = Math.floor(Math.random() * 10000);
  const { picture, name, id, cookingTime } = recipe;
  return (
    <Link to={"/" + id}>
      <Card className={classes.root} style={{ marginTop: "50px" }}>
        <CardActionArea>
          <CardMedia className={classes.media} image={picture} title={name} />
        </CardActionArea>
        <CardActionArea>
          <CardContent>
            <Typography gutterBottom variant="h5" component="h2">
              <strong>{name}</strong>
            </Typography>
          </CardContent>
          <div className={styles.card__view}>
            <div>
              <img
                src={timeIcon}
                alt=""
                style={{ width: "20px", height: "20px" }}
              />
              <p style={{ marginLeft: "10px" }}>
                <CountUp
                  start={0}
                  end={cookingTime}
                  duration={1.5}
                  separator=","
                />
              </p>
            </div>
            <div>
              <img
                src={eyeIcon}
                alt=""
                style={{ width: "20px", height: "20px", marginRight: "10px" }}
              />
              <p>
                <CountUp
                  start={0}
                  end={viewCount}
                  duration={3.5}
                  separator=","
                />
              </p>
            </div>
          </div>
        </CardActionArea>
      </Card>
    </Link>
  );
}
