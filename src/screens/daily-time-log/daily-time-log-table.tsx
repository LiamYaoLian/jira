import React from "react";
import {Table} from "antd";

export const DailyTimeLogTable = (props: React.ComponentProps<typeof Table>) => {
  // TODO to finish
  const dataSource = [
    {
      key: '1',
      name: 'Mike',
      'task': 'Task 1',
      'actual-hours': 3,

    },
    {
      key: '2',
      name: 'Mike',
      'task': 'Task 2',
      'actual-hours': 5
    },
  ];

  const columns = [
    {
      title: 'Member Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Task',
      dataIndex: 'task',
      key: 'task',
    },
    {
      title: 'Actual Hours',
      dataIndex: 'actual-hours',
      key: 'actual-hours',
    },{

    }
  ];
  return <Table dataSource={dataSource} columns={columns} ></Table>
}
