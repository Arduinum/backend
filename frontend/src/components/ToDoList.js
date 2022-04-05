const ToDoItem = ({todo}) => {
    return (
        <tr>
            <td>{todo.text}</td>
            <td>{todo.isActive}</td>
            <td>{todo.create}</td>
            <td>{todo.update}</td>
            <td>{todo.project}</td>
        </tr>
    );
}

const ToDoList = ({todos}) => {
    return (
        <table>
            <tbody>
                <tr>
                    <th>Text</th>
                    <th>Is Active</th>
                    <th>Create data</th>
                    <th>Update data</th>
                    <th>Project id</th>
                </tr>
                {todos.map((todo) => <ToDoItem key={todo.id} todo={todo} />)}
            </tbody>
        </table>
    );
}

export default ToDoList;