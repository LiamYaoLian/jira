/**
 * util functions to create, read, update, delete Kanbans
 */
import {useHttp} from 'utils/http';
import {QueryKey, useMutation, useQuery} from 'react-query';
import {Kanban} from 'types/kanban';
import {useAddConfig, useDeleteConfig, useReorderKanbanConfig,} from 'utils/use-optimistic-options';

/*
* a function to get an array of Kanbans from backend
* How: send an HTTP request to 'kanbans' to get an array of Kanbans
* */
export const useKanbans = (param?: Partial<Kanban>) => {
  const client = useHttp();

  return useQuery<Kanban[]>(['kanbans', param], () =>
    client('kanbans', {data: param})
  );
};

/*
* a function to return the return values of useMutation for adding Kanban
* */
export const useAddKanban = (queryKey: QueryKey) => {
  const client = useHttp();

  // https://react-query.tanstack.com/reference/useMutation
  return useMutation(
    (params: Partial<Kanban>) =>
      client(`kanbans`, {
        data: params,
        method: 'POST',
      }),
    useAddConfig(queryKey)
  );
};

/*
* a function to return the return values of useMutation for deleting Kanban
* */
export const useDeleteKanban = (queryKey: QueryKey) => {
  const client = useHttp();

  return useMutation(
    ({id}: { id: number }) =>
      client(`kanbans/${id}`, {
        method: 'DELETE',
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
  type: 'before' | 'after';

  fromKanbanId?: number;

  toKanbanId?: number;
}

/*
* a function to return the return values of useMutation for reordering Kanban
* */
export const useReorderKanban = (queryKey: QueryKey) => {
  const client = useHttp();
  return useMutation((params: SortProps) => {
    return client('kanbans/reorder', {
      data: params,
      method: 'POST',
    });
  }, useReorderKanbanConfig(queryKey));
};
