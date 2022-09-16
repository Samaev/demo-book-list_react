import "./App.css";
import BookForm from "./components/add-a-book/BookForm";
import "bootstrap/dist/css/bootstrap.min.css";
import Dashboard from "./components/dashboard/Dashboard";
import { BrowserRouter as Router, Switch, Route, withRouter } from "react-router-dom";

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={withRouter(Dashboard)} />
        <Route exact path="/book" component={withRouter(BookForm)} />
        <Route exact path="/book/:id" component={withRouter(BookForm)} />
      </Switch>
    </Router>
  );
}

export default App;
