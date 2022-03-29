import React from "react"
import {useParams} from "react-router-dom";


const ProjectItem = ({project}) => {
    return (
        <tr>
            <td>{project.id}</td>
            <td>{project.name_project}</td>
            <td>{project.link}</td>
        </tr>
    );
}

const Project = ({projects}) => {
    // при обновлении страницы данные исчезают Uncaught TypeError: Cannot read properties of undefined (reading 'id')
    // при обычном переходе всё работает как надо
    let getId = useParams();

    function getProject(getId, projects) {
        for (let key in projects){
            if (getId["id"] == projects[key]["id"]) {
                return projects[key];
            }
        }
    }

    return (
        <table>
            <tbody>
                <tr>
                    <th>Id project</th>
                    <th>Name project</th>
                    <th>Link project</th>
                </tr>
                <ProjectItem key={getId} project={getProject(getId, projects)} />
            </tbody>
        </table>
    );
}


export default Project;