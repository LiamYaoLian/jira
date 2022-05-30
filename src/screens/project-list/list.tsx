import React from 'react';
import {Dropdown, Table, Menu, Modal } from 'antd';
import { TableProps } from 'antd/es';
import dayjs from 'dayjs';
import { User } from './search-panel';
import { Link } from 'react-router-dom';
import {Pin} from "../../components/pin";
import {useEditProject} from "../../utils/project";
import { ButtonNoPadding } from 'components/lib';
import {useProjectModal, useProjectsQueryKey} from "./util";

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
}

export const List = ({ users, ...props }: ListProps) => {
  const {mutate} = useEditProject(useProjectsQueryKey())
  const pinProject = (id: number) => (pin: boolean) => mutate({id, pin})

  return (
    <Table
      rowKey={"id"}
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
          title: 'Orginazation',
          dataIndex: 'organization',
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
            render(value, project) {
                return<Dropdown overlay={<Menu>
                    <Menu.Item key={'edit'}>
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

// const More = ({ project }: { project: Project }) => {
//   const { startEdit } = useProjectModal();
//   const editProject = (id: number) => () => startEdit(id);
//   const { mutate: deleteProject } = useDeleteProject(useProjectsQueryKey());
//   const confirmDeleteProject = (id: number) => {
//     Modal.confirm({
//       title: "确定删除这个项目吗?",
//       content: "点击确定删除",
//       okText: "确定",
//       onOk() {
//         deleteProject({ id });
//       },
//     });
//   };
//   return (
//     <Dropdown
//       overlay={
//         <Menu>
//           <Menu.Item onClick={editProject(project.id)} key={"edit"}>
//             编辑
//           </Menu.Item>
//           <Menu.Item
//             onClick={() => confirmDeleteProject(project.id)}
//             key={"delete"}
//           >
//             删除
//           </Menu.Item>
//         </Menu>
//       }
//     >
//       <ButtonNoPadding type={"link"}>...</ButtonNoPadding>
//     </Dropdown>
//   );
// };
