/**
 * util function to get an array of TaskType
 */
import { useHttp } from "utils/http";
import { useQuery } from "react-query";
import { TaskType } from "types/task-type";

/*
* a function to send an HTTP request to "taskTypes" to get an array of TaskType
* */
export const useTaskTypes = () => {
    const client = useHttp();

    return useQuery<TaskType[]>(["taskTypes"], () => client("taskTypes"));
};