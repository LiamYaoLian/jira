import React from 'react';
import { Row, ScreenContainer } from 'components/lib';
import { useProjectInUrl } from 'screens/kanban/util';
import {DailyTimeLogTable} from "./daily-time-log-table";

export const DailyTimeLogScreen = () => {
  const { data: currentProject } = useProjectInUrl();

  return (
    <ScreenContainer>
      <Row between={true}>
        <h1>{currentProject?.name} Daily Time Log</h1>
      </Row>
      <DailyTimeLogTable/>
    </ScreenContainer>
  );
};
