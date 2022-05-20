import React from 'react';
import {User} from "./search-panel";

interface Project {
    id: string;
    name: string;
    personId: string;
    pin: string;
    organization: string;
}

interface ListProps {
    list: Project[],
    users: User[]

}

export const List = ({users, list}: ListProps) => {
    return <table>
        <thead>
            <th>Name</th>
            <th>Person in Charge</th>
        </thead>
        <tbody>
        {
            list.map(project => <tr key={project.id}>
                <td>{project.name}</td>
                {/*undefined.name will cause error*/}
                <td>{users.find(user => user.id === project.personId)?.name || 'unknown'}</td>
            </tr>)
        }
        </tbody>
    </table>
}