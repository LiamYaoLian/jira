/**
 * ProjectListScreen
 */
import React from 'react';
import {SearchPanel} from './search-panel';
import {List} from './list';
import {useDebounce, useDocumentTitle} from '../../utils';
import {useProjects} from '../../utils/project';
import {useUsers} from '../../utils/user';
import {useProjectModal, useProjectsSearchParams} from './util';
import {ButtonNoPadding, ErrorBox, Row, ScreenContainer} from 'components/lib';
import {Profiler} from '../../components/profiler';

export const ProjectListScreen = () => {

  useDocumentTitle('Project List', false);

  const {open} = useProjectModal()
  const [param, setParam] = useProjectsSearchParams();
  const {isLoading, error, data: list} = useProjects(useDebounce(param, 200));
  const {data: users} = useUsers();

  return (
    <Profiler id={'project-list'}>
      <ScreenContainer>
        <Row between={true}>
          <h1>Project List</h1>
          <ButtonNoPadding onClick={open} type={'link'}>Create New Project</ButtonNoPadding>
        </Row>
        <SearchPanel param={param} setParam={setParam}/>
        <ErrorBox error={error}/>
        <List loading={isLoading} users={users || []} dataSource={list || []}/>
      </ScreenContainer>
    </Profiler>

  );
};

ProjectListScreen.whyDidYouRender = false;


