export const taskTypes = [
  {
    name: 'task',
  },
  {
    name: 'bug',
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
    projectId: 1
  },
  {
    name: 'Group B',
    start: new Date('2021-07-12').getTime(),
    end: new Date('2021-09-14').getTime(),
    projectId: 2
  },
  {
    name: 'Group C',
    start: new Date('2021-01-12').getTime(),
    end: new Date('2021-02-14').getTime(),
    projectId: 3
  },
  {
    name: 'Group D',
    start: new Date('2021-01-12').getTime(),
    end: new Date('2021-02-14').getTime(),
    projectId: 1
  },
  {
    name: 'Group E',
    start: new Date('2021-01-12').getTime(),
    end: new Date('2021-02-14').getTime(),
    projectId: 1
  },
  {
    name: 'Group F',
    start: new Date('2021-01-12').getTime(),
    end: new Date('2021-02-14').getTime(),
    projectId: 1
  },
  {
    name: 'Group G',
    start: new Date('2021-01-12').getTime(),
    end: new Date('2021-02-14').getTime(),
    projectId: 1
  },
  {
    name: 'Group H',
    start: new Date('2021-01-12').getTime(),
    end: new Date('2021-02-14').getTime(),
    projectId: 1
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
    id: 1
  },

  {
    name: 'ABC',
    personId: 2,
    team: 'Software Development',
    created: 1604989757139,
    id: 2,
  },

  {
    name: 'M&A',
    personId: 3,
    team: 'M&A',
    created: 1604989757139,
    id: 3
  },
];

export const tasks = [
  {
    name: 'Design',
    tags: [1, 2],
    reporterId: 1,
    processorId: 2,
    projectId:1,
    epicId: 1,
    kanbanId: 1,
    favorite: true,
    // TODO
    typeId: 2,
    note: 'ASAP',
  },
  {
    name: 'Login Module',
    tags: [2],
    reporterId: 1,
    processorId: 2,
    projectId:2,
    epicId: 2,
    kanbanId: 6,
    favorite: true,
    typeId: 1,
    note: 'Use JWT',
  },
  {
    name: 'Unit Test',
    tags: [1],
    reporterId: 1,
    processorId: 2,
    projectId:3,
    epicId: 3,
    kanbanId: 11,
    favorite: true,
    typeId: 1,
    note: '',
  },
  {
    name: 'Optimization',
    tags: [1],
    reporterId: 1,
    processorId: 2,
    projectId:1,
    epicId: 1,
    kanbanId: 3,
    favorite: true,
    typeId: 1,
    note: '',
  },
  {
    name: 'RBAC',
    tags: [1],
    reporterId: 1,
    processorId: 2,
    projectId:1,
    epicId: 1,
    kanbanId: 4,
    favorite: true,
    typeId: 1,
    note: '',
  },
  {
    name: 'UI',
    tags: [1],
    reporterId: 1,
    processorId: 2,
    projectId:3,
    epicId: 3,
    kanbanId: 15,
    favorite: true,
    typeId: 1,
    note: '',
  },
  {
    name: 'Unit Test',
    tags: [1],
    reporterId: 1,
    processorId: 2,
    projectId:1,
    epicId: 1,
    kanbanId: 2,
    favorite: true,
    typeId: 1,
    note: '',
  },
];

export const evms = [
  {
    name: 'Master Service Agreement (MSA)',
    projectId: 1,
    bac: 2323.8,
    pv: 2323.8,
    ev: 2323.8,
    ac: 3039.5,
    cv: -715.7,
    sv: 0,
    cpi: 0.764533640401382,
    spi: 1,
    eac: 3039.5,
    etc: 0,
    vac: -715.7,
    plannedProgress: 1,
    actualProgress: 0.9,
    progressDelay: 0.1,
  },
  {
    name: 'Statement of Work (SOW)',
    projectId: 1,
    bac: 1987.2,
    pv: 1987.2,
    ev: 1987.2,
    ac: 1778.2,
    cv: 209,
    sv: 0,
    cpi: 1.11753458553594,
    spi: 1,
    eac: 1778.2,
    etc: 0,
    vac: 209,
    plannedProgress: 1,
    actualProgress: 0.9,
    progressDelay: 0.1,
  }, {
    name: 'Project Charter',
    projectId: 1,
    bac: 2728.1,
    pv: 2728.1,
    ev: 2728.1,
    ac: 1905.5,
    cv: 822.6,
    sv: 0,
    cpi: 1.43169771713461,
    spi: 1,
    eac: 1905.5,
    etc: 0,
    vac: 822.6,
    plannedProgress: 1,
    actualProgress: 0.9,
    progressDelay: 0.1,
  }, {
    name: 'Project Kick-off',
    projectId: 1,
    bac: 942.8,
    pv: 942.8,
    ev: 942.8,
    ac: 1231.2,
    cv: -288.4,
    sv: 0,
    cpi: 0.765756985055231,
    spi: 1,
    eac: 1231.2,
    etc: 0,
    vac: -288.4,
    plannedProgress: 1,
    actualProgress: 0.9,
    progressDelay: 0.1,
  }, {
    name: 'Project Kick-off Deck',
    projectId: 1,
    bac: 2288.8,
    pv: 2288.8,
    ev: 2288.8,
    ac: 1613.5,
    cv: 675.3,
    sv: 0,
    cpi: 1.41853114347691,
    spi: 1,
    eac: 1613.5,
    etc: 0,
    vac: 675.3,
    plannedProgress: 1,
    actualProgress: 0.9,
    progressDelay: 0.1,
  }, {
    name: 'Pre Kick-off Meeting',
    projectId: 1,
    bac: 1710.9,
    pv: 1710.9,
    ev: 1710.9,
    ac: 2328.8,
    cv: -617.9,
    sv: 0,
    cpi: 0.734670216420474,
    spi: 1,
    eac: 2328.8,
    etc: 0,
    vac: -617.9,
    plannedProgress: 1,
    actualProgress: 0.9,
    progressDelay: 0.1,
  }, {
    name: 'Kick-off Meeting',
    projectId: 1,
    bac: 2197.8,
    pv: 2197.8,
    ev: 2197.8,
    ac: 1702.1,
    cv: 495.7,
    sv: 0,
    cpi: 1.29122848246284,
    spi: 1,
    eac: 1702.1,
    etc: 0,
    vac: 495.7,
    plannedProgress: 1,
    actualProgress: 0.9,
    progressDelay: 0.1,
  }, {
    name: 'Request for Quote (RFQ)',
    projectId: 1,
    bac: 3052.4,
    pv: 3052.4,
    ev: 3052.4,
    ac: 3431.6,
    cv: -379.2,
    sv: 0,
    cpi: 0.889497610444108,
    spi: 1,
    eac: 3431.6,
    etc: 0,
    vac: -379.2,
    plannedProgress: 1,
    actualProgress: 0.9,
    progressDelay: 0.1,
  }, {
    name: 'Project Plan',
    projectId: 1,
    bac: 1185.3,
    pv: 1185.3,
    ev: 1185.3,
    ac: 721.1,
    cv: 464.2,
    sv: 0,
    cpi: 1.64373873249203,
    spi: 1,
    eac: 721.1,
    etc: 0,
    vac: 464.2,
    plannedProgress: 1,
    actualProgress: 0.9,
    progressDelay: 0.1,
  }, {
    name: 'Sample Provider Options',
    projectId: 1,
    bac: 763.1,
    pv: 763.1,
    ev: 763.1,
    ac: 1222,
    cv: -458.9,
    sv: 0,
    cpi: 0.624468085106383,
    spi: 1,
    eac: 1222,
    etc: 0,
    vac: -458.9,
    plannedProgress: 1,
    actualProgress: 0.9,
    progressDelay: 0.1,
  }, {
    name: 'Procurement Planning',
    projectId: 1,
    bac: 1827.7,
    pv: 1827.7,
    ev: 1827.7,
    ac: 1688.5,
    cv: 139.2,
    sv: 0,
    cpi: 1.0824400355345,
    spi: 1,
    eac: 1688.5,
    etc: 0,
    vac: 139.2,
    plannedProgress: 1,
    actualProgress: 0.9,
    progressDelay: 0.1,
  }, {
    name: 'Need Analysis',
    projectId: 1,
    bac: 2267.3,
    pv: 2267.3,
    ev: 2267.3,
    ac: 1833.4,
    cv: 433.9,
    sv: 0,
    cpi: 1.23666412130468,
    spi: 1,
    eac: 1833.4,
    etc: 0,
    vac: 433.9,
    plannedProgress: 1,
    actualProgress: 0.9,
    progressDelay: 0.1,
  }, {
    name: 'Sample/Panel Providers',
    projectId: 1,
    bac: 2403.2,
    pv: 2403.2,
    ev: 2403.2,
    ac: 3036.2,
    cv: -633,
    sv: 0,
    cpi: 0.791515710427508,
    spi: 1,
    eac: 3036.2,
    etc: 0,
    vac: -633,
    plannedProgress: 1,
    actualProgress: 0.9,
    progressDelay: 0.1,
  }
];

export const capacity = [
  {
    id: 1,
    userId: 1,
    timeStamp: 1520010030,
    type: 'weekly',
    totalHours: 35,
    plannedHours: 34,
    actualHours: 20,
    remainingPlannedHours: 35-34,
    remainingActualHours: 35-20
  },
  {
    id: 2,
    userId: 2,
    timeStamp: 1520010130,
    type: 'weekly',
    totalHours: 35,
    plannedHours: 30,
    actualHours: 20,
    remainingPlannedHours: 35-30,
    remainingActualHours: 35-20
  },
  {
    id: 3,
    userId: 3,
    timeStamp: 1520010130,
    type: 'weekly',
    totalHours: 20,
    plannedHours: 20,
    actualHours: 23,
    remainingPlannedHours: 0,
    remainingActualHours: -3
  },
  {
    id: 4,
    userId: 4,
    timeStamp: 1520010130,
    type: 'weekly',
    totalHours: 37.5,
    plannedHours: 20,
    actualHours: 23,
    remainingPlannedHours: 37.5-20,
    remainingActualHours: 37.5-23
  }
]

export const timeLogs = [
  {
    id: 1,
    projectId: 1,
    plannedHour: 2,
    actualHour: 3,
    taskName: 'Project Kick-off',
    occurredAt: '2020-05-26T09:42:56Z',
  },
  {
    id: 2,
    projectId: 1,
    plannedHour: 6,
    actualHour: 5,
    taskName: 'Project Charter',
    occurredAt: '2020-05-26T08:19:22Z',
  },
];
