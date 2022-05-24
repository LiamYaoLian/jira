import React from 'react';
import {Table} from 'antd';
import {TableProps} from 'antd/es';
import dayjs from 'dayjs';
import {User} from './search-panel';
import {Link} from "react-router-dom";
import {BrowserRouter as Router} from 'react-router-dom';


export interface Project {
    id: string;
    name: string;
    personId: string;
    pin: string;
    organization: string;
    created: number;
}

interface ListProps extends TableProps<Project> {
    users: User[]

}

export const List = ({users, ...props}: ListProps) => {
    return <Table pagination={false} columns={[{
        title: 'Name',
        sorter: (a, b) => a.name.localeCompare(b.name),
        render(value, project) {
            return <Router>
                <Link to={String(project.id)}>{project.name}</Link>
            </Router>

        }
        },
        {
            title: 'Department',
            dataIndex:'organization'
        },
        {
            title:'Created at',
            render(value, project) {
                return <span>
                    {project.created ? dayjs(project.created).format('YYYY-MM-DD') : 'Nonenpm'}
                </span>
            }
        },
        {
        title: 'Person in Charge',
        render(value, project) {
            return <span>
                {users.find(user => user.id === project.personId)?.name || 'unknown'}
            </span>
        }
    }]}
        {...props}
    />

    // return <table>
    //     <thead>
    //         <th>Name</th>
    //         <th>Person in Charge</th>
    //     </thead>
    //     <tbody>
    //     {
    //         list.map(project => <tr key={project.id}>
    //             <td>{project.name}</td>
    //             {/*undefined.name will cause error*/}
    //             <td>{users.find(user => user.id === project.personId)?.name || 'unknown'}</td>
    //         </tr>)
    //     }
    //     </tbody>
    // </table>
}