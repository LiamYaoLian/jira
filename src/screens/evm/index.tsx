import React from 'react';
import {Row, ScreenContainer} from 'components/lib';
import { useProjectInUrl } from 'screens/kanban/util';
import { EvmTable } from './evm-table';


export const EvmScreen = () => {
  const { data: currentProject } = useProjectInUrl();

  // TODO style
  return (
    <ScreenContainer style={{overflow:' scroll'}}>
      <Row between={true}>
        <h1>{currentProject?.name} EVM</h1>
      </Row>
      <EvmTable/>
    </ScreenContainer>
  );
};
