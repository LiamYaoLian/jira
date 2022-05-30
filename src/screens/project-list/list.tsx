import React from 'react';
import {Dropdown, Menu, Table} from 'antd';
import {TableProps} from 'antd/es';
import dayjs from 'dayjs';
import {User} from './search-panel';
import {Link} from 'react-router-dom';
import {Pin} from "../../components/pin";
import {useEditProject} from "../../utils/project";
import {ButtonNoPadding} from 'components/lib';
import {projectListActions} from "./project-list.slice";
import {useDispatch} from "react-redux";

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
  projectButton: JSX.Element
}

export const List = ({users, ...props}: ListProps) => {
  const {mutate} = useEditProject()
  const pinProject = (id: number) => (pin: boolean) => mutate({id, pin}).then(props.refresh)
  const dispatch = useDispatch();

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
        {
          render(value, project) {
            return <Dropdown overlay={<Menu>
              <Menu.Item key={'edit'}>
                {props.projectButton}
                <ButtonNoPadding onClick={() => dispatch(projectListActions.openProjectModal())}
                                 type={'link'}>Edit</ButtonNoPadding>
              </Menu.Item>
            </Menu>}>
              <ButtonNoPadding type={'link'}>...</ButtonNoPadding>
            </Dropdown>
          }
        }
      ]}
      {...props}
    />
  );
};
