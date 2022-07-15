import * as initialData from './initial-data'
import { epicDB, kanbanDB, projectDB, tagDB, taskDB, taskTypeDB, userDB, evmDB, capacityDB, timeLogDB } from './data/rest'
import * as accountDB from "./data/account";

export const bootstrap = (id) => {

  const hasBootstrappedKey = '__hasBootstrapped';
  const hasBootstrapped = window.localStorage.getItem(hasBootstrappedKey);
  if (hasBootstrapped === 'true') {
    return;
  }

  userDB.push(initialData.users);
  taskTypeDB.push(initialData.taskTypes);
  projectDB.push(initialData.projects);
  tagDB.push(initialData.tags);
  kanbanDB.push(initialData.kanbans);
  epicDB.push(initialData.epics);
  taskDB.push(initialData.tasks);
  evmDB.push(initialData.evms);
  capacityDB.push(initialData.capacity);

  let timeLogs = initialData.timeLogs.map(item => {
    return {
      ...item,
      userId: id
    }
  })
  timeLogDB.push(timeLogs);

  let admin = accountDB.create({ name: 'admin', password: 'admin12345678' }).then(
    (admin) => {
      accountDB.update(admin.id, {role: 'admin'}).then();
      return admin;
    }
  )

  window.localStorage.setItem(hasBootstrappedKey, 'true');
};




