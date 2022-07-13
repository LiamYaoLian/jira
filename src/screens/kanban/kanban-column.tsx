import React from 'react';
import { Kanban } from 'types/kanban';
import { useTaskTypes } from 'utils/task-type';
import taskIcon from 'assets/task.svg';
import bugIcon from 'assets/bug.svg';
import styled from '@emotion/styled';
import { Button, Card, Dropdown, Menu, Modal } from 'antd';
import { useTasks } from 'utils/task';
import {
    useKanbansQueryKey,
    useTasksModal,
    useTasksSearchParams,
} from 'screens/kanban/util';
import { CreateTask } from 'screens/kanban/create-task';
import { Task } from 'types/task';
import { Mark } from 'components/mark';
import { useDeleteKanban } from 'utils/kanban';
import { Row } from 'components/lib';
import { Drag, Drop, DropChild } from 'components/drag-and-drop';

/**
 * A function to return a task icon or a bug icon img based on id
 * @param id
 * @constructor
 */
const TaskTypeIcon = ({ id }: { id: number }) => {
    const { data: taskTypes } = useTaskTypes();
    const name = taskTypes?.find((taskType) => taskType.id === id)?.name;
    if (!name) return null;
    return <img alt={'task-icon'} src={name === 'task' ? taskIcon : bugIcon} />;
};

/**
 * A function to return a TaskCard
 * @param task
 * @constructor
 */
const TaskCard = ({ task }: { task: Task }) => {
    const { startEdit } = useTasksModal();
    const { name: keyword } = useTasksSearchParams();
    return (
        <Card
            onClick={() => startEdit(task.id)}
            style={{ marginBottom: '0.5rem', cursor: 'pointer' }}
            key={task.id}
        >
            <p>
                <Mark keyword={keyword} name={task.name} />
            </p>
            <TaskTypeIcon id={task.typeId} />
        </Card>
    );
};

// https://reactjs.org/docs/forwarding-refs.html
export const KanbanColumn = React.forwardRef<HTMLDivElement, { kanban: Kanban }
    >(({ kanban, ...props }, ref) => {
    const { data: allTasks } = useTasks(useTasksSearchParams());
    const tasks = allTasks?.filter(task => task.kanbanId === kanban.id);
    return (
        // ref.current will point <Container>
        <Container {...props} ref={ref}>
            <Row between={true}>
                <h3>{kanban.name}</h3>
                <More kanban={kanban} key={kanban.id} />
            </Row>
            <TasksContainer>
                {/* Drop: an area where you can drop something */}
                <Drop type={'ROW'} direction={'vertical'} droppableId={String(kanban.id)}>
                    {/* DropChild: a child of Drop, in nature is a div */}
                    <DropChild style={{ minHeight: '1rem' }}>
                        {tasks?.map((task, taskIndex) => (
                            <Drag key={task.id} index={taskIndex} draggableId={'task' + task.id}>
                                <div><TaskCard key={task.id} task={task} /></div>
                            </Drag>
                        ))}
                    </DropChild>
                </Drop>
                <CreateTask kanbanId={kanban.id} />
            </TasksContainer>
        </Container>
    );
});

const More = ({ kanban }: { kanban: Kanban }) => {
    const { mutateAsync } = useDeleteKanban(useKanbansQueryKey());
    const startDelete = () => {
        Modal.confirm({
            okText: 'Confirm',
            cancelText: 'Cancel',
            title: 'Are you sure about deleting this Kanban?',
            onOk() {
                return mutateAsync({ id: kanban.id });
            },
        });
    };
    const overlay = (
        <Menu>
            <Menu.Item><Button type={'link'} onClick={startDelete}>Delete</Button></Menu.Item>
        </Menu>
    );
    return (
        <Dropdown overlay={overlay}>
            <Button type={'link'}>...</Button>
        </Dropdown>
    );
};

export const Container = styled.div`
  min-width: 27rem;
  border-radius: 6px;
  background-color: rgb(244, 245, 247);
  display: flex;
  flex-direction: column;
  padding: 0.7rem 0.7rem 1rem;
  margin-right: 1.5rem;
  // TODO  
  overflow-x: scroll;
`;

const TasksContainer = styled.div`
  overflow: scroll; 
  // https://developer.mozilla.org/en-US/docs/Web/CSS/flex 
  // TODO  
  flex: 1;
  ::-webkit-scrollbar {
    display: none;
  }
`;
