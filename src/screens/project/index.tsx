// TODO
import React from 'react';
import {Link} from 'react-router-dom';
import {Routes, Route, useLocation} from 'react-router';
import {EpicScreen} from '../epic';
import {KanbanScreen} from '../kanban';
import {CapacityScreen} from '../capacity';
import styled from "@emotion/styled";
import {Menu} from 'antd';

export const useRouteType = () => {
  const units = useLocation().pathname.split('/')
  return units[units.length - 1]
}

export const ProjectScreen = () => {
  const routeType = useRouteType()
  return (
    <Container>
      <Aside>
        <Menu mode={'inline'} selectedKeys={[routeType]}>
          <Menu.Item key={'kanban'}>
            <Link to={'kanban'}>Kanban</Link>
          </Menu.Item>
          <Menu.Item key={'epic'}>
            <Link to={'epic'}>Epic</Link>
          </Menu.Item>
          <Menu.Item key={'capacity'}>
            <Link to={'capacity'}>Capacity</Link>
          </Menu.Item>

        </Menu>

      </Aside>
      <Main>
        <Routes>
          <Route path={'/kanban'} element={<KanbanScreen/>}/>
          <Route path={'/epic'} element={<EpicScreen/>}/>
          <Route path={'/capacity'} element={<CapacityScreen/>}/>
          <Route index element={<KanbanScreen/>}/>
        </Routes>
      </Main>

    </Container>
  );
};

export const Aside = styled.aside`
  background-color: rgb(244, 245, 247);
  display: flex;
`

export const Main = styled.div`
  box-shadow: -5px 0 5px -5px rgba(0, 0, 0, 0.1);
  display: flex;
`

export const Container = styled.div`
  display: grid;
  grid-template-columns: 16rem 1fr;
`
