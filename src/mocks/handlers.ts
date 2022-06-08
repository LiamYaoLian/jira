import {ServerError} from "./server/util";
import * as accountDB from "./server/data/account";
import {userHandlers} from "./server/handlers/account";
import {getRestHandlers} from "./server/handlers/rest-handlers";
import {epicDB, kanbanDB, projectDB, tagDB, taskDB, taskTypeDB, userDB} from "./server/data/rest";
import {reorderHandlers} from "./server/handlers/reorder-handlers";

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

export const handlers = [
  ...userHandlers,
  ...getRestHandlers("projects", projectDB),
  ...getRestHandlers("epics", epicDB),
  ...getRestHandlers("tasks", taskDB),
  ...getRestHandlers("kanbans", kanbanDB),
  ...getRestHandlers("persons", userDB),
  ...getRestHandlers("taskTypes", taskTypeDB),
  ...getRestHandlers("tags", tagDB),
  ...getRestHandlers("users", userDB),
  ...reorderHandlers,

]

