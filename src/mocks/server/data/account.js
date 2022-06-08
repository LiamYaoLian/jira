import { ServerError } from '../util'

const userAuthKey = '__jira_user_auth____';

let users = {};

const persist = () => window.localStorage.setItem(userAuthKey, JSON.stringify(users));
const load = () => Object.assign(users, JSON.parse(window.localStorage.getItem(userAuthKey) || ''));

try {
  load();
} catch (error) {
  persist();
}

const validateUserForm = ({ name, password }) => {
  if (!name) {
    const error = new ServerError('Please input username');
    error.status = 400;
    throw error;
  }
  if (!password) {
    const error = new ServerError('Please input password');
    error.status = 400;
    throw error;
  }
};

function hash(str) {
  let hash = 5381,
    i = str.length;

  while (i) {
    hash = (hash * 33) ^ str.charCodeAt(--i);
  }
  return String(hash >>> 0);
}

function sanitizeUser(user) {
  const { passwordHash, ...rest } = user;
  return rest;
}

const authenticate = async ({ name, password }) => {
  validateUserForm({ name, password });
  const id = +hash(name);
  const user = users[id] || {};
  if (user.passwordHash === hash(password)) {
    // token: Base64-encoded ASCII string
    return { ...sanitizeUser(user), token: btoa(user.id + '') };
  }
  const error = new ServerError('Wrong username or password');
  error.status = 400;
  throw error;
};

/**
 * a function to check if user with a certain ID exists
 * @param id
 */
function validateUser(id) {
  load();
  if (!users[id]) {
    const error = new ServerError(`Did not find the user whose ID is "${id}"，please dump localStorage`);
    error.status = 404;
    throw error;
  }
}

/**
 * a function to return a sanitized user record object with a certain ID
 * @param id
 * @returns {Promise<Pick<*, *>>}
 */
async function read(id) {
  validateUser(id);
  return sanitizeUser(users[id]);
}

/**
 * a function to update a user record object; return sanitized user record object
 * @param id
 * @param updates
 * @returns {Promise<Pick<*, *>>}
 */
async function update(id, updates) {
  validateUser(id);
  Object.assign(users[id], updates);
  persist();
  return read(id);
}

// this would be called `delete` except that's a reserved word in JS :-(
// a function to remove a user record with a certain ID
async function remove(id) {
  validateUser(id);
  delete users[id];
  persist();
}

/**
 * a function to delete all user records
 * @returns {Promise<void>}
 */
async function reset() {
  users = {};
  persist();
}

/**
 * A function to create a user record by username and password
 * @param name
 * @param password
 * @returns {Promise<Pick<*, *>>}
 */
async function create({ name, password }) {
  validateUserForm({ name, password });
  const id = +hash(name);
  const passwordHash = hash(password);
  if (users[id]) {
    const error = new ServerError(`Username "${name}" exists already`);
    error.status = 400;
    throw error;
  }
  users[id] = { id, name, passwordHash };
  persist();
  return read(id);
}



export { authenticate, create, read, update, remove, reset };
