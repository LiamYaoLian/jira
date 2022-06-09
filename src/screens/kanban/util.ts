import { useLocation } from 'react-router';
import { useProject } from 'utils/project';
import { useUrlQueryParam } from 'utils/url';
import { useCallback, useMemo } from 'react';
import { useTask } from 'utils/task';

/**
 * a function to get the project id in URL
 */
export const useProjectIdInUrl = () => {
  const { pathname } = useLocation();
  const id = pathname.match(/projects\/(\d+)/)?.[1];
  return Number(id);
};

/**
 * a function to get the project object from url
 */
export const useProjectInUrl = () => useProject(useProjectIdInUrl());

/**
 * a function to return an object, e.g. {projectId: 1}
 */
export const useKanbanSearchParams = () => ({ projectId: useProjectIdInUrl() });

/**
 * a function to return an array, e.g. ['kanbans', {projectId: 1}]
 */
export const useKanbansQueryKey = () => ['kanbans', useKanbanSearchParams()];

/**
 * a function to a memoized object, e.g. {projectId: 1, typeId: 1, processorId: 1, tagIg: 1, name: ''}
 */
export const useTasksSearchParams = () => {
  const [param] = useUrlQueryParam(['name', 'typeId', 'processorId', 'tagId']);
  const projectId = useProjectIdInUrl();
  // useMemo will only recompute the memoized value when one of the dependencies has changed.
  return useMemo(
    () => ({
      projectId,
      typeId: Number(param.typeId) || undefined,
      processorId: Number(param.processorId) || undefined,
      tagId: Number(param.tagId) || undefined,
      name: param.name,
    }),
    [projectId, param]
  );
};

/**
 * A function to return an array, e.g. ['tasks', {projectId: 1, typeId: 1, processorId: 1, tagIg: 1, name: ''}]
 */
export const useTasksQueryKey = () => ['tasks', useTasksSearchParams()];

/**
 * A function to return an object: {editingTaskId, editingTask, startEdit, close, isLoading}
 * editingTaskId: ID of task being edited
 * editingTask: a task object being edited
 * startEdit: fn to set editingTaskId
 * close: fn to set editingTaskId to ''
 */
export const useTasksModal = () => {
  const [{ editingTaskId }, setEditingTaskId] = useUrlQueryParam(['editingTaskId']);
  const { data: editingTask, isLoading } = useTask(Number(editingTaskId));
  const startEdit = useCallback((id: number) => setEditingTaskId({ editingTaskId: id }),
    [setEditingTaskId]);
  const close = useCallback(() => setEditingTaskId({ editingTaskId: '' }), [setEditingTaskId]);
  return {editingTaskId, editingTask, startEdit, close, isLoading};
};