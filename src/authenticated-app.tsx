import React from 'react';
import {ProjectListScreen} from "./screens/project-list";
import {useAuth} from "./context/auth-context";
import styled from "@emotion/styled";
import {Row} from "./components/lib";

export const AuthenticatedApp = () => {
    const {logout} = useAuth()


    return <Container>
        <Header between={true}>
            <HeaderLeft gap={true}>
                <h2>Logo</h2>
                <h2>Project</h2>
                <h2>User</h2>
            </HeaderLeft>
            <HeaderRight>
                <button onClick={logout}>log out</button>
            </HeaderRight>
        </Header>
        <Main>
            <ProjectListScreen/>
        </Main>
    </Container>;
}


// const Main = styled.main`
//     height: calc(100vh - 6rem)
//
// `

const Container = styled.div`
    display: grid;
    grid-template-rows: 6rem 1fr 6rem;
    height: 100vh;
`

const HeaderItem = styled.h3`
    margin-right: 3rem
`

const Header = styled(Row)``

const HeaderLeft = styled(Row)``

const HeaderRight = styled.header`

`

const Main = styled.main`
`