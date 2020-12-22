import React from "react";
import styles from "./RecipeHead.module.css";

function RecipeHead() {
  return (
    <div className={styles.recipe__head}>
      <span>
        <strong>맛있는 요리</strong>
      </span>
    </div>
  );
}

export default RecipeHead;
