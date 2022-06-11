import React from 'react';
import {Row, ScreenContainer} from 'components/lib';
import { useProjectInUrl } from 'screens/kanban/util';
import { EvmTable } from './evm-table';
import styled from "@emotion/styled";

export const EvmScreen = () => {
  const { data: currentProject } = useProjectInUrl();

  return (
    <ScreenContainer>
      <Row between={true} style={{marginBottom: '2rem'}} >
        <h1>{currentProject?.name} EVM</h1>
      </Row>
      <Container>
        <EvmTable/>
        <div style={{width: '3rem'}}></div>
      </Container>
    </ScreenContainer>

  );
};

export const Container = styled.div`
  width: calc(100vw - 16rem - 7rem);
  display: flex;
  overflow: scroll;
`;
