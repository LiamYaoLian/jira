import React from 'react';
import {User} from "./search-panel";
import {Table} from "antd";
import dayjs from "dayjs";

interface Project {
    id: string;
    name: string;
    personId: string;
    pin: string;
    organization: string;
    created: number;
}

interface ListProps {
    list: Project[],
    users: User[]

}

export const List = ({users, list}: ListProps) => {
    return <Table pagination={false} columns={[{
        title: "Name",
        dataIndex: "name",
        sorter: (a, b) => a.name.localeCompare(b.name)
        },
        {
            title: "Department",
            dataIndex:"organization"
        },
        {
            title:"Created at",
            render(value, project) {
                return <span>
                    {project.created ? dayjs(project.created).format("YYYY-MM-DD") : "Nonenpm"}
                </span>
            }
        },
        {
        title: "Person in Charge",
        render(value, project) {
            return <span>
                {users.find(user => user.id === project.personId)?.name || 'unknown'}
            </span>
        }
    }]} dataSource={list}/>

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