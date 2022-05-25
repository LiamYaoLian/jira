import React from 'react';
import { Table } from 'antd';
import { TableProps } from 'antd/es';
import dayjs from 'dayjs';
import { User } from './search-panel';
import { Link } from 'react-router-dom';

export interface Project {
  id: number;
  name: string;
  personId: number;
  pin: string;
  organization: string;
  created: number;
}

interface ListProps extends TableProps<Project> {
  users: User[];
}

export const List = ({ users, ...props }: ListProps) => {
  return (
    <Table
      pagination={false}
      columns={[
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
