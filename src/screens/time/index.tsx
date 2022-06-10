import React from 'react';
import { Row, ScreenContainer } from 'components/lib';
import { useProjectInUrl } from 'screens/kanban/util';
import {TimeTable} from "./time-table";

export const TimeScreen = () => {
  const { data: currentProject } = useProjectInUrl();

  return (
    <ScreenContainer>
      <Row between={true}>
        <h1>{currentProject?.name} Weekly Time</h1>
      </Row>
      <TimeTable/>
    </ScreenContainer>
  );
};
