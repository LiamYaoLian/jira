import * as initialData from './initial-data'
import { epicDB, kanbanDB, projectDB, tagDB, taskDB, taskTypeDB, userDB, evmDB } from './data/rest'

export const bootstrap = (id) => {

  const hasBootstrappedKey = '__hasBootstrapped';
  const hasBootstrapped = window.localStorage.getItem(hasBootstrappedKey);
  if (hasBootstrapped === 'true') {
    return;
  }
  // TODO
  window.localStorage.setItem(hasBootstrappedKey, 'true');
  userDB.push(assignId(id, initialData.users));
  taskTypeDB.push(assignId(id, initialData.taskTypes));
  projectDB.push(assignId(id, initialData.projects));
  tagDB.push(assignId(id, initialData.tags));
  kanbanDB.push(assignId(id, initialData.kanbans));
  epicDB.push(assignId(id, initialData.epics));
  taskDB.push(assignId(id, initialData.tasks));
  console.log('evms' +JSON.stringify(initialData.evms));
  evmDB.push(assignId(id, initialData.evms));
};

const assignId = (userId, list, other) => {
  return list.map((item) => ({ ...item, ownerId: userId, ...other }));
};


