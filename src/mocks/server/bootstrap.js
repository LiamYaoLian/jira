import * as initialData from './initial-data'
import { epicDB, kanbanDB, projectDB, tagDB, taskDB, taskTypeDB, userDB, evmDB, capacityDB, timeLogDB } from './data/rest'

export const bootstrap = (id) => {

  const hasBootstrappedKey = '__hasBootstrapped';
  const hasBootstrapped = window.localStorage.getItem(hasBootstrappedKey);
  if (hasBootstrapped === 'true') {
    return;
  }


  window.localStorage.setItem(hasBootstrappedKey, 'true');
  userDB.push(initialData.users);
  taskTypeDB.push(initialData.taskTypes);
  projectDB.push(initialData.projects);
  tagDB.push(initialData.tags);
  kanbanDB.push(initialData.kanbans);
  epicDB.push(initialData.epics);
  taskDB.push(initialData.tasks);
  evmDB.push(initialData.evms);
  capacityDB.push(initialData.capacity);
  timeLogDB.push(initialData.timeLogs);
};




