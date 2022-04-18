import {Link} from "react-router-dom";
import React from "react";

const ToDoItem = ({todo, deleteTodo}) => {
    return (
        <tr>
            <td>{todo.text}</td>
            <td>{todo.isActive}</td>
            <td>{todo.create}</td>
            <td>{todo.update}</td>
            <td>{todo.project}</td>
            <td><button type="button" onClick={() => deleteTodo(todo.id)}>Delete</button></td>
        </tr>
    );
}

const ToDoList = ({todos, deleteTodo}) => {
    return (
        <div>
            <table>
                <tbody>
                    <tr>
                        <th>Text</th>
                        <th>Is Active</th>
                        <th>Create data</th>
                        <th>Update data</th>
                        <th>Project id</th>
                        <th></th>
                    </tr>
                    {todos.map((todo) => <ToDoItem key={todo.id} todo={todo} deleteTodo={deleteTodo} />)}
                </tbody>
            </table>
            <Link to="/todos/create">Create</Link>
        </div>

    );
}

export default ToDoList;