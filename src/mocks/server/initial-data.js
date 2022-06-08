export const taskTypes = [
  {
    name: 'Task',
  },
  {
    name: 'Bug',
  },
];

export const tags = [
  {
    name: 'Initial',
  },
  {
    name: 'Mid-Term',
  },
  {
    name: 'Closure',
  },
];

export const epics = [
  {
    name: 'Group A',
    start: new Date('2021-06-10').getTime(),
    end: new Date('2021-08-11').getTime(),
  },
  {
    name: 'Group B',
    start: new Date('2021-07-12').getTime(),
    end: new Date('2021-09-14').getTime(),
  },
  {
    name: 'Group C',
    start: new Date('2021-01-12').getTime(),
    end: new Date('2021-02-14').getTime(),
  },
];

export const kanbans = [
  {
    name: 'To-do',
  },
  {
    name: 'In Progress',
  },
  {
    name: 'Close',
  },
];

export const users = [
  {
    name: 'Adam',
    organization: 'Analytics',
  },
  {
    name: 'Jack',
    organization: 'M&A',
  },
  {
    name: 'Leo',
    organization: 'Account Management',
  },
  {
    name: 'Liam',
    organization: 'Software Development',
  },
];

export const projects = [
  {
    name: 'Project A',
    personId: 1,
    organization: 'Account Management',
    created: 1604989757139,
  },

  {
    name: 'ABC',
    personId: 1,
    organization: 'Software Development',
    created: 1604989757139,
  },

  {
    name: 'M&A',
    personId: 1,
    organization: 'M&A',
    created: 1604989757139,
  },
];

export const tasks = [
  {
    name: 'Design',
    tags: [1, 2],
    reporterId: 1,
    processorId: 2,
    epicId: 1,
    kanbanId: 1,
    favorite: true,
    typeId: 1,
    note: 'ASAP',
  },
  {
    name: 'Login Module',
    tags: [2],
    reporterId: 1,
    processorId: 2,
    epicId: 1,
    kanbanId: 1,
    favorite: true,
    typeId: 1,
    note: 'Use JWT',
  },
  {
    name: 'Unit Test',
    tags: [1],
    reporterId: 1,
    processorId: 2,
    epicId: 1,
    kanbanId: 1,
    favorite: true,
    typeId: 1,
    note: '',
  },
  {
    name: 'Optimization',
    tags: [1],
    reporterId: 1,
    processorId: 2,
    epicId: 1,
    kanbanId: 1,
    favorite: true,
    typeId: 1,
    note: '',
  },
  {
    name: 'RBAC',
    tags: [1],
    reporterId: 1,
    processorId: 2,
    epicId: 1,
    kanbanId: 1,
    favorite: true,
    typeId: 1,
    note: '',
  },
  {
    name: 'UI',
    tags: [1],
    reporterId: 1,
    processorId: 2,
    epicId: 1,
    kanbanId: 1,
    favorite: true,
    typeId: 1,
    note: '',
  },
  {
    name: 'Unit Test',
    tags: [1],
    reporterId: 1,
    processorId: 2,
    epicId: 1,
    kanbanId: 1,
    favorite: true,
    typeId: 1,
    note: '',
  },
];
