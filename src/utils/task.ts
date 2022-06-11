/**
 * util functions to create, read, update, delete tasks
 */
import {useHttp} from "utils/http";
import {QueryKey, useMutation, useQuery} from "react-query";
import {Task} from "types/task";
import {useAddConfig, useDeleteConfig, useEditConfig, useReorderTaskConfig,} from "utils/use-optimistic-options";
import {SortProps} from "utils/kanban";
import {useDebounce} from "utils/index";

/*
* a function to get an array of tasks from backend
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
* a function to get a task by id from backend
* */
export const useTask = (id?: number) => {
  const client = useHttp();
  return useQuery<Task>(["task", {id}], () => client(`tasks/${id}`), {
    enabled: Boolean(id),
  });
};

/*
* a function to return the return values of useMutation for adding task
* */
export const useAddTask = (queryKey: QueryKey) => {
  const client = useHttp();

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
* a function to return the return values of useMutation for editing task
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
* a function to return the return values of useMutation for deleting task
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
* a function to return the return values of useMutation for reordering task
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
