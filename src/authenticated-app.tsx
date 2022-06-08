// TODO
import React from 'react';
import {ProjectListScreen} from './screens/project-list';
import {useAuth} from './context/auth-context';
import styled from '@emotion/styled';
import {ButtonNoPadding, Row} from './components/lib';
import {ReactComponent as SoftwareLogo} from 'assets/software-logo.svg';
import {Button, Dropdown, Menu} from 'antd';
import {Route, Routes} from 'react-router';
import {ProjectScreen} from './screens/project';
import {ProjectModal} from './screens/project-list/project-modal';
import {ProjectPopover} from './components/project-popover';
import {UserPopover} from './components/user-popover';
import {resetRoute} from './utils';

export default () => {
  return (
    <AppContainer>
      <PageHeader/>
      <AppMain>
        <Routes>
          <Route path={'/projects'} element={<ProjectListScreen/>}/>
          <Route
            path={'/projects/:projectId/*'}
            element={<ProjectScreen/>}/>
          <Route index element={<ProjectListScreen/>}/>
        </Routes>
      </AppMain>
      <ProjectModal/>
    </AppContainer>
  );
};

// TODO review antd components
export const PageHeader = () => {
  return (
    <Header between={true}>
      <HeaderLeft gap={true}>
        <ButtonNoPadding type={'link'} onClick={resetRoute}>
          <SoftwareLogo width={'18rem'} color={'rgb(38, 132, 255)'}/>
        </ButtonNoPadding>
        <ProjectPopover/>
        <UserPopover/>
      </HeaderLeft>
      <HeaderRight>
        <User/>
      </HeaderRight>
    </Header>
  );
};

// TODO review antd components
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

// TODO review css
// TODO grid
export const AppContainer = styled.div`
  display: grid;
  grid-template-rows: 6rem 1fr;
  height: 100vh;
`;

const Header = styled(Row)`
  padding: 3.2rem;
  // TODO
  box-shadow: 0 0 5px 0 rgba(0, 0, 0, 0.1);
  z-index: 1;
`;

// TODO Row
const HeaderLeft = styled(Row)``;

const HeaderRight = styled.header``;

// TODO flex
export const AppMain = styled.main`
  display: flex;
  overflow: hidden;
`;
