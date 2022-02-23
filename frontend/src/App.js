import React from 'react';
import logo from './logo.svg';
import './App.css';
import UserList from './components/UserList.js';
import Menu from "./components/Menu.js";
import Footer from "./components/Footer.js";
import axios from "axios";


class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      'menu': [],
      'users': [],
      'footer': []
    }
  }

  componentDidMount() {
    axios.get('http://127.0.0.1:8000/api/users/').then(response => {
      const users = response.data;

      this.setState({'users': users});
    }).catch(error => console.log(error));
  }

  render() {
    return(
      <div>
        <Menu menu={this.state.menu} />
        <UserList users={this.state.users} />
        <Footer footer={this.state.footer} />
      </div>
    );
  }
}

export default App;