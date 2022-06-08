import * as initialData from './initial-data'
import { bootstrapDB, epicDB, kanbanDB, projectDB, tagDB, taskDB, taskTypeDB, userDB } from './data/rest'
import {bootstrapped} from "./initial-data";

Array.prototype.random = function () {
  return this[Math.floor(Math.random() * this.length)];
};

const pickId = (item) => item.id;

export const bootstrap = (id) => {

  const hasBootstrappedKey = '__hasBootstrapped';
  const hasBootstrapped = window.localStorage.getItem(hasBootstrappedKey);
  if (hasBootstrapped === 'true') {
    return;
  }
  window.localStorage.setItem(hasBootstrappedKey, 'true');
  userDB.push(assignId(id, initialData.users));
  taskTypeDB.push(assignId(id, initialData.taskTypes));
  projectDB.push(assignId(id, initialData.projects));
  tagDB.push(assignId(id, initialData.tags));
  kanbanDB.push(assignId(id, initialData.kanbans));
  epicDB.push(assignId(id, initialData.epics));
  taskDB.push(assignId(id, initialData.tasks));


  const userIds = userDB.queryByOwnerId(id).map(pickId);
  const projectIds = projectDB.queryByOwnerId(id).map(pickId);
  const kanbanIds = kanbanDB.queryByOwnerId(id).map(pickId);
  const epicIds = epicDB.queryByOwnerId(id).map(pickId);
  const tagIds = tagDB.queryByOwnerId(id).map(pickId);
  const typeIds = taskTypeDB.queryByOwnerId(id).map(pickId);

  projectDB.queryByOwnerId(id).forEach((project) =>
    projectDB.update(project.id, {
      personId: userIds.random(),
    })
  );
  kanbanDB.queryByOwnerId(id).forEach((kanban) => {
    kanbanDB.update(kanban.id, {
      projectId: projectIds.random(),
    });
  });
  epicDB.queryByOwnerId(id).forEach((epic) => {
    epicDB.update(epic.id, {
      projectId: projectIds[0],
    });
  });
  taskDB.queryByOwnerId(id).forEach((task) =>
    taskDB.update(task.id, {
      tags: [tagIds.random()],
      reporterId: userIds.random(),
      processorId: userIds.random(),
      projectId: projectIds.random(),
      epicId: epicIds.random(),
      kanbanId: kanbanIds.random(),
      typeId: typeIds.random(),
    })
  );
};

const assignId = (userId, list, other) => {
  return list.map((item) => ({ ...item, ownerId: userId, ...other }));
};


