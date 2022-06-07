import React from 'react';
import { IdSelect } from 'components/id-select';
import { useTaskTypes } from 'utils/task-type';

/**
 * Select component for task types
 * @param props
 * @constructor
 */
export const TaskTypeSelect = (
    props: React.ComponentProps<typeof IdSelect>
) => {
    const { data: taskTypes } = useTaskTypes();
    return <IdSelect options={taskTypes || []} {...props} />;
};