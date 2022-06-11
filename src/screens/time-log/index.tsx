import React from 'react';
import { Row, ScreenContainer } from 'components/lib';
import { useProjectInUrl } from 'screens/kanban/util';
import {TimeLogTable} from "./time-log-table";

export const TimeLogScreen = () => {
  const { data: currentProject } = useProjectInUrl();

  return (
    <ScreenContainer>
      <Row between={true}>
        <h1>{currentProject?.name} Time Log</h1>
      </Row>
      <TimeLogTable/>
    </ScreenContainer>
  );
};
