import {HashRouter as Router, Switch, Route} from 'react-router-dom';

import CharacterPage from './pages/CharacterPage/CharacterPage';

import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <Switch>
          <Route exact path='/' component={CharacterPage} />
        </Switch>
      </div>
    </Router>

  );
}

export default App;
