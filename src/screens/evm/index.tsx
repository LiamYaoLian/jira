import React from 'react';
import {Row} from 'components/lib';
import { useProjectInUrl } from 'screens/kanban/util';
import { EvmTable } from './evm-table';
import styled from "@emotion/styled";
import {useEvms} from "../../utils/evm";

export const EvmScreen = () => {
  const { data: currentProject } = useProjectInUrl();
  const {data: evms} = useEvms({ projectId: currentProject?.id });
  return (
      <Container>
        <Row between={true} style={{marginBottom: '2rem'}} >
          <h1>{currentProject?.name} EVM</h1>
        </Row>
        <EvmTable dataSource={evms}/>
      </Container>
  );
};

export const Container = styled.div`
  padding: 3.2rem;
  width: calc(100vw - 16rem);
  //width: calc(100vw - 16rem);
  display: flex;
  flex-direction: column;
  overflow: scroll;
`;
