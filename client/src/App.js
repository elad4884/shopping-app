import './App.css';
import Admin from "./components/admin";
import Home from "./components/home";
import Stats from "./components/stats";
import { BrowserRouter, Route, Switch } from 'react-router-dom';

function App() {
  return (
    <BrowserRouter>
       <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="collapse navbar-collapse" id="navbarText">
          <ul className="navbar-nav mr-auto">
            <li className="nav-item">
              <a className="nav-link" href="/">Home</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="/admin">Admin</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="/stats">Stats</a>
            </li>
          </ul>
        </div>
      </nav>
    <div style={{padding: '20px 80px'}}>
        <Switch>
          <Route exact path='/'>
            <Home />
          </Route>
          <Route exact path='/home'>
            <Home />
          </Route>
          <Route exact path='/admin'>
            <Admin />
          </Route>
          <Route exact path='/stats'>
            <Stats />
          </Route>
        </Switch> 
      </div>
    </BrowserRouter>
  );
}

export default App;
