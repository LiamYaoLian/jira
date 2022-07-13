import { rest } from 'msw'
import { getUser } from './account'
import { taskTypeDB } from '../data/rest'

const apiUrl = process.env.REACT_APP_API_URL

const tryToNumber = (value) => Array.isArray(value) ? value.map(Number) : Number(value)

const convertIds = (object) => {
  const result = {}
  Object.keys(object).forEach((key) => {
    // convert id (e.g. personId) to number
    result[key] = key.includes('Id') ? tryToNumber(object[key]) : object[key]
  })
  result.id = tryToNumber(result.id)
  return result
}

export const getRestHandlers = (endpoint, db) => {
  return [
    // query list
    rest.get(`${apiUrl}/${endpoint}`, async (req, res, ctx) => {
      const user = await getUser(req)
      const params = req.url.searchParams
      const queryResult = db.queryByOwnerId(
        user.id,
        Object.fromEntries(params)
      )
      return res(ctx.json(queryResult))
    }),
    // TODO test
    // query max id
    rest.get(`${apiUrl}/${endpoint}/max-id`, async (req, res, ctx) => {
      return res(ctx.json(db.queryMaxId()));
    }),
    // query detail
    rest.get(`${apiUrl}/${endpoint}/:id`, async (req, res, ctx) => {
      const { id } = req.params
      const item = db.detail(+id)
      return res(ctx.json(item))
    }),

    // put item
    rest.patch(`${apiUrl}/${endpoint}/:id`, async (req, res, ctx) => {
      const { id } = convertIds(req.params)
      const updates = req.body
      const updatedItem = db.update(id, updates)
      return res(ctx.json(updatedItem))
    }),

    // remove item
    rest.delete(`${apiUrl}/${endpoint}/:id`, async (req, res, ctx) => {
      const { id } = convertIds(req.params)
      db.remove(id)
      return res(ctx.json({ success: true }))
    }),

    // create item
    rest.post(`${apiUrl}/${endpoint}`, async (req, res, ctx) => {
      const user = await getUser(req)
      let targetAddItem = Object.assign(req.body, { ownerId: user.id , created: new Date().getTime()})

      if (endpoint === 'tasks') {
        targetAddItem = {
          ...targetAddItem,
          reporterId: user.id,
          typeId: taskTypeDB.queryByOwnerId(user.id)[0].id,
          created: new Date().getTime()
        }
      }

      const detail = await db.create(convertIds(targetAddItem))
      return res(ctx.json(detail))
    })
  ]
}
