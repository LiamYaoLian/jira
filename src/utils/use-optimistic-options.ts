import {QueryKey, useQueryClient} from 'react-query';
import {reorder} from './reorder';
import {Task} from '../types/task';

/**
 * return {onSuccess, onMutate, onError}
 * @param queryKey
 * @param callback
 */
export const useConfig = (queryKey: QueryKey, callback: (target: any, old?: any[]) => any[]) => {
  const queryClient = useQueryClient();
  return {
    // mark queries as stale
    onSuccess: () => queryClient.invalidateQueries(queryKey),
    // a function to update a query's cached data
    async onMutate(target: any) {
      // get the cached data based on queryKey
      const previousItems = queryClient.getQueryData(queryKey);
      // update a query's cached data
      queryClient.setQueryData(queryKey, (old?: any[]) => {
        return callback(target, old);
      });
      return {previousItems};
    },
    // if an error happens, set cached data to be previousItems
    onError(error: any, newItem: any, context: any) {
      queryClient.setQueryData(queryKey, context.previousItems);
    },
  };
};

/**
 * a function for deleting
 * How: set cached query data to be remaining items that we don't want to delete
 * @param queryKey
 */
export const useDeleteConfig = (queryKey: QueryKey) =>
  useConfig(queryKey, (target, old) => old?.filter((item) => item.id !== target.id) || []);

/**
 * A function for editing
 * How: update cached query data
 * @param queryKey
 */
export const useEditConfig = (queryKey: QueryKey) =>
  useConfig(
    queryKey,
    (target, old) =>
      old?.map((item) => item.id === target.id ? {...item, ...target} : item) || []
  );

/**
 * a function for adding
 * How: update all cached query data that belongs to queryKey
 * @param queryKey
 */
export const useAddConfig = (queryKey: QueryKey) =>
  useConfig(queryKey, (target, old) => (old ? [...old, target] : []));

/**
 * a function for reordering Kanban,
 * How: update all cached query data that belongs to queryKey and reorder them
 * @param queryKey
 */
export const useReorderKanbanConfig = (queryKey: QueryKey) =>
  useConfig(queryKey, (target, old) => reorder({list: old, ...target}));

/**
 * a function for reordering Task
 * How: update all cached query data that belongs to queryKey and reorder them;
 * return a list whose kanbanId is updated as well
 * @param queryKey
 */
export const useReorderTaskConfig = (queryKey: QueryKey) =>
  useConfig(queryKey, (target, old) => {
    const orderedList = reorder({list: old, ...target}) as Task[];
    return orderedList.map((item) =>
      item.id === target.fromId ? {...item, kanbanId: target.toKanbanId} : item
    );
  });

