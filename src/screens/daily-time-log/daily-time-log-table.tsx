import type { ProColumns } from '@ant-design/pro-components';
import { EditableProTable, ProFormRadio } from '@ant-design/pro-components';
import React, { useState } from 'react';
import {useTasks} from "../../utils/task";
import {useProjectInUrl} from "../kanban/util";

// const waitTime = (time: number = 100) => {
//   return new Promise((resolve) => {
//     setTimeout(() => {
//       resolve(true);
//     }, time);
//   });
// };

type DataSourceType = {
  id: React.Key;
  plannedHour?: number;
  actualHour?: number;
  task?: string;
  occurred_at?: string;
  update_at?: string;
};

export const DailyTimeLogTable = () => {
  const [editableKeys, setEditableRowKeys] = useState<React.Key[]>([]);
  const [dataSource, setDataSource] = useState<DataSourceType[]>([]);
  const [position, setPosition] = useState<'top' | 'bottom' | 'hidden'>('bottom');
  const { data: currentProject } = useProjectInUrl();

  // useQuery can return undefined at first
  const { data: tasks } = useTasks({ projectId: currentProject?.id });

  // TODO from and to backend
  const defaultData: DataSourceType[] = [
    {
      id: 624748504,
      plannedHour: 2,
      actualHour: 3,
      task: 'open',
      occurred_at: '2020-05-26T09:42:56Z',
      update_at: '2020-05-26T09:42:56Z',
    },
    {
      id: 624691229,
      plannedHour: 6,
      actualHour: 5,
      task: 'closed',
      occurred_at: '2020-05-26T08:19:22Z',
      update_at: '2020-05-26T08:19:22Z',
    },
  ];

  // useQuery can return undefined at first
  let options = {}
  if (tasks) {
    tasks.forEach((task) => {
      options = {...options, ...{['task' +task.id]: {'text': task.name}}}
    })
  }

  const columns: ProColumns<DataSourceType>[] = [
    {
      title: 'Task',
      key: 'task',
      dataIndex: 'task',
      valueType: 'select',
      valueEnum: {
        default: { text: 'Please choose', status: 'Default' },
        ...options
      },
      formItemProps: {
        rules: [
          // non-negative float
          {required: true}
        ]
      }

    },
    {
      title: 'Planned Hour',
      dataIndex: 'plannedHour',
      formItemProps: {
        rules: [
          // non-negative float
          {required: true, pattern: new RegExp('^\\d+(\\.\\d+)?$'), message: 'Please input a number'}
        ]
      }
    },
    {
      title: 'Actual Hour',
      dataIndex: 'actualHour',
      formItemProps: {
        rules: [
          // non-negative float
          {required: true}
        ]
      }
    },
    {
      title: 'Activity Date',
      dataIndex: 'occurred_at',
      valueType: 'date',
      formItemProps: {
        rules: [
          // non-negative float
          {required: true}
        ]
      }
    },
    {
      title: 'Operation',
      valueType: 'option',
      width: 200,
      render: (text, record, _, action) => [
        <a key="editable" onClick={() => action?.startEditable?.(record.id)}>Edit</a>,
        <a key="delete"
          onClick={() => setDataSource(dataSource.filter((item) => item.id !== record.id))}
        >
          Delete
        </a>,
      ],
    },
  ];

  return (
    <>
      <EditableProTable<DataSourceType>
        rowKey="id"
        headerTitle=""
        scroll={{x: 960}}
        recordCreatorProps={

          position !== 'hidden'
            ? {
              creatorButtonText: 'New Record',
              position: position as 'top',
              record: () => ({ id: (Math.random() * 1000000).toFixed(0) }),
            }
            : false
        }
        loading={false}
        toolBarRender={() => [
          <ProFormRadio.Group
            key="render"
            fieldProps={{
              value: position,
              onChange: (e) => setPosition(e.target.value),
            }}
            options={[
              {
                label: 'Add to Top',
                value: 'top',
              },
              {
                label: 'Add to Bottom',
                value: 'bottom',
              },
              {
                label: 'Hide New Record Button',
                value: 'hidden',
              },
            ]}
          />,
        ]}
        columns={columns}
        request={async () => ({
          data: defaultData,
          total: 3,
          success: true,
        })}
        value={dataSource}
        onChange={setDataSource}
        editable={
          {
            type: 'multiple',
            editableKeys,
            onChange: setEditableRowKeys,
          }
        }
      />
    </>
  );
};

