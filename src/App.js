import {HashRouter as Router, Switch, Route} from 'react-router-dom';

import CharacterPage from './pages/CharacterPage/CharacterPage';
import HousePage from './pages/HousePage/HousePage';

import './App.css';


function App() {
  return (
    <Router>
      <div className="App">
        <Switch>
          <Route exact path='/' component={CharacterPage} />
          <Route exact path='/houses/:id' component={HousePage}/>
        </Switch>
      </div>
    </Router>

  );
}

export default App;
