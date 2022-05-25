import React from 'react';
import { Table } from 'antd';
import { TableProps } from 'antd/es';
import dayjs from 'dayjs';
import { User } from './search-panel';
import { Link } from 'react-router-dom';
import {Pin} from "../../components/pin";
import {useEditProject} from "../../utils/project";

export interface Project {
  id: number;
  name: string;
  personId: number;
  pin: boolean;
  organization: string;
  created: number;
}

interface ListProps extends TableProps<Project> {
  users: User[];
  refresh?: () => void;
}

export const List = ({ users, ...props }: ListProps) => {
  const {mutate} = useEditProject()
  const pinProject = (id: number) => (pin: boolean) => mutate({id, pin}).then(props.refresh)

  return (
    <Table
      pagination={false}
      columns={[
        {
            title: <Pin checked={true} disabled={true}/>,
            render(value, project) {
                // Currying
                return <Pin checked={project.pin} onCheckedChange={pinProject(project.id)}/>
            }
        },
        {
          title: 'Name',
          sorter: (r1, r2) => r1.name.localeCompare(r2.name),
          render(value, project) {
            return (
              <Link to={`projects/${String(project.id)}`}>{project.name}</Link>
            );
          },
        },
        {
          title: 'Department',
          dataIndex: 'organization',
        },
        {
          title: 'Created at',
          render(value, project) {
            return (
              <span>
                {project.created
                  ? dayjs(project.created).format('YYYY-MM-DD')
                  : 'None'}
              </span>
            );
          },
        },
        {
          title: 'Person in Charge',
          render(value, project) {
            return (
              <span>
                {users.find((user) => user.id === project.personId)?.name ||
                  'unknown'}
              </span>
            );
          },
        },
      ]}
      {...props}
    />
  );
};
