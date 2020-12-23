import styles from "./App.module.css";
import RecipeList from "./component/RecipeList/RecipeList";
import RecipeEach from "./component/RecipeEach/RecipeEach";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

function App() {
  return (
    <Router>
      <div className={styles.App}>
        <Switch>
          <Route exact path="/" component={RecipeList} />
          <Route path="/:id" component={RecipeEach} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
