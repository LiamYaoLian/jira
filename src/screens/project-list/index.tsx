import React from 'react';
import styled from '@emotion/styled';
import {Button, Typography } from 'antd';
import { SearchPanel } from './search-panel';
import { List } from './list';
import { useDebounce, useDocumentTitle } from '../../utils';
import { useProjects } from '../../utils/project';
import { useUsers } from '../../utils/user';
import { useProjectsSearchParams } from './util';
import {
    ButtonNoPadding,
    ErrorBox,
    Row,
    ScreenContainer,
} from "components/lib";

export const ProjectListScreen = (props: {setProjectModalOpen: (isOpen: boolean) => void }) => {
  useDocumentTitle('Project List', false);

  const [param, setParam] = useProjectsSearchParams();
  const { isLoading, error, data: list, retry } = useProjects(useDebounce(param, 200));
  const { data: users } = useUsers();

  return (
    <Container>
      <Row between={true}>
          <h1>Project List</h1>
          <Button onClick={() => props.setProjectModalOpen(true)}>Create Project</Button>
      </Row>

      <SearchPanel users={users || []} param={param} setParam={setParam} />
      {error ? (
        <Typography.Text type={'danger'}>{error.message}</Typography.Text>
      ) : null}
      <List refresh={retry} loading={isLoading} users={users || []} dataSource={list || []} />
    </Container>
  );
};

ProjectListScreen.whyDidYouRender = false;

const Container = styled.div`
  padding: 3.2rem;
`;
