import React, { useContext } from 'react';
import NavBar from './Components/NavBar';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Homepage from './Pages/Homepage';
import AdminPage from './Pages/AdminPage';
import Login from './Pages/Login';
import Profile from './Pages/Profile';
import Context, { myContext } from './Pages/Context';
import Register from './Pages/Register';
import 'bootstrap/dist/css/bootstrap.css';

function App() {
  const ctx = useContext(myContext);
  return (
    <div className="App">
      <BrowserRouter>
        <NavBar />
        <Switch>
          <Route path="/" exact component={Homepage}></Route>
          {ctx ? (
            <>
              {ctx.isAdmin ? (
                <Route path="/admin" component={AdminPage}></Route>
              ) : null}
              <Route path="/profile" component={Profile}></Route>
            </>
          ) : (
            <>
              <Route path="/login" component={Login}></Route>
              <Route path="/register" component={Register}></Route>
            </>
          )}
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
