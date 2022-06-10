import { userHandlers } from './account'
import { getRestHandlers } from './rest-handlers'
import { match } from 'node-match-path'
import { epicDB, kanbanDB, projectDB, tagDB, taskDB, taskTypeDB, userDB } from '../data/rest'
import { reorderHandlers } from './reorder-handlers'

function ls(key, defaultVal) {
  const lsVal = window.localStorage.getItem(key);
  let val;
  if (lsVal) {
    val = Number(lsVal);
  }
  return Number.isFinite(val) ? val : defaultVal;
}

const sleep = (t = ls("__evm_min_request_time__", 200)) =>
  new Promise((resolve) => setTimeout(resolve, t));

export const handlers = [
  ...userHandlers,
  ...getRestHandlers("projects", projectDB),
  ...getRestHandlers("epics", epicDB),
  ...getRestHandlers("tasks", taskDB),
  ...getRestHandlers("kanbans", kanbanDB),
  ...getRestHandlers("persons", userDB),
  ...getRestHandlers("taskTypes", taskTypeDB),
  ...getRestHandlers("tags", tagDB),
  ...getRestHandlers("users", userDB),
  ...reorderHandlers,
]
