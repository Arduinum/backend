import React from "react";


class ProjectForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            "name_project": "",
            "link": "",
            "users": ""
        }
    }

    handleChange(event) {
        this.setState({
            [event.target.name]: event.target.value
        });
    }

    handleSubmit(event) {
        this.props.createProject(this.state.name_project, this.state.link, this.state.users);
        event.preventDefault();
    }

    handleUsersChange(event) {
        if (!event.target.selectedOptions) {
            return
        }

        let users = [];
        for (let i = 0; i < event.target.selectedOptions.length; i++) {
            users.push(parseInt(event.target.selectedOptions.item(i).value));
        }

        this.setState({
            "users": users
        });
    }


    render() {
        return (
            <form onSubmit={(event) => this.handleSubmit(event)}>
                <div className="form-group">
                    <label>Name project</label>
                    <input type="text" name="name_project" className="form-control"
                           value={this.state.name_project} onChange={(event) =>
                        this.handleChange(event)} />
                </div>
                <div className="form-group">
                    <label>Link</label>
                    <input type="text" name="link" className="form-control"
                    value={this.state.link} onChange={(event) =>
                        this.handleChange(event)}/>
                </div>
                <select multiple onChange={(event) => this.handleUsersChange(event)}>
                    {this.props.users.map((user) => <option key={user.id} value={user.id}>{user.first_name}
                        {user.last_name}</option>)}
                </select>
                <input type="submit" className="btn btn-primary" value="Create"/>
            </form>
        );
    }
}

export default ProjectForm;