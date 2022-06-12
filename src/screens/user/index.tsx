/**
 * MemberScreen
 */
import React from 'react';
import {useDocumentTitle} from '../../utils';
import {Row, ScreenContainer} from "components/lib";
import {UserTable} from "./user-table";
import {useUserInUrl} from "./util";


// TODO
export const UserScreen = () => {

  useDocumentTitle('User Capacity', false);
  const {data: userForInfo} = useUserInUrl();
  console.log(JSON.stringify(userForInfo));

  return (
      <ScreenContainer>
        <Row between={true}>
          <h1>{userForInfo?.name}'s Capacity</h1>
        </Row>
        <UserTable dataSource={[]}/>
      </ScreenContainer>

  );
};



