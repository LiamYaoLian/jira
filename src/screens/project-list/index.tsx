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
import {useDispatch} from "react-redux";
import {projectListActions} from "./project-list.slice";

export const ProjectListScreen = (props: {projectButton: JSX.Element}) => {
  useDocumentTitle('Project List', false);

  const [param, setParam] = useProjectsSearchParams();
  const { isLoading, error, data: list, retry } = useProjects(useDebounce(param, 200));
  const { data: users } = useUsers();
  const dispatch = useDispatch();

  return (
    <Container>
      <Row between={true}>
          <h1>Project List</h1>
          <ButtonNoPadding onClick={() => dispatch(projectListActions.openProjectModal())} type={'link'}></ButtonNoPadding>
      </Row>

      <SearchPanel users={users || []} param={param} setParam={setParam} />
      {error ? (
        <Typography.Text type={'danger'}>{error.message}</Typography.Text>
      ) : null}
      <List projectButton={props.projectButton} refresh={retry} loading={isLoading} users={users || []} dataSource={list || []} />
    </Container>
  );
};

ProjectListScreen.whyDidYouRender = false;

const Container = styled.div`
  padding: 3.2rem;
`;
