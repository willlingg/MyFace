import "./App.css";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from "react-router-dom";
import PostList from "./Components/PostList";
import SignIn from "./Pages/SignIn";
import SignUp from "./Pages/SignUp";
import Blog from "./Pages/Home";
import PostPage from "./Pages/PostPage";

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/" render={() => <Redirect to="/home" />} />
        <Route exact path="/signup" component={SignUp} />
        <Route exact path="/signin" component={SignIn} />
        <Route exact path="/home" component={Blog} />
        <Route exact path="/posts" component={PostPage} />
      </Switch>
    </Router>
  );
  return <PostList></PostList>;
}

export default App;
