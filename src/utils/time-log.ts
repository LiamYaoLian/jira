/**
 * util function to query time log records
 */
import {useHttp} from "utils/http";
import {QueryKey, useMutation, useQuery} from "react-query";
import {TimeLog} from "../types/time-log";
import {Task} from "../types/task";
import {useAddConfig, useDeleteConfig, useEditConfig} from "./use-optimistic-options";

/*
* a function to get an array of time log records of a projectId from backend
* How: send an HTTP request to "time log records" to get an array of time log records
* */
export const useTimeLogs = (param?: Partial<TimeLog>) => {
  const client = useHttp();

  return useQuery<TimeLog[]>(["timeLogs", param], async () =>
    await client("timeLogs", {data: param})
  );
};

export const useMaxTimeLogId = () => {
  const client = useHttp();

  return useQuery<TimeLog[]>(["timeLogs"], async () =>
    await client("timeLogs/max-id")
  );
}

// TODO enabled
/*
* a function to get a time log record by id from backend
* */
export const useTimeLog = (id?: number) => {
  const client = useHttp();
  return useQuery<Task>(["task", {id}], () => client(`tasks/${id}`), {
    enabled: Boolean(id),
  });
};

/*
* a function to return the return values of useMutation for adding time log record
* */
export const useAddTimeLog = (queryKey: QueryKey) => {
  const client = useHttp();

  // https://react-query.tanstack.com/reference/useMutation
  return useMutation(
    (params: Partial<TimeLog>) =>
      client(`timeLogs`, {
        data: params,
        method: "POST",
      }),
    useAddConfig(queryKey)
  );
};

/*
* a function to return the return values of useMutation for deleting time log record
* */
export const useDeleteTimeLog = (queryKey: QueryKey) => {
  const client = useHttp();

  return useMutation(
    ({ id }: { id: number }) =>
      client(`timeLogs/${id}`, {
        method: "DELETE",
      }),
    useDeleteConfig(queryKey)
  );
};

/*
* a function to return the return values of useMutation for editing time log record
* */
export const useEditTimeLog = (queryKey: QueryKey) => {
  const client = useHttp();
  return useMutation(
    (params: Partial<TimeLog>) =>
      client(`timeLogs/${params.id}`, {
        method: "PATCH",
        data: params,
      }),
    useEditConfig(queryKey)
  );
};



