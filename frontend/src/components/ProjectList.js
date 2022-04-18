import React from "react"
import {Link} from "react-router-dom"


const ProjectItem = ({project, deleteProject}) => {
    return (
        <tr>
            <td>{project.id}</td>
            <td><Link to={`projects/${project.id}`}>{project.name_project}</Link></td>
            <td>{project.link}</td>
            <td><button onClick={() => deleteProject(project.id)} type="button">Delete</button></td>
        </tr>
    );
}

export const ProjectList = ({projects, deleteProject}) => {
    return (
        <div>
            <table>
                <tbody>
                    <tr>
                        <th>Id project</th>
                        <th>Name project</th>
                        <th>Link project</th>
                        <th></th>
                    </tr>
                    {projects.map((project) => <ProjectItem key={project.id} project={project}
                                                            deleteProject={deleteProject}/>)}
                </tbody>
            </table>
            <Link to="/projects/create">Create</Link>
        </div>
    );
}


export default ProjectList;