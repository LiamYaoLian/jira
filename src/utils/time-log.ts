/**
 * util function to query time log records
 */
import {useHttp} from "utils/http";
import {useQuery} from "react-query";
import {TimeLog} from "../types/time-log";

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


