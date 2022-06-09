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
    name: 'Closing',
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
    name: 'Conception and Initiation',
  },
  {
    name: 'Planning',
  },
  {
    name: 'Execution',
  },
  {
    name: 'Performance/Monitoring',
  },
  {
    name: 'Closing',
  },
];

export const users = [
  {
    name: 'Adam',
    team: 'Analytics',
  },
  {
    name: 'Jack',
    team: 'M&A',
  },
  {
    name: 'Leo',
    team: 'Account Management',
  },
  {
    name: 'Liam',
    team: 'Software Development',
  }
];

export const projects = [
  {
    name: 'Project A',
    personId: 1,
    team: 'Account Management',
    created: 1604989757139,
  },

  {
    name: 'ABC',
    personId: 1,
    team: 'Software Development',
    created: 1604989757139,
  },

  {
    name: 'M&A',
    personId: 1,
    team: 'M&A',
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


