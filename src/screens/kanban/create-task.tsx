import React, { useEffect, useState } from 'react';
import { useAddTask } from 'utils/task';
import { useProjectIdInUrl, useTasksQueryKey } from 'screens/kanban/util';
import { Card, Input } from 'antd';

/**
 * CreateTask component
 * @param kanbanId
 * @constructor
 */
export const CreateTask = ({ kanbanId }: { kanbanId: number }) => {
  const [name, setName] = useState('');
  const { mutateAsync: addTask } = useAddTask(useTasksQueryKey());
  const projectId = useProjectIdInUrl();
  // whether the user can input
  const [inputMode, setInputMode] = useState(false);

  const submit = async () => {
    await addTask({ projectId, name, kanbanId });
    setInputMode(false);
    setName('');
  };

  const toggle = () => setInputMode((mode) => !mode);

  // if current it is not in inputMode, set name to ''
  useEffect(() => {
    if (!inputMode) setName('')
  }, [inputMode]);

  // if not in inputMode, show a div
  if (!inputMode) {
    return <div onClick={toggle}>+Create Task</div>;
  }

  return (
    <Card>
      <Input
        onBlur={toggle}
        placeholder={'To-do'}
        autoFocus={true}
        onPressEnter={submit}
        value={name}
        onChange={(evt) => setName(evt.target.value)}
      />
    </Card>
  );
};