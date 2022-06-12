import React from "react";
import {Table} from "antd";

export const UserTable = (props: React.ComponentProps<typeof Table>) => {
  return <Table dataSource={props.dataSource}
                scroll={{x:'10rem', y: '45rem'}}
                columns={[
                  {title: 'Total Hours', dataIndex: 'totalHours', key: 'plannedHours'},
                  {title: 'Planned Hours', dataIndex: 'plannedHours', key: 'plannedHours'},
                  {title: 'Actual Hours', dataIndex: 'actualHours', key: 'actualHours'},
                  {title: 'Remaining (Planned Hours)', dataIndex: 'remainingPlannedHours', key: 'remainingPlannedHours'},
                  {title: 'Remaining (Actual Hours)', dataIndex: 'remainingActualHours', key: 'remainingActualHours'},
                ]}>
  </Table>
}
