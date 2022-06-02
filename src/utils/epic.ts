import { useHttp } from "utils/http";
import { QueryKey, useMutation, useQuery } from "react-query";
import { useAddConfig, useDeleteConfig } from "utils/use-optimistic-options";
import { Epic } from "types/epic";

/*
* What: get an array of epics from backend by param
* How: send an HTTP request to "tasks" to get an array of epics
* */
export const useEpics = (param?: Partial<Epic>) => {
    const client = useHttp();

    return useQuery<Epic[]>(["epics", param], () =>
        client("epics", { data: param })
    );
};

/*
* What: return useMutation for adding epic
* */
export const useAddEpic = (queryKey: QueryKey) => {
    const client = useHttp();

    // https://react-query.tanstack.com/reference/useMutation
    return useMutation(
        (params: Partial<Epic>) =>
            client(`epics`, {
                data: params,
                method: "POST",
            }),
        useAddConfig(queryKey)
    );
};

/*
* What: return useMutation for deleting epic
* */
export const useDeleteEpic = (queryKey: QueryKey) => {
    const client = useHttp();

    return useMutation(
        ({ id }: { id: number }) =>
            client(`epics/${id}`, {
                method: "DELETE",
            }),
        useDeleteConfig(queryKey)
    );
};