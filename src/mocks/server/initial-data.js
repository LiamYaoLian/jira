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
    projectId: 1,
    id: 1
  },
  {
    name: 'Planning',
    projectId: 1,
    id: 2
  },
  {
    name: 'Execution',
    projectId: 1,
    id: 3
  },
  {
    name: 'Performance/Monitoring',
    projectId: 1,
    id: 4
  },
  {
    name: 'Closing',
    projectId: 1,
    id: 5
  },


  {
    name: 'Conception and Initiation',
    projectId: 2,
    id: 6
  },
  {
    name: 'Planning',
    projectId: 2,
    id: 7
  },
  {
    name: 'Execution',
    projectId: 2,
    id: 8
  },
  {
    name: 'Performance/Monitoring',
    projectId: 2,
    id: 9
  },
  {
    name: 'Closing',
    projectId: 2,
    id:10
  },

  {
    name: 'Conception and Initiation',
    projectId: 3,
    id:11
  },
  {
    name: 'Planning',
    projectId: 3,
    id:12
  },
  {
    name: 'Execution',
    projectId: 3,
    id:13
  },
  {
    name: 'Performance/Monitoring',
    projectId: 3,
    id:14
  },
  {
    name: 'Closing',
    projectId: 3,
    id:15
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
    name: 'Healthcare',
    personId: 1,
    team: 'Account Management',
    created: 1604989757139,
  },

  {
    name: 'ABC',
    personId: 2,
    team: 'Software Development',
    created: 1604989757139,
  },

  {
    name: 'M&A',
    personId: 3,
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
    epicId: 2,
    kanbanId: 1,
    favorite: true,
    typeId: 1,
    note: 'Use JWT',
    projectId: 1
  },
  {
    name: 'Unit Test',
    tags: [1],
    reporterId: 1,
    processorId: 2,
    epicId: 3,
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
    epicId: 3,
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


