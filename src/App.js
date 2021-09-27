import SearchPage from './SearchPage/SearchPage'
import DetailPage from './DetailPage/DetailPage.js';
import HomePage from './HomePage/HomePage.js';

import './App.css';
import {
  BrowserRouter as Router, 
  Route, 
  Switch,
  NavLink
} from 'react-router-dom';

function App() {
  return (
    <div>
      <Router>
        <header>
          <div>
            <NavLink exact className="unclickedLink" activeClassName="activeLink" to="/">Home</NavLink>
          </div>
          <div>
            <NavLink exact className="unclickedLink" activeClassName="activeLink" to="/search">Search</NavLink>
          </div>
        </header>

        <Switch>
            <Route 
                path="/" 
                exact
                render={(routerProps) => <HomePage {...routerProps} />} 
            />
            <Route 
                path="/search" 
                exact
                render={(routerProps) => <SearchPage {...routerProps} />} 
            />
            <Route 
                path="/pokemon/:id" 
                exact
                render={(routerProps) => <DetailPage {...routerProps} />} 
            />
        </Switch>
    </Router>
  </div>
  );
}

export default App;
