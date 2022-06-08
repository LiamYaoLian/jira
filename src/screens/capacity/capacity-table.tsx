import React from "react";
import {Table} from "antd";

export const CapacityTable = (props: React.ComponentProps<typeof Table>) => {
  // TODO
  const dataSource = [
    {
      key: '1',
      name: 'Mike',
      'available-hours': 35,
      'planned-hours': 21,
      'actual-hours': 20,
      'remaining-actual-hours': 21-20,
      'planned-cost': 21 * 25,
    },
    {
      key: '2',
      name: 'John',
      'available-hours': 35,
      'planned-hours': 21,
      'actual-hours': 19,
      'remaining-actual-hours': 21-19,
      'planned-cost': 21 * 30,
    },
  ];

  const columns = [
    {
      title: 'Member Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Available Hours',
      dataIndex: 'available-hours',
      key: 'available-hours',
    },
    {
      title: 'Planned Hours',
      dataIndex: 'planned-hours',
      key: 'planned-hours',
    },
    {
      title: 'Actual Hours',
      dataIndex: 'actual-hours',
      key: 'actual-hours',
    },
    {
      title: 'Remaining Available Hours',
      dataIndex: 'remaining-actual-hours',
      key: 'remaining-actual-hours'
    }
  ];
  return <Table dataSource={dataSource} columns={columns} ></Table>
}