import {rest} from 'msw';
import fakeData from "../__tests__/fake.json";

const apiUrl = process.env.REACT_APP_API_URL;

const fakeAuth = {"user": {"id": 2087933171, "name": "test", "token": "MjA4NzkzMzE3MQ=="}}

export const handlers = [
  rest.get(`${apiUrl}/me`, (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json(fakeAuth)
    )
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
      ctx.json([
        {"personId":2,"organization":"快递组","created":1604989757139,"ownerId":2087933171,"name":"Delivery","id":1,"pin":true},
        {"personId":3,"organization":"快递组","created":1604989757139,"ownerId":2087933171,"name":"快递管理","id":2,"pin":false}
      ])
    )
  }),


]

// [{"personId":2,"organization":"快递组","created":1604989757139,"ownerId":2087933171,"name":"快递管理","id":1,"pin":true}]