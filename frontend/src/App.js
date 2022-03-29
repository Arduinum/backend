import React from "react";
import "./App.css";
import UserList from "./components/UserList.js";
import ProjectList from "./components/ProjectList";
import Project from "./components/Project";
import ToDoList from "./components/ToDoList";
import Footer from "./components/Footer.js";
import LoginForm from "./components/Auth";
import axios from "axios";
import {BrowserRouter, Link, Route, Switch} from "react-router-dom"


const NotFound404 = ({ location }) => {
  return (
    <div>
      <h1>Данная страница: "{location.pathname}" не найдена!</h1>
    </div>
  );
}


class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      "menu": [],
      "users": [],
      "projects": [],
      "todos": [],
      "footer": [],
      "token": "",
      "login": "",
      "name": "",
      "surname": ""
    }
  }

  getData() {
    let headers = this.getHeader();

    axios.get("http://127.0.0.1:8000/api/users/", {headers}).then(response => {
      // const users = response.data.results;  // for pagination
      const users = response.data;
      this.setState({"users": users});
    }).catch(error => console.log(error));

    axios.get("http://127.0.0.1:8000/api/projects/", {headers}).then(response => {
      const projects = response.data;
      this.setState({"projects": projects});
    }).catch(error => console.log(error));

    axios.get("http://127.0.0.1:8000/api/todos/", {headers}).then(response => {
      const todos = response.data;
      this.setState({"todos": todos});
    }).catch(error => console.log(error));
  }

  componentDidMount() {
    let token = localStorage.getItem("token");

    this.setState({
      "token": token
    }, this.getData);
  }

  isAuth() {
    return !!this.state.token;
  }

  getHeader() {
    if (this.isAuth()) {
      return {
        "Authorization": `Token ${this.state.token}`
      }
    }
    return {}
  }

  getToken(login, password) {
    axios.post("http://127.0.0.1:8000/api-token-auth/", {"username": login, "password": password})
      .then(response => {
        const token = response.data.token;
        localStorage.setItem("token", token);
        this.setState({"token": token, "login": login}, this.getData);
        this.setDataUser();
      }).catch(error => console.log(error));
  }

  setDataUser() {
    const user = this.state.users.filter((user) => user["username"] === this.state.login);
    if (user[0] !== undefined) {
      const firstName = Object.entries(user[0]).filter((arr) => arr[0] === "first_name")[0][1];
      const lastName = Object.entries(user[0]).filter((arr) => arr[0] === "last_name")[0][1];
      this.setState({"name": firstName, "surname": lastName});
    }

  }

  logout() {
    localStorage.setItem("token", "");
    this.setState({"token": "", "login": "", "name": "", "surname": ""}, this.getData);
  }

  render() {
    return(
      <div className="App">
        <BrowserRouter>
          <nav>
            <ul>
              <li><Link to="/users">Users</Link></li>
              <li><Link to="/projects">Projects</Link></li>
              <li><Link to="/todos">Todos</Link></li>
              <li>
                {this.isAuth() ? <div>{this.state.name}&nbsp;{this.state.surname}&nbsp;
                  <button onClick={() => this.logout()}>Logout</button></div> : <Link to="/login">Login</Link>}
              </li>
            </ul>
          </nav>
          <Switch>
            <Route exact path="/users" component={() => <UserList users={this.state.users} />} />
            <Route exact path="/projects" component={() => <ProjectList projects={this.state.projects} />} />
            <Route exact path="/projects/:id" component={() => <Project projects={this.state.projects} />} />
            <Route exact path="/todos" component={() => <ToDoList todos={this.state.todos} />}/>
            <Route exact path="/login" component={() => <LoginForm getToken={(login, password) =>
                this.getToken(login, password)} />} />
            <Route component={NotFound404} />
          </Switch>
        </BrowserRouter>
        <Footer footer={this.state.footer} />
      </div>
    );
  }
}

export default App;