import type {ProColumns} from '@ant-design/pro-components';
import {EditableProTable, ProFormRadio} from '@ant-design/pro-components';
import React, {useState} from 'react';
import {useProjectInUrl} from "../kanban/util";
import {TimeLog} from "../../types/time-log";
import {Task} from "../../types/task";

interface TimeLogTableProps {
  tasks: Task[]
  timeLogs: TimeLog[]
}

// TODO time log persistency

export const TimeLogTable = (props: TimeLogTableProps) => {

  const {data: currentProject} = useProjectInUrl();
  const defaultDataSource: TimeLog[] = props.timeLogs;
  const [editableKeys, setEditableRowKeys] = useState<React.Key[]>([]);
  const [dataSource, setDataSource] = useState<TimeLog[] | undefined>([]);
  const [position, setPosition] = useState<'top' | 'bottom' | 'hidden'>('bottom');
  const tasks = props.tasks;
  let options = {}
  if (tasks) {
    tasks.forEach((task) => {
      options = {...options, ...{['task' + task.id]: {'text': task.name}}}
    })
  }

  const columns: ProColumns<TimeLog>[] = [
    {
      title: 'Task',
      key: 'taskName',
      dataIndex: 'taskName',
      valueType: 'select',
      valueEnum: {
        default: {text: 'Please choose', status: 'Default'},
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
      dataIndex: 'occurredAt',
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
           onClick={() => setDataSource(dataSource?.filter((item) => item.id !== record.id))}
        >
          Delete
        </a>,
      ],
    },
  ];

  return (
    <>
      <EditableProTable<TimeLog>
        rowKey="id"
        headerTitle=""
        scroll={{x: 960}}
        recordCreatorProps={
          position !== 'hidden'
            ? {
              creatorButtonText: 'New Record',
              position: position as 'top',
              record: () => ({id: (Math.random() * 1000000).toFixed(0), projectId: currentProject?.id as number}),
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
          data: defaultDataSource,
          // TODO
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

