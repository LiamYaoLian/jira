import type {ProColumns} from '@ant-design/pro-components';
import {EditableProTable, ProFormRadio} from '@ant-design/pro-components';
import React, {Dispatch, SetStateAction, useState} from 'react';
import {useProjectInUrl} from "../kanban/util";
import {TimeLog} from "../../types/time-log";
import {Task} from "../../types/task";
import {useAddTimeLog, useDeleteTimeLog, useEditTimeLog, useMaxTimeLogId} from "../../utils/time-log";
import {useTimeLogsQueryKey} from "./util";

interface TimeLogTableProps {
  tasks: Task[]
  timeLogs: TimeLog[]
  dataSource: TimeLog[] | undefined,
  setDataSource: Dispatch<SetStateAction<TimeLog[] | undefined>>
}

export const TimeLogTable = (props: TimeLogTableProps) => {

  const {data: currentProject} = useProjectInUrl();
  const {data: maxId} = useMaxTimeLogId();
  const {mutateAsync: addTimeLog} = useAddTimeLog(useTimeLogsQueryKey());
  const {mutateAsync: deleteTimeLog} = useDeleteTimeLog(useTimeLogsQueryKey());
  const {mutateAsync: editTimeLog} = useEditTimeLog(useTimeLogsQueryKey());
  const [editableKeys, setEditableRowKeys] = useState<React.Key[]>([]);
  const [position, setPosition] = useState<'top' | 'bottom' | 'hidden'>('bottom');

  const tasks = props.tasks;
  let options = {}
  if (tasks) {
    tasks.forEach((task) => {
      // 'task' + task.id
      options = {...options, ...{[task.name]: {'text': task.name}}}
    })
  }

  const columns: ProColumns<TimeLog>[] = [
    {
      title: 'Task',
      key: 'taskName',
      dataIndex: 'taskName',
      valueType: 'select',
      valueEnum: {
        ...options
      },
      formItemProps: {
        rules: [
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
          {required: true, pattern: new RegExp('^\\d+(\\.\\d+)?$'), message: 'Please input a non-negative number'}
        ]
      }
    },
    {
      title: 'Actual Hour',
      dataIndex: 'actualHour',
      formItemProps: {
        rules: [
          // non-negative float
          {required: true, pattern: new RegExp('^\\d+(\\.\\d+)?$'), message: 'Please input a non-negative number'}
        ]
      }
    },
    {
      title: 'Activity Date',
      dataIndex: 'occurredAt',
      valueType: 'date',
      formItemProps: {
        rules: [
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
           onClick={() => {
             deleteTimeLog({id: Number(record.id)}).then(() => {
               props.setDataSource(props.dataSource?.filter((item) => item.id !== record.id))
             })

           }}
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
              record: () => ({id: (Number(maxId) + 1).toFixed(0), projectId: currentProject!.id as number}),
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
          data: props.timeLogs
        })}
        value={props.dataSource}
        onChange={props.setDataSource}
        editable={
          {
            type: 'multiple',
            editableKeys,
            onChange: setEditableRowKeys,
            onSave: (key, record, originalRow, newLineConfig) => {
              return editTimeLog(record).catch(() => {
                return addTimeLog(record);
              });
              //return addTimeLog(record);


            }
          }
        }
      />
    </>
  );
};

