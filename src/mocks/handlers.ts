import {rest} from 'msw';
import {ServerError} from "./server/util";
import * as accountDB from "./server/data/account";

const apiUrl = process.env.REACT_APP_API_URL;


const getToken = (req: any) =>
  req.headers.get("Authorization")?.replace("Bearer ", "");

export async function getUser(req: any) {
  const token = getToken(req);
  if (!token) {
    const error = new ServerError("A token must be provided");
    error.status = 401;
    throw error;
  }
  let userId;
  try {
    userId = atob(token);
  } catch (e) {
    const error = new ServerError("Invalid token. Please login again.");
    error.status = 401;
    throw error;
  }
  return await accountDB.read(+userId);
}


const fakeAuth = {"user": {"id": 2087933171, "name": "test", "token": "MjA4NzkzMzE3MQ=="}}
export const taskTypes = [
  {
    name: "task",
  },
  {
    name: "bug",
  },
];

export const tags = [
  {
    name: "初始",
  },
  {
    name: "中期",
  },
  {
    name: "结项",
  },
];

export const epics = [
  {
    name: "骑手物料表单开发",
    start: new Date("2020-12-10").getTime(),
    end: new Date("2021-01-11").getTime(),
  },
  {
    name: "骑手地图开发",
    start: new Date("2021-01-12").getTime(),
    end: new Date("2021-02-14").getTime(),
  },
  {
    name: "骑手地图开发",
    start: new Date("2021-01-12").getTime(),
    end: new Date("2021-02-14").getTime(),
  },
];

export const kanbans = [
  {
    name: "待完成",
  },
  {
    name: "开发中",
  },
  {
    name: "已完成",
  },
];

export const users = [
  {
    name: "Adam",
    organization: "外卖组",
  },
  {
    name: "Bill",
    organization: "外卖组",
  },
  {
    name: "Cindy",
    organization: "总部组",
  },
  {
    name: "Doug",
    organization: "中台组",
  },
];

export const projects = [
  {
    name: "快递管理",
    personId: 1,
    organization: "快递组",
    created: 1604989757139,
  },
];

export const tasks = [
  {
    name: "管理注册界面开发",
    tags: [1, 2],
    reporterId: 1,
    processorId: 2,
    epicId: 1,
    kanbanId: 1,
    favorite: true,
    typeId: 1,
    note: "请尽快完成",
  },
  {
    name: "管理登录界面开发",
    tags: [2],
    reporterId: 1,
    processorId: 2,
    epicId: 1,
    kanbanId: 1,
    favorite: true,
    typeId: 1,
    note: "请使用JWT完成",
  },
  {
    name: "单元测试",
    tags: [1],
    reporterId: 1,
    processorId: 2,
    epicId: 1,
    kanbanId: 1,
    favorite: true,
    typeId: 1,
    note: "",
  },
  {
    name: "性能优化",
    tags: [1],
    reporterId: 1,
    processorId: 2,
    epicId: 1,
    kanbanId: 1,
    favorite: true,
    typeId: 1,
    note: "",
  },
  {
    name: "权限管理界面开发",
    tags: [1],
    reporterId: 1,
    processorId: 2,
    epicId: 1,
    kanbanId: 1,
    favorite: true,
    typeId: 1,
    note: "",
  },
  {
    name: "UI开发",
    tags: [1],
    reporterId: 1,
    processorId: 2,
    epicId: 1,
    kanbanId: 1,
    favorite: true,
    typeId: 1,
    note: "",
  },
  {
    name: "自测",
    tags: [1],
    reporterId: 1,
    processorId: 2,
    epicId: 1,
    kanbanId: 1,
    favorite: true,
    typeId: 1,
    note: "",
  },
];


export const handlers = [
  rest.get(`${apiUrl}/me`, (req, res, ctx) => {
    // return res(
    //   ctx.status(200),
    //   ctx.json(fakeAuth)
    // )
    const user = getUser(req);
    const token = getToken(req);
    return res(
      ctx.status(200),
      ctx.json({ user: { ...user, token } }));
  }),

  // @ts-ignore
  rest.post(`${apiUrl}/login`, (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json(fakeAuth)
    )
  }),

  rest.get(`${apiUrl}/projects`, (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json(projects)
    )
  }),

  rest.get(`${apiUrl}/users`, (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json(users)
    )
  }),


]

