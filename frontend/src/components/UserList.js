const UserItem = ({user}) => {
    return (
        <tr>
            <td>{user.username}</td>
            <td>{user.firstName}</td>
            <td>{user.lastName}</td>
            <td>{user.birthdayYear}</td>
            <td>{user.email}</td>
        </tr>
    );
}

const UserList = ({users}) => {
    return (
        <table>
            <th>Username</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Birthday year</th>
            <th>Email</th>
            {users.map((user) => <UserItem user={user} />)}
        </table>
    );
}

export default UserList;