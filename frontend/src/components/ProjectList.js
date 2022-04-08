import React from "react"
import {Link} from "react-router-dom"


const ProjectItem = ({project}) => {
    return (
        <tr>
            <td>{project.id}</td>
            <td><Link to={`projects/${project.id}`}>{project.name_project}</Link></td>
            <td>{project.link}</td>
        </tr>
    );
}

export const ProjectList = ({projects}) => {
    return (
        <table>
            <tbody>
                <tr>
                    <th>Id project</th>
                    <th>Name project</th>
                    <th>Link project</th>
                </tr>
                {projects.map((project) => <ProjectItem key={project.id} project={project} />)}
            </tbody>
        </table>
    );
}


export default ProjectList;