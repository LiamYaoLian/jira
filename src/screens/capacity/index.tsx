import React from 'react';
import { Row, ScreenContainer } from 'components/lib';
import { useProjectInUrl } from 'screens/kanban/util';
import {CapacityTable} from "./capacity-table";

export const CapacityScreen = () => {
  const { data: currentProject } = useProjectInUrl();

  return (
    <ScreenContainer>
      <Row between={true}>
        <h1>{currentProject?.name} Weekly Capacity</h1>
      </Row>
      <CapacityTable/>
    </ScreenContainer>
  );
};