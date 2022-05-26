// to review
import React, {useState} from 'react';
import { ProjectListScreen } from './screens/project-list';
import { useAuth } from './context/auth-context';
import styled from '@emotion/styled';
import {ButtonNoPadding, Row } from './components/lib';
import { ReactComponent as SoftwareLogo } from 'assets/software-logo.svg';
import { Button, Dropdown, Menu } from 'antd';
import { Navigate, Route, Routes } from 'react-router';
import { ProjectScreen } from './screens/project';
import { BrowserRouter as Router } from 'react-router-dom';
import { resetRoute } from 'index';
import {ProjectModal} from "./screens/project-list/project-modal";
import {ProjectPopover} from "./components/project-popover";

export const AuthenticatedApp = () => {
  const [projectModalOpen, setProjectModalOpen] = useState(false)

  return (
    <Container>
      <PageHeader projectButton={
          <ButtonNoPadding onClick={() => setProjectModalOpen(true)} type={'link'}>Create New Project</ButtonNoPadding>
      } />
      <Main>
        <Router>
          {/*<Navigate to={'/projects'}/>*/}
          <Routes>
            <Route path={'/projects'} element={<ProjectListScreen projectButton={
                <ButtonNoPadding onClick={() => setProjectModalOpen(true)} type={'link'}>Create New Project</ButtonNoPadding>
            } />}/>
            <Route
              path={'/projects/:projectId/*'}
              element={<ProjectScreen />} />
            {/*<Route index element={<ProjectListScreen/>}/>*/}
            <Route index element={<Navigate to={'/projects'} />} />
          </Routes>
        </Router>
      </Main>
      <ProjectModal projectModalOpen={projectModalOpen} onClose={() => setProjectModalOpen(false)} />
    </Container>
  );
};

const Container = styled.div`
  display: grid;
  grid-template-rows: 6rem 1fr 6rem;
  height: 100vh;
`;
const Header = styled(Row)`
  padding: 3.2rem;
  box-shadow: 0 0 5px 0 rgba(0, 0, 0, 0.1);
  z-index: 1;
`;

const HeaderLeft = styled(Row)``;

const HeaderRight = styled.header``;

const Main = styled.main``;

const PageHeader = (props: {projectButton: JSX.Element }) => {
  return (
    <Header between={true}>
      <HeaderLeft gap={true}>
        <ButtonNoPadding type={'link'} onClick={resetRoute}>
          <SoftwareLogo width={'18rem'} color={'rgb(38, 132, 255)'} />
        </ButtonNoPadding>
        <ProjectPopover {...props}/>
        <span>User</span>
      </HeaderLeft>
      <HeaderRight>
        <User/>
      </HeaderRight>
    </Header>
  );
};

const User = () => {
    const { logout, user } = useAuth();

    return <Dropdown
        overlay={
            <Menu>
                <Menu.Item key={'logout'}>
                    <Button type={'link'} onClick={logout}>
                        Log Out
                    </Button>
                </Menu.Item>
            </Menu>
        }
    >
        {/*to prevent refresh*/}
        <Button type={'link'} onClick={(e) => e.preventDefault()}>
            Hi, {user?.name}
        </Button>
    </Dropdown>
}


