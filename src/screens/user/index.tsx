/**
 * UserScreen
 */
import React from 'react';
import {useDocumentTitle} from '../../utils';
import {Row, ScreenContainer} from "components/lib";
import {UserTable} from "./user-table";
import {useUserInUrl} from "./util";
import {useCapacityRecords} from "../../utils/capacity";

export const UserScreen = () => {
  useDocumentTitle('User Capacity', false);
  const {data: userForInfo} = useUserInUrl();
  const {data: capacityRecord} = useCapacityRecords({userId: userForInfo?.id});
  console.log(JSON.stringify(capacityRecord))

  return (
      <ScreenContainer>
        <Row between={true}>
          <h1>{userForInfo?.name}'s Capacity</h1>
        </Row>
        <UserTable dataSource={capacityRecord}/>
      </ScreenContainer>
  );
};



