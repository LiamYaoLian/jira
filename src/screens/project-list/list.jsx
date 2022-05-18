import React from 'react';
export const List = ({users, list}) => {
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