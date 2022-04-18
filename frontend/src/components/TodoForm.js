import React from "react";


class TodoForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            "text": "",
            "is_active": false,
            "project": null,
            "user": null
        }
    }

    handleChange(event) {
        this.setState({
            [event.target.name]: event.target.value
        });
    }

    handleSubmit(event) {
        if (this.state.is_active === "on") {
            this.state.is_active = true
        }
        this.props.createTodo(this.state.text, this.state.is_active, this.state.project, this.state.user);
        event.preventDefault();
    }

    handleProjectChange(event) {
        if (!event.target.selectedOptions) {
            return
        }

        let project = null;
        for (let i = 0; i < event.target.selectedOptions.length; i++) {
            project = parseInt(event.target.selectedOptions.item(i).value);
        }

        this.setState({
            "project": project
        });
    }

    handleUserChange(event) {
        if (!event.target.selectedOptions) {
            return
        }

        let user = null;
        for (let i = 0; i < event.target.selectedOptions.length; i++) {
            user = parseInt(event.target.selectedOptions.item(i).value);
        }

        this.setState({
            "user": user
        });
    }

    render() {
        return (
            <form onSubmit={(event) => this.handleSubmit(event)}>
                <div className="form-group">
                    <label>Text</label>
                    <input type="text" name="text" className="form-control"
                           value={this.state.text} onChange={(event) =>
                        this.handleChange(event)} />
                </div>
                <div className="form-group">
                    <label>Active</label>
                    <input type="checkbox" name="is_active" className="form-control"
                        checked={this.state.is_active} onChange={(event) =>
                        this.handleChange(event)} />
                </div>
                <div className="form-group">
                    <label>Name project</label>
                    <select multiple onChange={(event) =>
                        this.handleProjectChange(event)}>{this.props.projects.map((project) =>
                        <option key={project.id} value={project.id}>{project.name_project}</option>)}
                    </select>
                </div>
                <div className="form-group">
                    <label>User</label>
                    <select multiple onChange={(event) =>
                        this.handleUserChange(event)}>{this.props.users.map((user) =>
                        <option key={user.id} value={user.id}>{user.first_name} {user.last_name}</option>)}
                    </select>
                </div>
                <input type="submit" className="btn btn-primary" value="Create"/>
            </form>

        );
    }
}

export default TodoForm;