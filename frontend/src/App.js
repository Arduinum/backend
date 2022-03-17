import React from "react";
import logo from './logo.svg';
import "./App.css";
import UserList from "./components/UserList.js";
import ProjectList from "./components/ProjectList";
import Project from "./components/Project";
import ToDoList from "./components/ToDoList";
import Menu from "./components/Menu.js";
import Footer from "./components/Footer.js";
import axios from "axios";
import {BrowserRouter, Route, Switch} from "react-router-dom";


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
      "footer": []
    }
  }

  componentDidMount() {
    axios.get("http://127.0.0.1:8000/api/users/").then(response => {
      const users = response.data.results;  // for pagination
      this.setState({"users": users});
    }).catch(error => console.log(error));

    axios.get("http://127.0.0.1:8000/api/projects/").then(response => {
      const projects = response.data;
      this.setState({"projects": projects});
    }).catch(error => console.log(error));

    axios.get("http://127.0.0.1:8000/api/todos/").then(response => {
      const todos = response.data;
      this.setState({"todos": todos});
    }).catch(error => console.log(error));
  }

  render() {
    return(
      <div className="App">
        <BrowserRouter>
          <Menu menu={this.state.menu} />
          <Switch>
            <Route exact path="/users" component={() => <UserList users={this.state.users} />} />
            <Route exact path="/projects" component={() => <ProjectList projects={this.state.projects} />} />
            <Route exact path="/projects/:id" component={() => <Project projects={this.state.projects} />} />
            <Route exact path="/todos" component={() => <ToDoList todos={this.state.todos} />}/>
            <Route component={NotFound404} />
          </Switch>
        </BrowserRouter>
        <Footer footer={this.state.footer} />
      </div>
    );
  }
}

export default App;