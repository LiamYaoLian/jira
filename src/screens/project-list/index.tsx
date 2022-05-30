import React from 'react';
import styled from '@emotion/styled';
import {Button, Typography } from 'antd';
import { SearchPanel } from './search-panel';
import { List } from './list';
import { useDebounce, useDocumentTitle } from '../../utils';
import { useProjects } from '../../utils/project';
import { useUsers } from '../../utils/user';
import { useProjectsSearchParams } from './util';
import { ButtonNoPadding, ErrorBox, Row } from "components/lib";
import {useProjectModal} from "../../utils/url";

export const ProjectListScreen = () => {
  useDocumentTitle('Project List', false);

  const {open} = useProjectModal()
  const [param, setParam] = useProjectsSearchParams();
  const { isLoading, error, data: list} = useProjects(useDebounce(param, 200));
  const { data: users } = useUsers();

  return (
    <Container>
      <Row between={true}>
          <h1>Project List</h1>
          <ButtonNoPadding onClick={open} type={'link'}>Create New Project</ButtonNoPadding>
      </Row>

      <SearchPanel users={users || []} param={param} setParam={setParam} />
      <ErrorBox error={error} />
      <List loading={isLoading} users={users || []} dataSource={list || []} />
    </Container>
  );
};

ProjectListScreen.whyDidYouRender = false;

const Container = styled.div`
  padding: 3.2rem;
`;
