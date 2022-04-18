import React from "react";
import "./App.css";
import UserList from "./components/UserList.js";
import ProjectList from "./components/ProjectList";
import Project from "./components/Project";
import ToDoList from "./components/ToDoList";
import Footer from "./components/Footer.js";
import LoginForm from "./components/Auth";
import ProjectForm from "./components/ProjectForm";
import TodoForm from "./components/TodoForm";
import axios from "axios";
import {BrowserRouter, Link, Route, Switch} from "react-router-dom"
import Fuse from "fuse.js"


// при обновлении страницы исчезает имя и фамилия рядом с logout!

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
      "projectsState": [],
      "todos": [],
      "footer": [],
      "token": "",
      "login": "",
      "name": "",
      "surname": "",
      "searchData": ""
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
      this.setState({"projects": projects, "projectsState": projects});
    }).catch(error => console.log(error));

    axios.get("http://127.0.0.1:8000/api/todos/", {headers}).then(response => {
      const todos = response.data;
      this.setState({"todos": todos.filter((todo) => todo["is_active"] !== false)});
    }).catch(error => console.log(error));
  }

  componentDidMount() {
    let token = localStorage.getItem("token");

    this.setState({
      "token": token
    }, this.getData);
  }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    });
  }

  handleSubmit(event) {
    if (!this.state.searchData) {
      this.setState({
        "projectsState": this.state.projects
      });
    }
    else {
      this.setState({
        "projectsState": this.filterItems(this.state.projects, this.state.searchData)
      });
    }
    event.preventDefault();
  }

  filterItems(data, str) {
    const fuse = new Fuse(data, {
      keys: ["name_project"]
    }).search(str);
    let result = []

    for (let i in fuse) {
      result.push(fuse[i]["item"])
    }
    return result;
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

  createProject(name_project, link, users){
    const headers = this.getHeader();

    const data = {
      "name_project": name_project,
      "link": link,
      "users": users
    }

    axios.post("http://127.0.0.1:8000/api/projects/", data, {headers}).then(response => {
      this.getData();
    }).catch(error => console.log(error));
  }

  deleteProject(id) {
    const headers = this.getHeader();
    axios.delete(`http://127.0.0.1:8000/api/projects/${id}`, {headers}).then(response => {
      this.setState({"projects": this.state.projects.filter((project) => project.id !== id)});
    }).catch(error => console.log(error));
  }

  createTodo(text, is_active, project, user) {
    const headers = this.getHeader();
    const data = {
      "text": text,
      "is_active": is_active,
      "project": project,
      "user": user
    }

    axios.post("http://127.0.0.1:8000/api/todos/", data, {headers}).then(response => {
      this.getData();
    }).catch(error => console.log(error));
  }

  deleteTodo(id) {
    const headers = this.getHeader()
    axios.delete(`http://127.0.0.1:8000/api/todos/${id}`, {headers}).then(response => {
      this.setState({"todos": this.state.todos.filter((todo) => todo.id !== id)});
    }).catch(error => console.log(error));
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
          <form onSubmit={(event) => this.handleSubmit(event)}>
            <div className="form-group">
                <input type="search" name="searchData" className="form-control" placeholder="поисковик"
                       value={this.state.searchData} onChange={(event) =>
                    this.handleChange(event)}/>
            </div>
            <input type="submit" value="Search"/>
          </form>
          <Switch>
            <Route exact path="/users" component={() => <UserList users={this.state.users} />} />
            {/*<Route exact path="/projects" component={*/}
            {/*  () => <ProjectList projects={this.state.projects} deleteProject={(id) => this.deleteProject(id)} />} />*/}
            <Route exact path="/projects" component={
              () => <ProjectList projects={this.state.projectsState} deleteProject={(id) => this.deleteProject(id)} />} />
            <Route exact path="/projects/create" component={() => <ProjectForm users={this.state.users} createProject={
              (name_project, link, users) => this.createProject(name_project, link, users)} />} />
            <Route exact path="/projects/:id" component={() => <Project projects={this.state.projects} />} />
            <Route exact path="/todos" component={
              () => <ToDoList todos={this.state.todos} deleteTodo={(id) => this.deleteTodo(id)} />} />
            <Route exact path="/todos/create" component={
              () => <TodoForm users={this.state.users} projects={this.state.projects}
              createTodo={(text, is_active, project, user) => this.createTodo(text, is_active, project, user)} />} />
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