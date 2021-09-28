import React from 'react';
import NavBar from './Components/NavBar';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Homepage from './Pages/Homepage';
import AdminPage from './Pages/AdminPage';
import Login from './Pages/Login';
import Profile from './Pages/Profile';
import Context from './Pages/Context';
import 'bootstrap/dist/css/bootstrap.css';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Context>
          <NavBar />
          <Switch>
            <Route path="/" exact component={Homepage}></Route>
            <Route path="/admin" component={AdminPage}></Route>
            <Route path="/login" component={Login}></Route>
            <Route path="/profile" component={Profile}></Route>
          </Switch>
        </Context>
      </BrowserRouter>
    </div>
  );
}

export default App;
