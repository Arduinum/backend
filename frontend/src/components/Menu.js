import {Link} from "react-router-dom";
import React from "react";

const Menu = ({menu}) => {
    return (
        <nav>
            <ul>
              <li><Link to="/users">Users</Link></li>
              <li><Link to="/projects">Projects</Link></li>
              <li><Link to="/todos">Todos</Link></li>
            </ul>
          </nav>
    );
}

export default Menu;