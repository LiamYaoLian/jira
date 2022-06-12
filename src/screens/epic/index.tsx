/**
 * Epic screen
 */
import React, { useState } from 'react';
import { Row, ScreenContainer } from 'components/lib';
import { useProjectInUrl } from 'screens/kanban/util';
import { useDeleteEpic, useEpics } from 'utils/epic';
import { Button, List, Modal } from 'antd';
import dayjs from 'dayjs';
import { useTasks } from 'utils/task';
import { Link } from 'react-router-dom';
import { useEpicSearchParams, useEpicsQueryKey } from 'screens/epic/util';
import { Epic } from 'types/epic';
import { CreateEpic } from 'screens/epic/create-epic';
import styled from "@emotion/styled";

export const EpicScreen = () => {
  const { data: currentProject } = useProjectInUrl();
  const { data: epics } = useEpics(useEpicSearchParams());
  const { data: tasks } = useTasks({ projectId: currentProject?.id });
  const { mutate: deleteEpic } = useDeleteEpic(useEpicsQueryKey());
  const [epicCreateOpen, setEpicCreateOpen] = useState(false);

  const confirmDeleteEpic = (epic: Epic) => {
    Modal.confirm({
      title: `Confirm Deleting Epic：${epic.name}`,
      content: 'Click to Delete',
      okText: 'OK',
      onOk() {
        deleteEpic({ id: epic.id });
      },
    });
  };

  return (
    <ScreenContainer>
      <Row between={true}>
        <h1>{currentProject?.name} Epic</h1>
        <Button onClick={() => setEpicCreateOpen(true)} type={'link'}>Create Epic</Button>
      </Row>
      <List
        style={{ height: 'calc(100vh - 30rem)', width: 'calc(40vw)', overflow: 'scroll' }}
        dataSource={epics}
        itemLayout={'vertical'}
        renderItem={(epic) => (
          <List.Item>
            <List.Item.Meta
              title={
                <Row between={true}>
                  <span>{epic.name}</span>
                  <Button onClick={() => confirmDeleteEpic(epic)} type={'link'}>Delete</Button>
                </Row>
              }
              description={
                <div>
                  <div>Start Time：{dayjs(epic.start).format('YYYY-MM-DD')}</div>
                  <div>End Time：{dayjs(epic.end).format('YYYY-MM-DD')}</div>
                </div>
              }
            />
            <div style={{}}>
              {tasks?.filter((task) => task.epicId === epic.id)
                .map((task) => (
                  <Link
                    to={`/projects/${currentProject?.id}/kanban?editingTaskId=${task.id}`}
                    key={task.id} style={{margin: '0 3rem 0 0'}}
                  >
                    {task.name}
                  </Link>
                ))}
            </div>
          </List.Item>
        )}
      />
      <CreateEpic onClose={() => setEpicCreateOpen(false)} visible={epicCreateOpen}/>
    </ScreenContainer>
  );
};


