/**
 * What: util functions to create, read, update, delete tasks
 */
import {useHttp} from "utils/http";
import {QueryKey, useMutation, useQuery} from "react-query";
import {Task} from "types/task";
import {useAddConfig, useDeleteConfig, useEditConfig, useReorderTaskConfig,} from "utils/use-optimistic-options";
import {Project} from "types/project";
import {SortProps} from "utils/kanban";
import {useDebounce} from "utils/index";

/*
* What: get an array of tasks from backend
* How: send an HTTP request to "tasks" to get an array of tasks; avoid sending too many requests while user is typing
* */
export const useTasks = (param?: Partial<Task>) => {
  const client = useHttp();
  const debouncedParam = {...param, name: useDebounce(param?.name, 200)};

  return useQuery<Task[]>(["tasks", debouncedParam], () =>
    client("tasks", {data: debouncedParam})
  );
};

/*
* What: return useMutation for adding task
* */
export const useAddTask = (queryKey: QueryKey) => {
  const client = useHttp();

  // TODO
  // https://react-query.tanstack.com/reference/useMutation
  return useMutation(
    (params: Partial<Task>) =>
      client(`tasks`, {
        data: params,
        method: "POST",
      }),
    useAddConfig(queryKey)
  );
};

/*
* What: get a task by id from backend
* */
export const useTask = (id?: number) => {
  const client = useHttp();
  return useQuery<Project>(["task", {id}], () => client(`tasks/${id}`), {
    enabled: Boolean(id),
  });
};

/*
* What: return useMutation for editing task
* */
export const useEditTask = (queryKey: QueryKey) => {
  const client = useHttp();
  return useMutation(
    (params: Partial<Task>) =>
      client(`tasks/${params.id}`, {
        method: "PATCH",
        data: params,
      }),
    useEditConfig(queryKey)
  );
};

/*
* What: return useMutation for deleting task
* */
export const useDeleteTask = (queryKey: QueryKey) => {
  const client = useHttp();

  return useMutation(
    ({id}: { id: number }) =>
      client(`tasks/${id}`, {
        method: "DELETE",
      }),
    useDeleteConfig(queryKey)
  );
};

/*
* What: return useMutation for reordering task
* */
export const useReorderTask = (queryKey: QueryKey) => {
  const client = useHttp();

  return useMutation((params: SortProps) => {
    return client("tasks/reorder", {
      data: params,
      method: "POST",
    });
  }, useReorderTaskConfig(queryKey));
};