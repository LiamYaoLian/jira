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
      </Container>
    </ScreenContainer>

  );
};

export const Container = styled.div`
  width: 115rem;
  display: flex;
  flex-direction: column;
  overflow: scroll;
`;
