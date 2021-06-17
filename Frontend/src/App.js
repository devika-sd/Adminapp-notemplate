import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import Updateuser from "./components/Updateuser";
//import Login from "./components/Login";
import Userlist from "./components/Userlist";
import 'bootstrap/dist/css/bootstrap.min.css';
import Login from "./components/Login";
import Adduser from "./components/Adduser";
import UserProfile from "./components/UserProfile";
import Sidebar from './components/navbar/Sidebar'
//import Register from "./components/Register";

export default function App() {
  return (
    <Router>
      
        {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
        <Route path="/" component={Sidebar}/>
        <Switch>
          <Route path="/userprofile/:id" component={UserProfile}/>
          <Route path="/adduser" component={Adduser}/>
          <Route path="/login" component={Login}/>
          <Route path="/userlist" component={Userlist}/>
          <Route path="/updateuser/:id" component={Updateuser}/>
        </Switch>
    </Router>
  );
}