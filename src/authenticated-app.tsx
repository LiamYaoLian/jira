// to review
import React from 'react';
import {ProjectListScreen} from './screens/project-list';
import {useAuth} from './context/auth-context';
import styled from '@emotion/styled';
import {ButtonNoPadding, Row} from './components/lib';
import {ReactComponent as SoftwareLogo} from 'assets/software-logo.svg';
import {Button, Dropdown, Menu} from 'antd';
import {Route, Routes} from 'react-router';
import {ProjectScreen} from './screens/project';
import {BrowserRouter as Router} from 'react-router-dom';
import {resetRoute} from 'index';
import {ProjectModal} from "./screens/project-list/project-modal";
import {ProjectPopover} from "./components/project-popover";
import {UserPopover} from "./components/user-popover";

export default () => {
  return (
    <Container>
      <Router>
        <PageHeader/>
        <Main>
          <Routes>
            <Route path={'/projects'} element={<ProjectListScreen/>}/>
            <Route
              path={'/projects/:projectId/*'}
              element={<ProjectScreen/>}/>
            <Route index element={<ProjectListScreen/>}/>
            {/*<Route index element={<Navigate to={'/projects'}/>}/>*/}
          </Routes>
        </Main>
        <ProjectModal/>
      </Router>
    </Container>
  );
};


const PageHeader = () => {
  return (
    <Header between={true}>
      <HeaderLeft gap={true}>
        <ButtonNoPadding type={'link'} onClick={resetRoute}>
          <SoftwareLogo width={'18rem'} color={'rgb(38, 132, 255)'}/>
        </ButtonNoPadding>
        <ProjectPopover/>
        <UserPopover/>
        {/*<span>User</span>*/}
      </HeaderLeft>
      <HeaderRight>
        <User/>
      </HeaderRight>
    </Header>
  );
};

const User = () => {
  const {logout, user} = useAuth();

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


const Container = styled.div`
  display: grid;
  grid-template-rows: 6rem 1fr;
  height: 100vh;
`;
const Header = styled(Row)`
  padding: 3.2rem;
  box-shadow: 0 0 5px 0 rgba(0, 0, 0, 0.1);
  z-index: 1;
`;

const HeaderLeft = styled(Row)``;

const HeaderRight = styled.header``;

const Main = styled.main`
  display: flex;
  overflow: hidden;
`;
