import React from "react";
import {Table} from "antd";


// id: number;
// name: string;
// email: string;
// title: string;
// team: string;
// token: string;
// role?: string;


export const UserTable = (props: React.ComponentProps<typeof Table>) => {
  return <Table dataSource={props.dataSource}
                scroll={{x:'10rem', y: '45rem'}}
                columns={[
                  {title: 'name', dataIndex: 'name', key: 'name'},
                ]}>
  </Table>
}
