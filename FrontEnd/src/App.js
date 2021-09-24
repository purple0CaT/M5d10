import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import MyNavbar from "./components/MyNavbar";
import Gallerie from "./components/Gallerie";
import MyFooter from "./components/MyFooter";
import { useState } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import CommentArea from "./components/test/CommentArea";
import Test from "./components/test";
import Details from "./components/test/Details";

const App = () => {
  const [State, setState] = useState(null);
  const [linkName, setlinkName] = useState(null);

  return (
    <Router>
      <MyNavbar searchValue={(e) => setState(e)} />
      <Route
        path="/"
        exact
        render={(routerProps) => (
          <Gallerie {...routerProps} searchVal={State} />
        )}
      />
      <Route
        path="/details/:movieId"
        
        component={Details}
      />

      <Route path="/tvShows" exact component={Gallerie} />
      <MyFooter />
    </Router>
  );
};

export default App;
