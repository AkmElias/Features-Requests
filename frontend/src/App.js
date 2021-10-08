import Canvas from "./canvas/Canvas.js";
import Header from "./header/Header.js";
import FeatureDetails from "./canvas/components/FeatureDetails.js"
import "./canvas/assets/style.css";

import { BrowserRouter as Router, Route, Switch, Link } from "react-router-dom";

function App() {
  return (
    <Router>
      <div className="App">
        <Switch>
        <Route path="/details">
            <Header />
            <FeatureDetails />
          </Route>
          <Route path="/">
            <Header />
            <Canvas />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
