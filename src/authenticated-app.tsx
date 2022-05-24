import React from 'react';
import {ProjectListScreen} from './screens/project-list';
import {useAuth} from './context/auth-context';
import styled from '@emotion/styled';
import {Row} from './components/lib';
import {ReactComponent as SoftwareLogo} from 'assets/software-logo.svg';
import {Button, Dropdown, Menu} from 'antd';
import {Navigate, Route, Routes} from 'react-router';
import {ProjectScreen} from "./screens/project";
import {BrowserRouter as Router} from 'react-router-dom';
import { resetRoute } from 'index';

export const AuthenticatedApp = () => {

    return <Container>
        <PageHeader/>
        <Main>

            <Router>
                {/*<Navigate to={'/projects'}/>*/}
                <Routes>
                    <Route path={'/projects'} element={<ProjectListScreen/>}></Route>
                    <Route path={'/projects/:projectId/*'} element={<ProjectScreen/>}></Route>
                    <Route index element={<ProjectListScreen/>}/>
                </Routes>
            </Router>
        </Main>
    </Container>;
}



const Container = styled.div`
    display: grid;
    grid-template-rows: 6rem 1fr 6rem;
    height: 100vh;
`
const Header = styled(Row)`
  padding: 3.2rem;
  box-shadow: 0 0 5px 0 rgba(0, 0, 0, 0.1);
  z-index: 1;
`

const HeaderLeft = styled(Row)``

const HeaderRight = styled.header`
`

const Main = styled.main`
`

const PageHeader = () => {
    const {logout, user} = useAuth()

    return <Header between={true}>
        <HeaderLeft gap={true}>
            <Button type={'link'} onClick={resetRoute}>
                <SoftwareLogo width={'18rem'} color={'rgb(38, 132, 255)'}/>
            </Button>
            <h2>Project</h2>
            <h2>User</h2>
        </HeaderLeft>
        <HeaderRight>
            <Dropdown overlay={<Menu>
                <Menu.Item key={'logout'}>
                    {/*<a onClick={logout}>Log Out</a>*/}
                    <Button type={'link'} onClick={logout}>Log Out</Button>
                </Menu.Item>
            </Menu>}>
                {/*to prevent refresh*/}

                <Button type={'link'} onClick={e => e.preventDefault()}>Hi, {user?.name}</Button>
            </Dropdown>

        </HeaderRight>
    </Header>
}