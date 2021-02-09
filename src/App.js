import React, {} from 'react'
import Store from './redux/Store'
import {Switch, Route} from 'react-router-dom'
import Home from './Home/Home'
import Detail from './Detail/Detail';

function App() {

  return (
    <div>
      <Store>
        <Switch>
          <Route exact path='/' component={Home}></Route>
          <Route exact path='/detail/:id' component={Detail}></Route>
        </Switch>
      </Store>
    </div>
  );
}

export default App;
