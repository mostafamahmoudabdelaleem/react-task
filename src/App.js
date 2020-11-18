import React from 'react';
import { BrowserRouter as Router, Route} from 'react-router-dom';
import Current from './screens/Current';
import Search from './screens/Search';
import './css/App.css'

function App() {
  return (
    <React.Fragment>
      <Router>
        <Route exact path = "/" component = {Search} />
        <Route exact path = "/no-redirect" component = {() => <Search redirect="same-page" />} />
        <Route exact path = "/current" component = {Current} />
        <Route exact path = "/current/:location" component = {Current} />
      </Router>
    </React.Fragment>
  );
}

export default App;
