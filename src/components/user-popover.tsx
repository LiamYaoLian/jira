import React from 'react';
import { Divider, List, Popover, Typography } from 'antd';
import styled from '@emotion/styled';
import { useUsers } from 'utils/user';
import {ButtonNoPadding} from "./lib";
import {Route, Routes} from "react-router";
import {KanbanScreen} from "../screens/kanban";
import {EpicScreen} from "../screens/epic";

/**
 * UserPopover component
 * @constructor
 */
export const UserPopover = () => {
  const { data: users, refetch } = useUsers();
  const setRoute = (userId: number) => {
    window.location.href = window.location.origin + '/users/' + userId
  }

  const content = (
    <ContentContainer>
      <Typography.Text type={'secondary'}>Member List</Typography.Text>
      <List>
        {users?.map((user) => (
          <List.Item key={user.id}>
            {/*<List.Item.Meta title={user.name} />*/}
            <ButtonNoPadding
              style={{textAlign: "left"}}
              type={'link'}
              onClick={() => setRoute(user.id)}>{user.name}</ButtonNoPadding>
          </List.Item>
        ))}
      </List>
      <Divider />
    </ContentContainer>
  );

  return (
    <Popover
      onVisibleChange={() => refetch()}
      placement={'bottom'}
      content={content}
    >
      <span>Member</span>
    </Popover>
  );
};

const ContentContainer = styled.div`
  min-width: 30rem;
`;
