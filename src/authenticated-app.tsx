import React from 'react';
import {ProjectListScreen} from "./screens/project-list";
import {useAuth} from "./context/auth-context";
import styled from "@emotion/styled";

export const AuthenticatedApp = () => {
    const {logout} = useAuth()


    return <Container>
        <Header>
            <HeaderLeft>
                <h3>Logo</h3>
                <h3>Project</h3>
                <h3>User</h3>
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

const PageHeader = styled.header`
    background-color: gray;
    height: 6rem;
`

// const Main = styled.main`
//     height: calc(100vh - 6rem)
//
// `

const Container = styled.div`
    display: grid;
    grid-template-rows: 6rem 1fr 6rem;
    grid-template-columns: 20rem 1fr 20rem;
    grid-template-areas: 
    "header header header"
    "nav main aside"
    "footer footer footer";
    height: 100vh;
    grid-gap: 10rem;
`

const Header = styled.header`
    grid-area: header;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
`

const HeaderLeft = styled.header`
    display: flex;
    align-items: center;
`

const HeaderRight = styled.header`

`

const Main = styled.main`
    grid-area: main
`

const Nav = styled.nav`
    grid-aread: nav
`

const Aside = styled.aside`
    grid-area: aside
`

const Footer = styled.footer`
    grid-area: footer
`