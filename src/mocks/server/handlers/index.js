import { userHandlers } from './account'
import { getRestHandlers } from './rest-handlers'
import {epicDB, kanbanDB, projectDB, tagDB, taskDB, taskTypeDB, userDB, evmDB, capacityDB, timeLogDB} from '../data/rest'
import { reorderHandlers } from './reorder-handlers'


// TODO
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
  ...getRestHandlers("evms", evmDB),
  ...getRestHandlers("capacity", capacityDB),
  ...getRestHandlers("timeLogs", timeLogDB),
  ...reorderHandlers,
]
