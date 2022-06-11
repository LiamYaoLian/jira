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

export const PageHeader = () => {
  return (
    <Header between={true}>
      <HeaderLeft gap={true}>
        <ButtonNoPadding type={'link'} onClick={resetRoute}>
          <SoftwareLogo/>
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

const User = () => {
  const {logout, user} = useAuth();

  // https://ant.design/components/dropdown/
  // overlay: the dropdown menu
  return <Dropdown
    overlay={
      <Menu>
        <Menu.Item key={'logout'}>
          <Button type={'link'} onClick={logout}>Log Out</Button>
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

// TODO review grid
// https://css-tricks.com/snippets/css/complete-guide-grid/
// fr: a fraction of the free space, https://css-tricks.com/introduction-fr-css-unit/
export const AppContainer = styled.div`
  display: grid;
  grid-template-rows: 6rem 1fr;
  height: 100vh;
  width: 100vw;
`;

const Header = styled(Row)`
  padding: 3.2rem;
  box-shadow: 0 0 5px 0 rgba(0, 0, 0, 0.1);
  z-index: 1;
`;

const HeaderLeft = styled(Row)`
`;

const HeaderRight = styled.header``;

export const AppMain = styled.main`
  display: flex;
  overflow: hidden;
`;
