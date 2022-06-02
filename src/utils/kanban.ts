import {useHttp} from "utils/http";
import {QueryKey, useMutation, useQuery} from "react-query";
import {Kanban} from "types/kanban";
import {useAddConfig, useDeleteConfig, useReorderKanbanConfig,} from "utils/use-optimistic-options";

/*
* What: a function to get an array of Kanbans from backend
* How: send an HTTP request to "kanbans" to get an array of Kanbans
* */
export const useKanbans = (param?: Partial<Kanban>) => {
  const client = useHttp();

  return useQuery<Kanban[]>(["kanbans", param], () =>
    client("kanbans", {data: param})
  );
};

/*
* What: a function to return useMutation for adding Kanban
* */
export const useAddKanban = (queryKey: QueryKey) => {
  const client = useHttp();

  // https://react-query.tanstack.com/reference/useMutation
  return useMutation(
    (params: Partial<Kanban>) =>
      client(`kanbans`, {
        data: params,
        method: "POST",
      }),
    useAddConfig(queryKey)
  );
};

/*
* What: a function to return useMutation for deleting Kanban
* */
export const useDeleteKanban = (queryKey: QueryKey) => {
  const client = useHttp();

  return useMutation(
    ({id}: { id: number }) =>
      client(`kanbans/${id}`, {
        method: "DELETE",
      }),
    useDeleteConfig(queryKey)
  );
};

export interface SortProps {

  // ID of the item that will sorted
  fromId: number;

  // target item ID
  referenceId: number;

  // put the item before or after the target item
  type: "before" | "after";

  fromKanbanId?: number;

  toKanbanId?: number;
}

/*
* What: a function to return useMutation for reordering Kanban
* */
export const useReorderKanban = (queryKey: QueryKey) => {
  const client = useHttp();
  return useMutation((params: SortProps) => {
    return client("kanbans/reorder", {
      data: params,
      method: "POST",
    });
  }, useReorderKanbanConfig(queryKey));
};