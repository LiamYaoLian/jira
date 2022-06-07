/**
 * a function to do optimistic update locally
 * @param fromId the item to be reordered
 * @param type 'before' | 'after': before or after the reference
 * @param referenceId
 * @param list the list to be reordered, such as tasks, Kanbans
 */
export const reorder = ({fromId, type, referenceId, list}: {
  list: { id: number }[];
  fromId: number;
  type: "after" | "before";
  referenceId: number;
}) => {
  const copiedList = [...list];
  // find the index of the item to be moved
  const movingItemIndex = copiedList.findIndex((item) => item.id === fromId);
  // put to the end if referenceId does not exist
  if (!referenceId) {
    return insertAfter([...copiedList], movingItemIndex, copiedList.length - 1);
  }
  const targetIndex = copiedList.findIndex((item) => item.id === referenceId);
  const insert = type === "after" ? insertAfter : insertBefore;
  return insert([...copiedList], movingItemIndex, targetIndex);
};

/**
 * a function to put the "from" item before the "to" item; return a list
 * @param list
 * @param from
 * @param to
 */
const insertBefore = (list: unknown[], from: number, to: number) => {
  const toItem = list[to];
  const removedItem = list.splice(from, 1)[0];
  const toIndex = list.indexOf(toItem);
  // TODO
  list.splice(toIndex, 0, removedItem);
  return list;
};

/**
 * a function to put the "from" item after the "to" item; return a list
 * @param list
 * @param from
 * @param to
 */
const insertAfter = (list: unknown[], from: number, to: number) => {
  const toItem = list[to];
  const removedItem = list.splice(from, 1)[0];
  const toIndex = list.indexOf(toItem);
  list.splice(toIndex + 1, 0, removedItem);
  return list;
};