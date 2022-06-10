// TODO to finish
import React from 'react';
import {Menu} from "antd";
import {Link} from "react-router-dom";
import {Route, Routes} from "react-router";
import {KanbanScreen} from "../screens/kanban";
import {EpicScreen} from "../screens/epic";
import {TimeScreen} from "../screens/time";
import {Aside, Main, useRouteType} from "../screens/project";
import {AppMain, PageHeader} from "../authenticated-app";
import {AppContainer} from "../authenticated-app";
import {DailyTimeLogScreen} from "../screens/daily-time-log";

export default () => {
  const routeType = useRouteType()
    return (
      <AppContainer>
        <PageHeader/>
        <AppMain>
          <Aside>
            <Menu mode={'inline'} selectedKeys={[routeType]}>
              <Menu.Item key={'kanban'}>
                <Link to={'kanban'}>Kanban</Link>
              </Menu.Item>
              <Menu.Item key={'epic'}>
                <Link to={'epic'}>Epic</Link>
              </Menu.Item>


            </Menu>

          </Aside>
          <Main>
            <Routes>
              <Route path={'/kanban'} element={<KanbanScreen/>}/>
              <Route path={'/epic'} element={<EpicScreen/>}/>

            </Routes>
          </Main>
        </AppMain>
      </AppContainer>
    );
};


